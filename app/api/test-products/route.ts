import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // One product per category (newest per category)
    const sql = `
      SELECT DISTINCT ON (p.category_id)
        p.id,
        p.title,
        p.price_cents,
        p.image_url,
        p.category_id,
        c.category_code
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ORDER BY p.category_id, p.created_at DESC;
    `;

    const result = await pool.query(sql);

    return NextResponse.json({
      success: true,
      count: result.rowCount,
      products: result.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Product query failed" },
      { status: 500 }
    );
  }
}
