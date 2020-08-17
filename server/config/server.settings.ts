import "reflect-metadata";
import { injectable } from "inversify";
import { LogLevel } from '../models/logLevel.enum';

export interface IServerSettings {
	port: number;
	enableLogging: boolean;
	logLevel: LogLevel;
	extendedUrlEncoding: boolean;
	defaultPageSize: number;
}

@injectable()
export class ServerSettings implements IServerSettings {
	
	public port: number = 3000;
	public enableLogging: boolean = true;
	public logLevel: LogLevel = LogLevel.DEBUG;
	public extendedUrlEncoding: boolean = false;
	public defaultPageSize: number = 20;


}
