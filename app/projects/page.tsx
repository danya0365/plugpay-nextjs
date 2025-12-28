import { ProjectsView } from "@/src/presentation/components/projects";
import { ProjectsPresenterFactory } from "@/src/presentation/presenters/projects";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "โปรเจค | PlugPay",
  description: "จัดการโปรเจคและเว็บไซต์ของคุณ",
};

/**
 * Projects Page - Server Component for SEO
 */
export default async function ProjectsPage() {
  const presenter = ProjectsPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel("user-1");
    return <ProjectsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <ProjectsView />;
  }
}
