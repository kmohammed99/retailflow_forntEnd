import { useMemo } from 'react';
import { BRANDS, type BrandKey } from './brands.config';

export function useBrand() {
  // مثال: من env أو subdomain
  const sub = window.location.hostname.split('.')[0]; // noir.myapp.com → noir
  const key = (import.meta.env.VITE_BRAND_KEY as BrandKey) || (sub as BrandKey) || 'default';
  return useMemo(() => BRANDS[key] ?? BRANDS.default, [key]);
}
