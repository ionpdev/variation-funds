"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Target, TrendingUp, Leaf } from "lucide-react";
import Link from "next/link";

const FUND_SELECTIONS: Record<string, string[]> = {
  growth: ["cautious", "balanced", "adventurous"],
  responsible: ["responsible"],
};

const STRATEGY_DETAILS: Record<string, { label: string; description: string }> =
  {
    cautious: {
      label: "Cautious",
      description:
        "Lower-risk fund focused on defensive assets like bonds and cash.",
    },
    balanced: {
      label: "Balanced",
      description:
        "Moderate-risk strategy balancing equities and fixed income.",
    },
    adventurous: {
      label: "Adventurous",
      description: "High-risk fund with a strong focus on equity growth.",
    },
    responsible: {
      label: "Responsible",
      description: "Ethical investments with sustainability focus.",
    },
  };

const ICONS = {
  cautious: <ShieldCheck className="h-5 w-5 text-muted-foreground" />,
  balanced: <Target className="h-5 w-5 text-muted-foreground" />,
  adventurous: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
  responsible: <Leaf className="h-5 w-5 text-muted-foreground" />,
};

const FundSelectorPage = () => {
  const router = useRouter();
  const [lastVisited, setLastVisited] = useState<{
    category: string;
    strategy: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastVisitedFund");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.category && parsed.strategy) {
          setLastVisited(parsed);
        }
      } catch {
        // just ignore quick solution for now
      }
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("lastVisitedFund");
    setLastVisited(null);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Select an Investment Strategy</h1>
        {lastVisited && (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                router.push(
                  `/funds/${lastVisited.category}/${lastVisited.strategy}`
                )
              }
            >
              Continue where you left
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-10">
        {Object.entries(FUND_SELECTIONS).map(([category, strategies]) => (
          <section key={category}>
            <h2 className="text-2xl font-semibold capitalize mb-4 text-muted-foreground">
              {category} funds
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {strategies.map((strategy) => {
                const details = STRATEGY_DETAILS[strategy];

                return (
                  <Card key={strategy}>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        {ICONS[strategy as keyof typeof ICONS]}
                        <span className="text-lg font-semibold">
                          {details.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {details.description}
                      </p>
                      <Button asChild className="w-full">
                        <Link href={`/funds/${category}/${strategy}`}>
                          View Fund
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default FundSelectorPage;
