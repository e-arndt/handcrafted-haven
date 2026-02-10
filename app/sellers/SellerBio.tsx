"use client";

import { useState } from "react";

type Props = {
  bio: string | null;
};

export default function SellerBio({ bio }: Props) {
  const [expanded, setExpanded] = useState(false);

  const text = bio ?? "Bio coming soon.";

  return (
    <div className="mt-2">
      <p className={`text-sm text-gray-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>

      {bio && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded((v) => !v);
          }}

          className="mt-1 text-sm font-medium text-blue-600 hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
