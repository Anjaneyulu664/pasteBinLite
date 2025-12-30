import { prisma } from "@/lib/db";
import { getNow } from "@/lib/time";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const paste = await prisma.paste.findUnique({ where: { id: params.id } });

  if (!paste) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const now = getNow(req);

  if (paste.expiresAt && paste.expiresAt.getTime() <= now)
    return NextResponse.json({ error: "Expired" }, { status: 404 });

  if (paste.maxViews !== null && paste.views >= paste.maxViews)
    return NextResponse.json({ error: "View limit exceeded" }, { status: 404 });

  await prisma.paste.update({
    where: { id: paste.id },
    data: { views: { increment: 1 } }
  });

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.views- 1,
    expires_at: paste.expiresAt ? paste.expiresAt.toISOString() : null
  });
}
