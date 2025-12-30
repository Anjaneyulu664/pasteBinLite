import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PastePage({ params }: { params: { id: string } }) {
  const paste = await prisma.paste.findUnique({ where: { id: params.id } });
  if (!paste) notFound();
  return <pre style={{ padding: 20 }}>{paste.content}</pre>;
}
