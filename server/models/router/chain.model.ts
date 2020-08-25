import { Rule } from './rule.model';
import { Target } from './target.model';

/**
 * A chain is a string of rules. When a packet is received, iptables finds the appropriate 
 * table, then runs it through the chain of rules until it finds a match.
 */
export class Chain {

	public name: string;
	public defaultPolicy: string;
	public rules: Rule[];

	public packets: string;

	public bytes: string;

	constructor(init?: Partial<Chain>) {
		Object.assign(this, init);
	}

}
