import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      listIds: [2],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
