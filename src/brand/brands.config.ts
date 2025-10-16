export type BrandKey = 'default' | 'noirApparel' | 'urbanThread' | 'velvetCo';

export type BrandConfig = {
  name: string;
  logoSrc: string;
  colors: { primary: string; accent: string };
  currency: 'EGP' | 'USD' | 'EUR';
};

export const BRANDS: Record<BrandKey, BrandConfig> = {
  default:  { name: 'RetailFlow', logoSrc: '/logo.svg', colors:{primary:'#111827',accent:'#f59e0b'}, currency:'EGP' },
  noirApparel: { name:'Noir Apparel', logoSrc:'/brands/noir.svg', colors:{primary:'#0f172a',accent:'#38bdf8'}, currency:'EGP' },
  urbanThread: { name:'Urban Thread', logoSrc:'/brands/urban.svg', colors:{primary:'#111827',accent:'#22c55e'}, currency:'USD' },
  velvetCo: { name:'Velvet Co', logoSrc:'/brands/velvet.svg', colors:{primary:'#1f2937',accent:'#e11d48'}, currency:'EUR' },
};
