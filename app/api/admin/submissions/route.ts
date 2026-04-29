import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const submissions = await prisma.sellSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Failed to load admin submissions:", error);

    return NextResponse.json(
      { error: "Failed to load submissions" },
      { status: 500 }
    );
  }
}