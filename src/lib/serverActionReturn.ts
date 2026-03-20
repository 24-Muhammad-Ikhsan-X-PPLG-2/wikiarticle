export default function serverActionReturn() {
  return {
    error: null,
    success: true,
  };
}

export function serverActionReturnError(error: string, field?: string) {
  return {
    field,
    error,
    success: false,
  };
}
