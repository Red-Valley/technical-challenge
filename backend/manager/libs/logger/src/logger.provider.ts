import { AppLogger } from './logger.service';
import { LOGGER_SERVICE_SYMBOL } from './constants/logger-symbol.constants';
import { Provider } from '@nestjs/common';

export const loggerProvider: Provider = {
  provide: LOGGER_SERVICE_SYMBOL,
  useClass: AppLogger
};