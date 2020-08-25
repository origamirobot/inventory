import { Target } from './target.model';


/**
 * A rule is a statement that tells the system what to do with a packet. Rules can block one type 
 * of packet, or forward another type of packet. The outcome, where a packet is sent, is called a target.
 */
export class Rule {

	/** The rule number within the particular chain. */
	public number: number;

	/** What to do with the packet when it's received by this rule */
	public target: string;

	/** Protocol used by this rule */
	public protocol: string;

	/** Special options used by this rule */
	public options: string;

	/** The source IP Address of the packet's sender */
	public source: string;

	/** The destination IP address of the packet's sender */
	public destination: string;

	public in: string;

	public out: string;

	public packets: string;

	public bytes: string;

	constructor(init?: Partial<Rule>) {
		Object.assign(this, init);
	}

}
