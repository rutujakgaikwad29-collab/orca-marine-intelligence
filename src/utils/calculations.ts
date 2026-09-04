export const calculateRiskColor = (score: number) => {
  if (score < 25) return 'text-safe bg-safe/10';
  if (score < 50) return 'text-moderate bg-moderate/10';
  if (score < 75) return 'text-high bg-high/10';
  return 'text-critical bg-critical/10';
};
