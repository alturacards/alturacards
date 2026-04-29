import { NextResponse } from "next/server";

const API_URL = "https://api.pokemontcg.io/v2/cards";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ data: [] });
    }

    const res = await fetch(`${API_URL}?q=name:${q}*`, {
      headers: {
        // Optional API key (recommended for higher rate limits)
        "X-Api-Key": process.env.POKEMON_API_KEY || "",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Pokémon cards" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      data: data.data || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}