import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "You must be signed in to review." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const productId = String(body?.productId ?? "");
  const rating = Number(body?.rating);
  const comment = String(body?.comment ?? "");

  if (!productId) return NextResponse.json({ error: "Missing productId." }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
  }
  if (comment.trim().length < 10 || comment.trim().length > 2000) {
    return NextResponse.json({ error: "Comment must be 10–2000 characters." }, { status: 400 });
  }

  // Note: your DB unique constraint (user_id, product_id) makes this safe
  await pool.query(
    `
    INSERT INTO public.reviews (id, product_id, user_id, rating, comment, created_at, updated_at)
    VALUES (
      lpad((floor(random()*100000000))::int::text, 8, '0'),
      $1, $2, $3, $4, NOW(), NOW()
    )
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET
      rating = EXCLUDED.rating,
      comment = EXCLUDED.comment,
      updated_at = NOW();
    `,
    [productId, user.id, rating, comment.trim()]
  );

  return NextResponse.json({ ok: true });
}
