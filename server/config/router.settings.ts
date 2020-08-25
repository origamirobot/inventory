

export interface IRouterSettings {

	routerAddress: string;
	sshKeyLocation: string;
	chainRegex: RegExp;
	ruleRegex: RegExp;
}

export class RouterSettings implements IRouterSettings {

	public routerAddress: string = '192.168.11.1';
	public sshKeyLocation: string = 'c:\\Users\\chris\\.ssh\\id_rsa';

	public chainRegex: RegExp = /(?:Chain\s)(?<chain>\w+)(?:.*\(policy)\s+(?<policy>\w+)\s+(?<packets>[0-9]+)(?:.*\packets,)\s+(?<bytes>[0-9]+)\s+/;
	public ruleRegex: RegExp = /(?<id>\d+)\s+(?<packets>\w+)\s+(?<bytes>\w+)\s+(?<target>\w+)\s+(?<protocol>\w+)\s+(?<opt>[\w-]+)\s+(?<in>\w+)\s+(?<out>\w+)\s+(?<source>[0-9\.\/a-zA-Z]+)\s+(?<destination>[0-9\.\/a-zA-Z]+)\s*(?<options>.+)/;
	

}
