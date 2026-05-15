import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
})

/** Derive API username from storefront name (letters, numbers, underscores). */
export function handleFromStoreName(storeName) {
  const raw = String(storeName || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
  if (raw.length >= 3) return raw.slice(0, 32)
  return `shop_${Date.now().toString(36).slice(-6)}`
}

export const shopperRegisterSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
    agreeTerms: z.boolean().refine((v) => v, { message: 'You must accept the terms and privacy policy' }),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  })

export const sellerRegisterSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    businessName: z.string().min(2, 'Enter your business name'),
    storeName: z.string().min(2, 'Enter your store name'),
    email: z.string().email('Enter a valid business email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
    country: z.string().min(1, 'Select a country'),
    storeCategory: z.string().min(1, 'Select a store category'),
    phone: z.string().max(24).optional().default(''),
    monthlySalesRange: z.string().optional(),
    websiteUrl: z.string().optional(),
    marketplaceIntegrations: z.array(z.string()).optional(),
    agreeTerms: z.boolean().refine((v) => v, { message: 'You must accept the terms and privacy policy' }),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  })
  .refine((d) => {
    const p = d.phone?.trim()
    return !p || p.length >= 8
  }, { path: ['phone'], message: 'Enter a valid phone or leave blank' })

/** @deprecated Use shopperRegisterSchema / sellerRegisterSchema */
export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(32)
      .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers, and underscores only'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
    phone: z.string().min(8, 'Enter a valid phone number').max(24),
    agreeTerms: z.boolean().refine((v) => v, { message: 'You must accept the terms and privacy policy' }),
    role: z.enum(['customer', 'seller']).default('customer'),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  })
