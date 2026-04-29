import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const typedPassword = String(body.password || "").trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  const adminToken = process.env.ADMIN_SESSION_TOKEN?.trim();

  if (!envPassword || !adminToken) {
    return NextResponse.json(
      {
        error: "ENV_NOT_LOADING",
        message: "ADMIN_PASSWORD or ADMIN_SESSION_TOKEN is missing",
        adminPasswordExists: !!envPassword,
        adminTokenExists: !!adminToken,
      },
      { status: 500 }
    );
  }

  if (typedPassword !== envPassword) {
    return NextResponse.json(
      {
        error: "PASSWORD_DOES_NOT_MATCH",
        typedLength: typedPassword.length,
        envLength: envPassword.length,
      },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("altura_admin", adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}