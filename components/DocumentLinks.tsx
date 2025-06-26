"use client";

import { Document } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface DocumentLinksProps {
  documents: Document[];
}

const DocumentLinks = ({ documents }: DocumentLinksProps) => {
  if (!documents?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {documents.map((doc) => (
        <Button key={doc.id} asChild variant="outline" className="capitalize">
          <a href={doc.url} target="_blank" rel="noopener noreferrer">
            {doc.type}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default DocumentLinks;
