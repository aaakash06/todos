interface HeaderProps {
  activeProject: string | null;
}

const Header = ({ activeProject }: HeaderProps) => {
  // Function to get the project title
  const getProjectTitle = () => {
    switch (activeProject) {
      case "inbox":
        return "📥 Inbox";
      case "today":
        return "📅 Today";
      case "upcoming":
        return "📆 Upcoming";
      case "project1":
        return "💼 Work";
      case "project2":
        return "🏠 Personal";
      case "project3":
        return "🛒 Shopping";
      default:
        return "Tasks";
    }
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

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            📊
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            ⚙️
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            👤
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
