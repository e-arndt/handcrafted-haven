"use client";

import { useState } from "react";

type Props = {
  bio: string | null;
  clampLines?: number;
};

export default function SellerBio({ bio, clampLines = 4 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const text = bio ?? "Bio coming soon.";
  const clampClass = `line-clamp-${clampLines}`;

  return (
    <div className="mt-2">
      <p className={`text-sm text-gray-700 ${expanded ? "" : clampClass}`}>
        {text}
      </p>

      {(
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-sm font-medium text-blue-600 hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
