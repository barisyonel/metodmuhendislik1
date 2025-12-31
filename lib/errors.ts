/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error class
 */
export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

/**
 * Authentication error class
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "Yetkisiz erişim") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

/**
 * Authorization error class
 */
export class AuthorizationError extends AppError {
  constructor(message: string = "Bu işlem için yetkiniz yok") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

/**
 * Not found error class
 */
export class NotFoundError extends AppError {
  constructor(message: string = "Kayıt bulunamadı") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

/**
 * Database error class
 */
export class DatabaseError extends AppError {
  constructor(message: string, public originalError?: unknown) {
    super(message, 500, "DATABASE_ERROR");
    this.name = "DatabaseError";
  }
}

/**
 * API error handler - Hataları Next.js Response formatına çevirir
 */
export function handleApiError(error: unknown): { status: number; message: string; code?: string; details?: unknown } {
  // AppError instance ise direkt kullan
  if (error instanceof AppError) {
    // ValidationError ise fields'ı details içine koy
    if (error instanceof ValidationError && error.fields) {
      return {
        status: error.statusCode,
        message: error.message,
        code: error.code,
        details: { fields: error.fields },
      };
    }
    return {
      status: error.statusCode,
      message: error.message,
      code: error.code,
      details: process.env.NODE_ENV === "development" ? error.details : undefined,
    };
  }

  // Validation error (Zod)
  if (error && typeof error === "object" && "issues" in error) {
    const zodError = error as { issues: Array<{ path: string[]; message: string }> };
    const fields: Record<string, string> = {};
    
    zodError.issues.forEach((issue) => {
      const field = issue.path.join(".");
      fields[field] = issue.message;
    });

    return {
      status: 400,
      message: "Validasyon hatası",
      code: "VALIDATION_ERROR",
      details: process.env.NODE_ENV === "development" ? { fields } : undefined,
    };
  }

  // Database error
  if (error && typeof error === "object" && "code" in error) {
    const dbError = error as { code?: string; message?: string; errno?: number };
    
    if (dbError.code === "ECONNREFUSED" || dbError.code === "ETIMEDOUT" || dbError.code === "ENOTFOUND") {
      return {
        status: 503,
        message: "Veritabanı bağlantısı kurulamadı",
        code: "DATABASE_CONNECTION_ERROR",
      };
    }

    if (dbError.code === "ER_NO_SUCH_TABLE") {
      return {
        status: 500,
        message: "Veritabanı tablosu bulunamadı",
        code: "DATABASE_TABLE_ERROR",
      };
    }
  }

  // Generic error
  const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu";
  
  return {
    status: 500,
    message: errorMessage,
    code: "INTERNAL_SERVER_ERROR",
    details: process.env.NODE_ENV === "development" ? String(error) : undefined,
  };
}


