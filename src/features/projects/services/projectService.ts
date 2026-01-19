import { Project } from "../types/project";
import projectsData from "@/data/ProjectData.json";

export const getProjects = async (): Promise<Project[]> => {
    // Simulator async database call
    // In the future, this will be: return await db.project.findMany();
    return new Promise((resolve) => {
        resolve(projectsData as Project[]);
    });
};
