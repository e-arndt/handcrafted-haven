import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, display_name, public_id, avatar_url
      FROM sellers
      ORDER BY id;
    `);

    return NextResponse.json({
      success: true,
      count: result.rowCount,
      sellers: result.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Seller query failed" },
      { status: 500 }
    );
  }
}
