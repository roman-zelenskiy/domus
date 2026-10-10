/** Публичный адрес сайта: на GitHub Pages подставляется из workflow */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://domus.kyiv.ua").replace(/\/$/, "");
