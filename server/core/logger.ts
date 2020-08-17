import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { LogLevel } from '../models/logLevel.enum';
import { IServerSettings } from '../config/server.settings';
import * as chalk from 'chalk';


export interface ILogger {

	/**
	 * Logs the specified statement
	 * @param message the statement to log.
	 */
	debug(message:string);

	/**
	 * Logs the specified info statement
	 * @param message the statement to log.
	 */
	info(message:string);

	/**
	 * Logs the specified warning statement
	 * @param message the statement to log.
	 */
	warn(message:string);

	/**
	 * Logs the specified error statement
	 * @param message the statement to log.
	 */
	error(message:string);


}


@injectable()
export class Logger implements ILogger {
	
	/**
	 * Creates a new instance of the Logger class.
	 * @param settings Global application settings
	 * @param logFunction The function responsible for actually doing the logging.
	 */
	constructor(
		@inject('IServerSettings') private settings: IServerSettings,
		private logFunction: (message: string) => void){

	}
	
	/**
	 * Logs the specified debug statement
	 * @param message the statement to log.
	 */
	public debug(message:string, style?: string) : void{
		if(this.settings.logLevel <= LogLevel.DEBUG)
			this.logFunction(chalk.magenta.bold('[DEBUG] ') + chalk.magenta(message));
	}

	/**
	 * Logs the specified info statement
	 * @param message the statement to log.
	 */
	public info(message: string, style?: string): void {
		if(this.settings.logLevel <= LogLevel.INFO)
			this.logFunction(chalk.blue.bold('[INFO] ') + chalk.blue(message));
	}

	/**
	 * Logs the specified warning statement
	 * @param message the statement to log.
	 */
	public warn(message: string, style?: string): void {
		if(this.settings.logLevel <= LogLevel.WARN)
			this.logFunction(chalk.yellow.bold('[WARN] ') + chalk.yellow(message));
	}

	/**
	 * Logs the specified error statement
	 * @param message the statement to log.
	 */
	public error(message: string, style?: string): void {
		if(this.settings.logLevel <= LogLevel.ERROR)
			this.logFunction(chalk.red.bold('[ERROR] ') + chalk.red(message));
	}
}
