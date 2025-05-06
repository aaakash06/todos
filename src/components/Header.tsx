import { useProjectStore } from "../state/projectStore";

interface HeaderProps {
  activeProject: string | null;
}

const Header = ({ activeProject }: HeaderProps) => {
  const { projects, defaultProjects } = useProjectStore();

  // Function to get the project title
  const getProjectTitle = () => {
    if (!activeProject) return "Tasks";

    // Check default projects
    const defaultProject = defaultProjects.find((p) => p.id === activeProject);
    if (defaultProject) return `${defaultProject.icon} ${defaultProject.name}`;

    // Check user projects
    const userProject = projects.find((p) => p.id === activeProject);
    if (userProject) return `${userProject.icon} ${userProject.name}`;

    return "Tasks";
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{getProjectTitle()}</h1>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-48"
            />
            <div className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
              🔍
            </div>
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="View as board"
          >
            📊
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Settings"
          >
            ⚙️
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="User profile"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
