import { Chain } from './chain.model';

/**
 * Tables are files that join similar actions. A table consists of several chains
 */
export class Table {

	public chains: Chain[] = [];

	constructor(init?: Partial<Table>) {
		Object.assign(this, init);
	}

}

/** The Filter table is the most frequently used one. It acts as a bouncer, deciding who gets in and out of your network. */
export class FilterTable extends Table {

	/** The rules in this chain control the packets received by the server. */
	public input: Chain;

	/** This chain controls the packets for outbound traffic. */
	public output: Chain;

	/** This set of rules controls the packets that are routed through the server */
	public forward: Chain;

	constructor(init?: Partial<FilterTable>) {
		super();
		Object.assign(this, init);
	}

}

/**
 * This table contains NAT (Network Address Translation) rules for routing packets to networks that cannot be accessed directly. 
 * When the destination or source of the packet has to be altered, the NAT table is used. It includes the following chains:
 */
export class NatTable extends Table {

	/** This chain assigns packets as soon as the server receives them. */
	public prerouting: Chain;

	/** Works the same as the output chain in the filter table. */
	public output: Chain;

	/** Rules in this chain allow making changes to packets after they leave the output chain. */
	public postrouting: Chain;

	constructor(init?: Partial<NatTable>) {
		super();
		Object.assign(this, init);
	}

}

/** The Raw table is used to exempt packets from connection tracking.  */
export class MangleTable extends Table {

	/** This chain assigns packets as soon as the server receives them. */
	public prerouting: Chain;

	/** Works the same as the output chain in the filter table. */
	public output: Chain;

	constructor(init?: Partial<MangleTable>) {
		super();
		Object.assign(this, init);
	}

}

/** Some versions of Linux also use a Security table to manage special access rules.  */
export class SecurityTable extends Table {

	/** The rules in this chain control the packets received by the server. */
	public input: Chain;

	/** This chain controls the packets for outbound traffic. */
	public output: Chain;

	/** This set of rules controls the packets that are routed through the server */
	public forward: Chain;

	constructor(init?: Partial<SecurityTable>) {
		super();
		Object.assign(this, init);
	}

}
