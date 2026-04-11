const GRADIENT_OPTIONS: {
  from: string;
  to: string;
}[] = [
  { from: "from-blue-600", to: "to-indigo-600" },
  { from: "from-purple-600", to: "to-pink-600" },
  { from: "from-emerald-600", to: "to-teal-600" },
  { from: "from-orange-600", to: "to-red-600" },
  { from: "from-rose-600", to: "to-pink-600" },
  { from: "from-red-600", to: "to-orange-600" },
];
export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * GRADIENT_OPTIONS.length);
  const selection = GRADIENT_OPTIONS[randomIndex];
  // Mengembalikan string utuh agar Tailwind v4 bisa mendeteksi 'from-xxx' dan 'to-xxx'
  return `${selection.from} ${selection.to}`;
};
