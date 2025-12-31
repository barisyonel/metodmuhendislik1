/**
 * Centralized logging utility
 * Production'da structured logging için hazır
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction =
    process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment || this.isProduction) {
      console.log(this.formatMessage("info", message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment || this.isProduction) {
      console.warn(this.formatMessage("warn", message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: this.isDevelopment ? error.stack : undefined,
              name: error.name,
            }
          : String(error),
    };

    if (this.isDevelopment || this.isProduction) {
      console.error(this.formatMessage("error", message, errorContext));
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, context));
    }
  }

  // Database query logging
  query(sql: string, duration?: number, context?: LogContext): void {
    if (this.isDevelopment) {
      const queryContext: LogContext = {
        ...context,
        sql: sql.substring(0, 200), // İlk 200 karakter
        duration: duration ? `${duration}ms` : undefined,
      };
      this.debug("Database Query", queryContext);
    }
  }
}

export const logger = new Logger();
