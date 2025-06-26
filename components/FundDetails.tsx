import { FundResponse } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import RatingStars from "./RatingStars";
import RiskSlider from "./RiskSlider";
import AssetPieChart from "./AssetPieChart";
import DocumentLinks from "./DocumentLinks";

type FundDetailsProps = {
  data?: FundResponse["data"];
};

const FundDetails = ({ data }: FundDetailsProps) => {
  const quote = data?.quote;
  const profile = data?.profile;
  const ratings = data?.ratings;
  const portfolio = data?.portfolio;
  const documents = data?.documents;

  return (
    <div className="space-y-6">
      {/* Quote Info */}
      <Card>
        <CardContent className="p-5 space-y-2">
          <h3 className="text-lg font-medium">{quote?.name ?? "-"}</h3>
          <p className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-2 sm:truncate">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate sm:max-w-[60%] cursor-help">
                  Sector: {quote?.sectorName ?? "-"}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{quote?.sectorName ?? "-"}</p>
              </TooltipContent>
            </Tooltip>
            <span className="hidden sm:inline">·</span>
            <span className="truncate sm:max-w-[40%]" title={quote?.currency}>
              Currency: {quote?.currency ?? "-"}
            </span>
          </p>
          <p className="text-sm">
            Last Price: <strong>{quote?.lastPrice ?? "-"}</strong> (
            {quote?.lastPriceDate ?? "-"})
          </p>
          <p className="text-sm">
            Ongoing Charge: {quote?.ongoingCharge ?? "-"}%
          </p>
        </CardContent>
      </Card>

      {/* Ratings */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <h3 className="text-lg font-medium">Ratings</h3>
          <RatingStars rating={ratings?.analystRating ?? 0} />
          {ratings?.SRRI != null ? (
            <RiskSlider srri={ratings.SRRI} />
          ) : (
            <p className="text-sm text-muted-foreground">SRRI not available</p>
          )}
        </CardContent>
      </Card>

      {/* Objective */}
      <Card>
        <CardContent className="p-5 space-y-2">
          <h3 className="text-lg font-medium">Fund Objective</h3>
          <p className="text-sm text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">
            {profile?.objective ?? "No objective provided."}
          </p>
        </CardContent>
      </Card>

      {/* Portfolio */}
      {portfolio?.asset?.length ? (
        <Card>
          <CardContent className="p-5 space-y-2">
            <h3 className="text-lg font-medium">Asset Allocation</h3>
            <AssetPieChart assets={portfolio.asset} />
          </CardContent>
        </Card>
      ) : null}

      {/* Documents */}
      {documents?.length ? (
        <Card>
          <CardContent className="p-5 space-y-2">
            <h3 className="text-lg font-medium">Documents</h3>
            <DocumentLinks documents={documents} />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default FundDetails;
