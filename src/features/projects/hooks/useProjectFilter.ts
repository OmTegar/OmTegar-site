import { useState, useMemo } from "react";
import { Project } from "../types/project";

export const useProjectFilter = (projects: Project[]) => {
    const [filter, setFilter] = useState<string>("All");

    const filteredProjects = useMemo(() => {
        return filter === "All"
            ? projects
            : projects.filter((project) => project.technology.includes(filter) || project.technology === filter);
    }, [projects, filter]);

    return {
        filter,
        setFilter,
        filteredProjects,
    };
};
