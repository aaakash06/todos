import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface Project {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  isArchived?: boolean;
  sections?: Section[];
}

export interface Section {
  id: string;
  title: string;
  projectId: string;
  order: number;
}

export interface ProjectStore {
  projects: Project[];
  defaultProjects: Project[];
  sections: Section[];
  activeProject: string | null;
  setActiveProject: (projectId: string | null) => void;
  addProject: (project: Omit<Project, "id">) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleArchiveProject: (id: string) => void;
  addSection: (section: Omit<Section, "id">) => string;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
}

// Default projects (built-in)
const initialDefaultProjects: Project[] = [
  { id: "inbox", name: "Inbox", icon: "📥" },
  { id: "today", name: "Today", icon: "📅" },
  { id: "upcoming", name: "Upcoming", icon: "📆" },
];

// User-created projects
const initialProjects: Project[] = [
  { id: "project1", name: "Work", icon: "💼", color: "#ff9900" },
  { id: "project2", name: "Personal", icon: "🏠", color: "#36b37e" },
  { id: "project3", name: "Shopping", icon: "🛒", color: "#6554c0" },
];

// Initial sections
const initialSections: Section[] = [
  { id: "section1", title: "To Do", projectId: "project1", order: 1 },
  { id: "section2", title: "In Progress", projectId: "project1", order: 2 },
  { id: "section3", title: "Done", projectId: "project1", order: 3 },
  { id: "section4", title: "Personal Tasks", projectId: "project2", order: 1 },
];

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: initialProjects,
  defaultProjects: initialDefaultProjects,
  sections: initialSections,
  activeProject: "inbox",

  setActiveProject: (projectId) => set({ activeProject: projectId }),

  addProject: (project) => {
    const id = uuidv4();
    set((state) => ({
      projects: [...state.projects, { ...project, id }],
    }));
    return id;
  },

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      sections: state.sections.filter((section) => section.projectId !== id),
    })),

  toggleArchiveProject: (id) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, isArchived: !project.isArchived }
          : project
      ),
    })),

  addSection: (section) => {
    const id = uuidv4();
    set((state) => ({
      sections: [...state.sections, { ...section, id }],
    }));
    return id;
  },

  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    })),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
}));
