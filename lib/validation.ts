import { z } from "zod";

// URL veya boş string validasyonu için helper
const urlOrEmpty = z.string().refine(
  (val) => {
    if (!val || val.trim() === "") return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Geçerli bir URL giriniz veya boş bırakın" }
);

// Ürün validasyon şeması
export const productSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır").max(200, "Başlık en fazla 200 karakter olabilir"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır").max(2000, "Açıklama en fazla 2000 karakter olabilir"),
  image: urlOrEmpty.optional(),
  images: z.union([
    z.array(urlOrEmpty),
    z.string(), // JSON string olarak da gelebilir
  ]).optional(),
  category: z.string().max(100, "Kategori en fazla 100 karakter olabilir").optional(),
  link: urlOrEmpty.optional(),
  is_active: z.union([z.boolean(), z.number(), z.literal(0), z.literal(1)]).optional(),
  sort_order: z.number().int("Sıralama numarası tam sayı olmalıdır").min(0, "Sıralama numarası 0'dan küçük olamaz").optional(),
});

// Ürün güncelleme şeması (ID ile)
export const productUpdateSchema = productSchema.extend({
  id: z.number().int("ID tam sayı olmalıdır").positive("ID pozitif olmalıdır"),
});

// Proje validasyon şeması
export const projectSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır").max(200, "Başlık en fazla 200 karakter olabilir"),
  description: z.string().max(5000, "Açıklama en fazla 5000 karakter olabilir").optional(),
  image_url: z.string().url("Geçerli bir görsel URL'i giriniz"),
  images: z.union([
    z.array(z.string().url("Geçerli bir URL giriniz")),
    z.string(), // JSON string olarak da gelebilir
  ]).optional(),
  category: z.string().max(100).optional(),
  client_name: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  project_date: z.string().optional(),
  sort_order: z.number().int().min(0).optional(),
  is_active: z.union([z.boolean(), z.number(), z.literal(0), z.literal(1)]).optional(),
});

// Proje güncelleme şeması
export const projectUpdateSchema = projectSchema.extend({
  id: z.number().int().positive(),
});

// Slider validasyon şeması
export const sliderSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir").max(200),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  image_url: z.string().url("Geçerli bir görsel URL'i giriniz"),
  video_url: z.string().url("Geçerli bir video URL'i giriniz").optional().or(z.literal("")),
  link: z.string().url("Geçerli bir URL giriniz").optional().or(z.literal("")),
  color: z.string().max(50).optional(),
  is_active: z.union([z.boolean(), z.number(), z.literal(0), z.literal(1)]).optional(),
  sort_order: z.number().int().min(0).optional(),
});

// Slider güncelleme şeması
export const sliderUpdateSchema = sliderSchema.extend({
  id: z.number().int().positive(),
});

// Hizmet validasyon şeması
export const serviceSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").max(200),
  description: z.string().max(1000).optional(),
  href: z.string().startsWith("/", "Link / ile başlamalıdır").max(200),
  icon: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).optional(),
  is_active: z.union([z.boolean(), z.number(), z.literal(0), z.literal(1)]).optional(),
});

// Hizmet güncelleme şeması
export const serviceUpdateSchema = serviceSchema.extend({
  id: z.number().int().positive(),
});

// İletişim formu validasyon şeması
export const contactFormSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır").max(100, "İsim en fazla 100 karakter olabilir"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().regex(/^[0-9+\s()-]+$/, "Geçerli bir telefon numarası giriniz").min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  service: z.string().max(100).optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır").max(2000, "Mesaj en fazla 2000 karakter olabilir"),
});

// Auth validasyon şeması
export const authSchema = z.object({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır").max(50, "Kullanıcı adı en fazla 50 karakter olabilir"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır").max(100, "Şifre en fazla 100 karakter olabilir"),
});

// Type exports
export type ProductInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type SliderInput = z.infer<typeof sliderSchema>;
export type SliderUpdateInput = z.infer<typeof sliderUpdateSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type AuthInput = z.infer<typeof authSchema>;


