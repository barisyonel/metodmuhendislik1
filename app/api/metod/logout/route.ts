import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Force dynamic rendering because we use cookies
// Static export sırasında undefined olmalı (API route'lar static export'ta çalışmaz)
export const dynamic = 'force-dynamic';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("metod_admin_token");

  return NextResponse.json({ success: true });
}

