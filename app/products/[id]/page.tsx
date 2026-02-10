import Image from "next/image";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";


export const dynamic = "force-dynamic";


type Product = {
  id: string;
  title: string;
  description: string;
  price_cents: number;
  image_url: string;
  category_code: string;

  seller_id: string;
  seller_name: string;
  seller_avatar_url: string | null;
};


type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

    const result = await pool.query<Product>(
        `
        SELECT
            p.id,
            p.title,
            p.description,
            p.price_cents,
            p.image_url,
            c.category_code,

            s.id AS seller_id,
            s.display_name AS seller_name,
            s.avatar_url AS seller_avatar_url

        FROM products p
        JOIN categories c ON c.id = p.category_id
        JOIN sellers s ON s.id = p.seller_id

        WHERE p.id = $1
        LIMIT 1;
        `,
        [id]
        );


    if (result.rows.length === 0) {
        notFound();
    }

    const product = result.rows[0];
    const price = (product.price_cents / 100).toFixed(2);

    return (
        <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-gray-100">
            <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-contain p-3"
                sizes="(min-width: 768px) 50vw, 100vw"
            />
            </div>

            {/* Info */}
            <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Category: {product.category_code}
                </p>

                <p className="mt-2 text-xl font-semibold">
                    ${(product.price_cents / 100).toFixed(2)}
                </p>

            <p className="mt-6 text-gray-700">
                {product.description}
            </p>

            {/* Seller section */}
            <div className="mt-8 border-t pt-6">
                <p className="text-sm text-gray-500 mb-2">Seller</p>

                <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-200">
                    <Image
                        src={product.seller_avatar_url ?? "/sellers/placeholder.png"}
                        alt={product.seller_name}
                        fill
                        className="object-cover"
                        sizes="80px"
                    />
                    </div>

                    <div>
                    <p className="font-medium">{product.seller_name}</p>

                    <Link
                        href={`/sellers/${product.seller_id}`}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        View seller profile
                    </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </main>
    );
}