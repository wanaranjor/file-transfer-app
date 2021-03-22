export const numberFormat = (number) => Intl.NumberFormat("es-ES", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(number);
