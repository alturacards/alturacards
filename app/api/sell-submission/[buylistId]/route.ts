import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ buylistId: string }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  const { buylistId } = await params;

  try {
    const submission = await prisma.sellSubmission.findUnique({
      where: { buylistId },
      include: {
        items: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Failed to load submission:", error);

    return NextResponse.json(
      { error: "Failed to load submission" },
      { status: 500 }
    );
  }
}