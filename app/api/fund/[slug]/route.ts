import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const CDN_BASE_URL = process.env.CDN_BASE_URL;

  if (!CDN_BASE_URL) {
    return NextResponse.json(
      { error: "CDN_BASE_URL not set" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${CDN_BASE_URL}/${slug}.json`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "CDN fetch failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
