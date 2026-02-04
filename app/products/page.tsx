import Image from "next/image";
import Link from "next/link";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

type ProductRow = {
  id: string; // character(8)
  title: string;
  price_cents: number;
  image_url: string;
  category_code: string;
};

type Props = {
  searchParams?: Promise<{ page?: string }>;
};

const PAGE_SIZE = 28;

export default async function ProductsPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const pageRaw = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.max(1, Number.parseInt(pageRaw ?? "1", 10) || 1);

  const offset = (page - 1) * PAGE_SIZE;

  // 1) total count
  const countRes = await pool.query<{ total: string }>(`
    SELECT COUNT(*)::text AS total
    FROM products;
  `);

  const total = Number.parseInt(countRes.rows[0]?.total ?? "0", 10);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // If a request for page 999, clamp it.
  const safePage = Math.min(page, totalPages);
  const safeOffset = (safePage - 1) * PAGE_SIZE;

  // 2) page results
  const result = await pool.query<ProductRow>(
    `
      SELECT
        p.id,
        p.title,
        p.price_cents,
        p.image_url,
        c.category_code
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ORDER BY p.created_at DESC
      LIMIT $1
      OFFSET $2;
    `,
    [PAGE_SIZE, safeOffset]
  );

  const products = result.rows;

  const prevPage = safePage > 1 ? safePage - 1 : null;
  const nextPage = safePage < totalPages ? safePage + 1 : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="mt-1 text-sm text-gray-600">
              Page {safePage} of {totalPages} • {total} total products
            </p>
          </div>

          <nav className="flex items-center gap-2">
            {prevPage ? (
              <Link
                href={`/products?page=${prevPage}`}
                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
              >
                ← Prev
              </Link>
            ) : (
              <span className="rounded-md border px-3 py-2 text-sm text-gray-400">
                ← Prev
              </span>
            )}

            {nextPage ? (
              <Link
                href={`/products?page=${nextPage}`}
                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Next →
              </Link>
            ) : (
              <span className="rounded-md border px-3 py-2 text-sm text-gray-400">
                Next →
              </span>
            )}
          </nav>
        </div>

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
                    Category: {p.category_code}
                  </p>
                  <p className="mt-2 text-lg font-bold">${price}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* bottom pager */}
        <div className="mt-10 flex justify-center gap-2">
          {prevPage ? (
            <Link
              href={`/products?page=${prevPage}`}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              ← Prev
            </Link>
          ) : null}

          {nextPage ? (
            <Link
              href={`/products?page=${nextPage}`}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}

