/**
 * Utilidades para manejo de tiempo
 */

/**
 * Convertir tiempo de expiración a segundos
 * Soporta formatos: "3600s", "60m", "1h", "7d" o número directo
 *
 * @param value - Valor a convertir (ej: "3600s", "1h", "7d")
 * @param defaultValue - Valor por defecto si no se puede parsear
 * @returns Tiempo en segundos
 */
export function getExpirationInSeconds(
  value: string | undefined,
  defaultValue: number,
): number {
  if (!value) return defaultValue;

  // Si ya es un número, retornarlo
  const numValue = parseInt(value, 10);
  if (!isNaN(numValue) && value === String(numValue)) {
    return numValue;
  }

  // Parsear formatos con sufijo (s, m, h, d)
  const match = value.match(/^(\d+)(s|m|h|d)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return num;
      case 'm':
        return num * 60;
      case 'h':
        return num * 3600;
      case 'd':
        return num * 86400;
    }
  }

  return defaultValue;
}
