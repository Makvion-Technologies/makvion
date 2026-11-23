const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
export const rupees = (n: number) => `₹ ${fmt.format(n)}`;
