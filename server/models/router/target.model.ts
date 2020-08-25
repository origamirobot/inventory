
/** 
 * A target is what happens after a packet matches a rule criteria. 
 */
export enum Target {
	/** Firewall will accept this packet */
	Accept,
	/** Firewall drops the packet and pretends it never received it */
	Drop,
	/** Firewall will stop executing the next set of rules in the current chain for this packet */
	Return,
	/** Firewall will pass the packet to the userspace */
	Queue,
}
