import { getProjects } from "@/features/projects/services/projectService";
import ProjectShowcase from "@/features/projects/components/ProjectShowcase";

export default async function ProjectsPage() {
  // Fetch data on the server (DIP: Data fetching is abstracted)
  const projects = await getProjects();

  return (
    <ProjectShowcase projects={projects} />
  );
}
