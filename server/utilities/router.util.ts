import { inject, injectable } from 'inversify';
import { IRouterSettings } from '../config';
import { Table, FilterTable, Rule, Chain, Target, Setting } from '../models/router';
import { NodeSSH } from 'node-ssh';


export interface IRouterUtility {

	listSettings(): Promise<Setting[]>;

}

@injectable()
export class RouterUtility implements IRouterUtility {


	constructor(@inject('routerSettings') private settings: IRouterSettings) {
		
	}

	public async listSettings(): Promise<Setting[]> {
		const connection = new NodeSSH();
		await connection.connect({
			host: '192.168.11.1',
			username: 'root',
			privateKey: `c:\\Users\\chris\\.ssh\\id_rsa`,
		});

		

		const raw = await connection.exec("nvram show", ["| grep = | grep -v -e =$ | awk -F '=' '{print $1}' | sort -f | (IFS=''; while read VAR; do VAL=$(nvram get ${VAR}); [ -n \"$VAL\" ] && printf '%s='\''%s'\''\n' ${VAR} ${VAL/\'/\'\\\'\'}; done)"]);
		const lines = raw.split('\n');
		const result: Setting[] = [];
		// for(let i = 0; i < lines.length; i++){
		// 	const line = lines[i];
		// 	const parts = line.split('==');
		// 	result.push(new Setting({ key: parts[0], value: parts[1]}));
		// }
		return result;
	}

}





/// ROAST BEEF SWIFF MAYO LETTUCE


