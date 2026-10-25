/** Brand, demo line, and contact. Single source of truth for the landing page. */
export const BRAND_NAME = "AlwaysOnDispatch";
export const SITE_DOMAIN = "alwaysondispatch.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const DEMO_PHONE_DISPLAY = "207-600-5188";
export const DEMO_PHONE_HREF = "tel:+12076005188";
export const CALENDLY_URL = "#book-trial";
export const FOUNDER_EMAIL = "drew.marecek@gmail.com";

/** Hash on the home page; root-relative from Privacy / Terms so the trial section still opens. */
export function trialHref() {
  if (CALENDLY_URL.startsWith("#")) return `/${CALENDLY_URL}`;
  return CALENDLY_URL;
}
