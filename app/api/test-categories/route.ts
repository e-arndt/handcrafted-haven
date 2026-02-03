import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM categories
      ORDER BY id;
    `);

    return NextResponse.json({
      success: true,
      count: result.rowCount,
      categories: result.rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Category query failed" },
      { status: 500 }
    );
  }
}
