import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubmissionStatus } from "@prisma/client";

type RouteContext = {
  params: Promise<{ buylistId: string }>;
};

const validStatuses: SubmissionStatus[] = [
  "PENDING",
  "RECEIVED",
  "REVIEWED",
  "APPROVED",
  "REJECTED",
  "PAID",
];

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
    console.error("Failed to load admin submission:", error);

    return NextResponse.json(
      { error: "Failed to load submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const { buylistId } = await params;

  try {
    const body = await req.json();
    const status = body?.status as SubmissionStatus | undefined;

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid submission status" },
        { status: 400 }
      );
    }

    const existing = await prisma.sellSubmission.findUnique({
      where: { buylistId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.sellSubmission.update({
      where: { buylistId },
      data: { status },
      include: {
        items: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update submission status:", error);

    return NextResponse.json(
      { error: "Failed to update submission status" },
      { status: 500 }
    );
  }
}