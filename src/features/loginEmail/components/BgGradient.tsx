"use client";

const BgGradient = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
};

export default BgGradient;
