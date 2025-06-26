"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FundDetails from "@/components/FundDetails";

import { useFundData } from "@/hooks/useFundData";

const CATEGORIES = {
  growth: ["cautious", "balanced", "adventurous"],
  responsible: ["responsible"],
} as const;

const slugMap: Record<string, string> = {
  cautious: "BYW8RV9",
  balanced: "BYW8RX1",
  adventurous: "BYW8VG2",
  responsible: "BN0S2V9",
};

type Category = keyof typeof CATEGORIES;

const TabFundExplorerPage = () => {
  const [category, setCategory] = useState<Category>("growth");
  const [activeStrategy, setActiveStrategy] = useState<string>("cautious");

  useEffect(() => {
    const storedStrategy = localStorage.getItem("selectedTabStrategy");
    if (storedStrategy && Object.keys(slugMap).includes(storedStrategy)) {
      setActiveStrategy(storedStrategy);
      for (const [category, strategies] of Object.entries(CATEGORIES)) {
        if (strategies.includes(storedStrategy)) {
          setCategory(category as Category);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedTabStrategy", activeStrategy);
  }, [activeStrategy]);

  const slug = slugMap[activeStrategy];
  const { data, loading, error } = useFundData(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AB Tech Task Funds Explore</h1>

      <div className="flex gap-4 mb-6">
        {Object.keys(CATEGORIES).map((key) => (
          <Button
            key={key}
            variant={category === key ? "default" : "outline"}
            onClick={() => {
              const newCategory = key as Category;
              setCategory(newCategory);
              setActiveStrategy(CATEGORIES[newCategory][0]);
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>

      <Tabs
        value={activeStrategy}
        onValueChange={setActiveStrategy}
        className="w-full"
      >
        <TabsList className="mb-4">
          {CATEGORIES[category].map((strategy) => (
            <TabsTrigger key={strategy} value={strategy}>
              {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES[category].map((strategy) => (
          <TabsContent
            key={strategy}
            value={strategy}
            className="w-full min-h-[450px] px-4 sm:px-6"
          >
            {loading && activeStrategy === strategy ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              </div>
            ) : error && activeStrategy === strategy ? (
              <Card>
                <CardContent className="p-6 text-sm text-destructive">
                  Failed to load fund data.
                </CardContent>
              </Card>
            ) : data && activeStrategy === strategy ? (
              <FundDetails data={data} />
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabFundExplorerPage;
