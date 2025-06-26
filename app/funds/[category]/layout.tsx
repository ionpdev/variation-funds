import type { ReactNode } from "react";

const FundsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b px-4 py-4 md:px-8">
        <h1 className="text-xl font-semibold tracking-tight">
          AB Tech Task Fund Selector
        </h1>
      </header>

      <main className="px-4 py-6 md:px-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
};

export default FundsLayout;
