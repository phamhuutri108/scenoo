import { notFound, redirect } from "next/navigation";
import ShotlistContainer from "@/components/shotlist/ShotlistContainer";

interface PageProps {
  params: Promise<{
    projectSlug: string;
    scriptId: string;
    view: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { view } = await params;
  const titles: Record<string, string> = {
    report: "Shotlist Report | Scenoo",
  };
  return { title: titles[view] || "Shotlist | Scenoo" };
}

export default async function ShotlistViewPage({ params }: PageProps) {
  const { projectSlug, scriptId, view } = await params;

  if (view === "table") {
    redirect(`/workspace/${projectSlug}/${scriptId}/shotlist`);
  }

  if (view !== "report") {
    notFound();
  }

  return <ShotlistContainer />;
}