import { notFound } from "next/navigation";
import BreakdownContainer from "@/components/breakdown/BreakdownContainer";
import LineScriptContainer from "@/components/linescript/LineScriptContainer";
import ShotlistContainer from "@/components/shotlist/ShotlistContainer";

interface PageProps {
  params: Promise<{
    projectSlug: string;
    scriptId: string;
    module: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { module } = await params;
  const titles: Record<string, string> = {
    breakdown: "Script Breakdown | Scenoo",
    linescript: "Line Script | Scenoo",
    shotlist: "Shotlist | Scenoo",
  };
  return { title: titles[module] || "Workspace | Scenoo" };
}

export default async function WorkspaceModulePage({ params }: PageProps) {
  const { module } = await params;

  switch (module) {
    case "breakdown":
      return <BreakdownContainer />;
    case "linescript":
      return <LineScriptContainer />;
    case "shotlist":
      return <ShotlistContainer />;
    default:
      notFound();
  }
}
