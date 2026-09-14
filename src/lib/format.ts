/** "+905321234567" -> "+90 (532) 123 45 67" */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 12 || !digits.startsWith("90")) return value;
  return `+90 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(
    8,
    10,
  )} ${digits.slice(10, 12)}`;
}

/** Telefon bağlantısı: tel:+905321234567 */
export function telHref(value: string): string {
  return `tel:+${value.replace(/\D/g, "")}`;
}

/** WhatsApp bağlantısı: https://wa.me/905321234567 */
export function whatsappHref(value: string): string {
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}
