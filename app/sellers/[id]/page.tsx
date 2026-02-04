import Image from "next/image";
import Link from "next/link";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

type SellerRow = {
  id: string;
  name: string;
};

type ProductRow = {
  id: string;
  title: string;
  description: string | null;
  price_cents: number;
  image_url: string;
  category_name: string;
};

export default async function SellerProductsPage({ params }: Props) {
  const { id } = await params;

  // 1) Load seller (for heading)
  const sellerRes = await pool.query<SellerRow>(
    `
    SELECT id, name
    FROM sellers
    WHERE id = $1
    `,
    [id]
  );

  const seller = sellerRes.rows[0];
  if (!seller) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-2xl font-bold">Seller not found</h1>
        <p className="mt-2">
          <Link className="underline" href="/sellers">
            Back to sellers
          </Link>
        </p>
      </main>
    );
  }

  // 2) Load products for seller
  // NOTE: adjust p.seller_id if your column name differs (could be sellerId, seller_id, etc.)
  const productsRes = await pool.query<ProductRow>(
    `
    SELECT
      p.id,
      p.title,
      p.description,
      p.price_cents,
      p.image_url,
      c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.seller_id = $1
    ORDER BY p.created_at DESC;
    `,
    [id]
  );

  const products = productsRes.rows;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{seller.name}</h1>
          <p className="mt-1 text-sm text-gray-600">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
        </div>

        <Link
          href="/sellers"
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to sellers
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found for this seller.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => {
            const price = (p.price_cents / 100).toFixed(2);

            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                <div className="relative aspect-square w-full bg-gray-100">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className="p-4">
                  <h2 className="font-semibold leading-snug">{p.title}</h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Category: {p.category_name}
                  </p>

                  {p.description ? (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {p.description}
                    </p>
                  ) : null}

                  <p className="mt-2 text-lg font-bold">${price}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
