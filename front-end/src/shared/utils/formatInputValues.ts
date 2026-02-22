export const formatCurrency = (value: string | number): string => {
  let isNegative = false;
  if (typeof value === "number") {
    value = value.toFixed(2);
    const convertedValue = Number(value);
    isNegative = typeof convertedValue === "number" && convertedValue < 0;
  }

  value = value.replace(/\D/g, "");
  if (!value) return "0,00";

  return `${isNegative ? "-" : ""} ${(parseFloat(value) / 100).toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
};

// Formata string de moeda para número
export function formatBrlStringToNumber(value: string): number {
  if (!value) return 0;

  let numeric = value.replace(/[^\d.,]/g, "");

  numeric = numeric.replace(/\./g, "").replace(",", ".");

  return parseFloat(numeric);
}
