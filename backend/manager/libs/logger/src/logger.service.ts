import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

type LogParam = string | number | boolean | object | null | undefined;

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logDir: string;
  private readonly logFile: string;

  constructor() {
    this.logDir = resolve(process.cwd(), 'logs');
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
    this.logFile = resolve(this.logDir, 'workflow.log');
  }

  private formatParam(param: unknown): string {
    if (typeof param === 'object') return JSON.stringify(param);
    return String(param);
  }

  private writeToFile(level: string, message: unknown, optionalParams: unknown[]) {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${this.formatParam(message)} ${optionalParams
      .map(this.formatParam)
      .join(' ')}\n`;
    appendFileSync(this.logFile, formatted);
  }

  log(message: LogParam, ...optionalParams: LogParam[]) {
    console.log('[LOG]', message, ...optionalParams);
    this.writeToFile('LOG', message, optionalParams);
  }

  error(message: LogParam, ...optionalParams: LogParam[]) {
    console.error('[ERROR]', message, ...optionalParams);
    this.writeToFile('ERROR', message, optionalParams);
  }

  warn(message: LogParam, ...optionalParams: LogParam[]) {
    console.warn('[WARN]', message, ...optionalParams);
    this.writeToFile('WARN', message, optionalParams);
  }

  debug(message: LogParam, ...optionalParams: LogParam[]) {
    console.debug('[DEBUG]', message, ...optionalParams);
    this.writeToFile('DEBUG', message, optionalParams);
  }

  verbose(message: LogParam, ...optionalParams: LogParam[]) {
    console.info('[VERBOSE]', message, ...optionalParams);
    this.writeToFile('VERBOSE', message, optionalParams);
  }

  fatal(message: LogParam, ...optionalParams: LogParam[]) {
    console.error('[FATAL]', message, ...optionalParams);
    this.writeToFile('FATAL', message, optionalParams);
  }
}