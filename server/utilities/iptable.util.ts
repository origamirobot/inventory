import { inject, injectable } from 'inversify';
import { IRouterSettings } from '../config';
import { Table, FilterTable, Rule, Chain, Target } from '../models/router';
import { NodeSSH } from 'node-ssh';


export interface IIpTableUtility {

	getFilterTable(): Promise<FilterTable>;

}

@injectable()
export class IpTableUtility implements IIpTableUtility {


	constructor(@inject('routerSettings') private settings: IRouterSettings) {
		
	}

	public async getFilterTable(): Promise<FilterTable> {

		const connection = new NodeSSH();
		await connection.connect({
			host: '192.168.11.1',
			username: 'root',
			privateKey: `c:\\Users\\chris\\.ssh\\id_rsa`,
		});

		const raw = await connection.exec('iptables', ['-L', '--line-numbers', '--verbose', '--table', 'filter']);
		const lines = raw.split('\n');
		const result =  new FilterTable();

		let currentChain = new Chain();
		for(let i = 0; i < lines.length; i++){
			const line = lines[i];
			if(this.settings.chainRegex.test(line)) {
				const match = line.match(this.settings.chainRegex);
				const chain = new Chain({
					name: match.groups['chain'],
					defaultPolicy: match.groups['policy'],
					packets: match.groups['packets'],
					bytes: match.groups['bytes'],
					rules: [],
				});
				switch(chain.name) {
					case 'INPUT':
						result.input = chain;
						break;
					case 'OUTPUT':
						result.output = chain;
						break;
					case 'FORWARD':
						result.forward = chain;
						break;
				}
				result.chains.push(chain);
				currentChain = chain;
			} else if(this.settings.ruleRegex.test(line)) {
				// THIS IS A RULE
				const match = line.match(this.settings.ruleRegex);
				const rule = new Rule({
					destination: match.groups['destination'],
					number: parseInt(match.groups['id']),
					options: match.groups['options'],
					protocol: match.groups['protocol'],
					source: match.groups['source'],
					target: match.groups['target'],
					packets: match.groups['packets'],
					bytes: match.groups['bytes'],
					in: match.groups['in'],
					out: match.groups['out'],
				});
				currentChain.rules.push(rule);
			}
		}
		return result;
	}

}
