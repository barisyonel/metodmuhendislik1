/**
 * Application constants
 */

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Allowed file types
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
] as const;

// Rate limiting (requests per window)
export const RATE_LIMIT = {
  LOGIN: { requests: 5, window: "1m" }, // 5 istek/dakika
  UPLOAD: { requests: 10, window: "1m" }, // 10 istek/dakika
  CONTACT: { requests: 3, window: "1h" }, // 3 istek/saat
  API: { requests: 100, window: "15m" }, // 100 istek/15 dakika
} as const;

// Database
export const DB_CONNECTION_LIMIT = 10;
export const DB_CONNECT_TIMEOUT = 60000; // 60 saniye

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// String length limits
export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 255;
export const MAX_PHONE_LENGTH = 20;
export const MAX_URL_LENGTH = 2048;

// Cloudinary folders
export const CLOUDINARY_FOLDERS = {
  PRODUCTS: "metod-muhendislik/products",
  PROJECTS: "metod-muhendislik/projects",
  SLIDERS: "metod-muhendislik/sliders",
  SERVICES: "metod-muhendislik/services",
} as const;

// Cache TTL (seconds)
export const CACHE_TTL = {
  PRODUCTS: 3600, // 1 saat
  PROJECTS: 3600, // 1 saat
  SLIDERS: 1800, // 30 dakika
  SERVICES: 3600, // 1 saat
} as const;

// Security
export const JWT_EXPIRES_IN = "7d";
export const SESSION_COOKIE_NAME = "metod_admin_token";
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 gün (saniye)

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Yetkisiz erişim",
  FORBIDDEN: "Bu işlem için yetkiniz yok",
  NOT_FOUND: "Kayıt bulunamadı",
  VALIDATION_ERROR: "Validasyon hatası",
  DATABASE_ERROR: "Veritabanı hatası",
  UPLOAD_ERROR: "Dosya yükleme hatası",
  INTERNAL_ERROR: "Bir hata oluştu",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: "Başarıyla oluşturuldu",
  UPDATED: "Başarıyla güncellendi",
  DELETED: "Başarıyla silindi",
  UPLOADED: "Dosya başarıyla yüklendi",
} as const;

