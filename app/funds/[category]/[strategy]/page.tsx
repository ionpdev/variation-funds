import { notFound } from "next/navigation";
import { fetchFundData } from "@/lib/api";
import { getFundSlug } from "@/lib/utils";
import { FundResponse } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import FundDetails from "@/components/FundDetails";
import SaveLastVisitedFund from "@/components/SaveLastVisitedFund";
import { Button } from "@/components/ui/button";

interface FundPageProps {
  params: {
    category: string;
    strategy: string;
  };
}

const FundPage = async ({ params }: FundPageProps) => {
  const { category, strategy } = params;
  const slug = getFundSlug(category, strategy);

  if (!slug) {
    notFound();
  }

  let fundData: FundResponse;

  try {
    fundData = await fetchFundData(slug);
  } catch (error) {
    console.error(
      `Error fetching fund data for ${category}/${strategy}:`,
      error
    );
    return (
      <div className="p-4 text-red-600">
        Failed to load fund data. Please try again later.
      </div>
    );
  }
  const fund = fundData.data;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{fund.quote.name}</h1>
      <p className="text-gray-500 capitalize">
        Category: {category} | Strategy: {strategy}
      </p>
      <div className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        <SaveLastVisitedFund category={category} strategy={strategy} />
        <Button asChild variant="outline" className="mb-6">
          <Link href="/funds">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Strategy Selection
          </Link>
        </Button>
        <FundDetails data={fund} />
      </div>
    </div>
  );
};

export default FundPage;
