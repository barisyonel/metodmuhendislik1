/**
 * Logger utility - Production'da console.log'ları devre dışı bırakır
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: isDev ? console.log : () => {},
  error: console.error, // Hatalar her zaman loglanmalı
  warn: isDev ? console.warn : () => {},
  info: isDev ? console.info : () => {},
  debug: isDev ? console.debug : () => {},
};
