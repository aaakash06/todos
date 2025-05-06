import { useState } from "react";

interface SidebarProps {
  activeProject: string | null;
  setActiveProject: (projectId: string) => void;
}

const defaultProjects = [
  { id: "inbox", name: "Inbox", icon: "📥" },
  { id: "today", name: "Today", icon: "📅" },
  { id: "upcoming", name: "Upcoming", icon: "📆" },
];

const userProjects = [
  { id: "project1", name: "Work", icon: "💼" },
  { id: "project2", name: "Personal", icon: "🏠" },
  { id: "project3", name: "Shopping", icon: "🛒" },
];

const Sidebar = ({ activeProject, setActiveProject }: SidebarProps) => {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  return (
    <aside className="w-64 h-full bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-primary text-xl font-bold flex items-center">
            <span className="mr-2">✓</span> Todoist Clone
          </h1>
        </div>

        <nav>
          <ul className="space-y-1">
            {defaultProjects.map((project) => (
              <li key={project.id}>
                <button
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                    activeProject === project.id
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveProject(project.id)}
                >
                  <span className="mr-2">{project.icon}</span>
                  <span>{project.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer"
            onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
          >
            <span className="font-medium">Projects</span>
            <span>{isProjectsExpanded ? "▼" : "►"}</span>
          </div>

          {isProjectsExpanded && (
            <ul className="mt-1 space-y-1 pl-2">
              {userProjects.map((project) => (
                <li key={project.id}>
                  <button
                    className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                      activeProject === project.id
                        ? "bg-gray-300 dark:bg-gray-700"
                        : "hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <span className="mr-2">{project.icon}</span>
                    <span>{project.name}</span>
                  </button>
                </li>
              ))}

              <li>
                <button className="flex items-center w-full px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md text-left">
                  <span className="mr-2">+</span>
                  <span>Add Project</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
