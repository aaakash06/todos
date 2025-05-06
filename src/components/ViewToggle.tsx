export type ViewType = "list" | "board" | "calendar";

interface ViewToggleProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewToggle = ({ activeView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-md">
      <button
        className={`px-3 py-1 rounded-md text-sm ${
          activeView === "list"
            ? "bg-white dark:bg-gray-800 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 hover:dark:bg-gray-600"
        }`}
        onClick={() => onViewChange("list")}
      >
        📋 List
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm ${
          activeView === "board"
            ? "bg-white dark:bg-gray-800 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 hover:dark:bg-gray-600"
        }`}
        onClick={() => onViewChange("board")}
      >
        📊 Board
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm ${
          activeView === "calendar"
            ? "bg-white dark:bg-gray-800 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 hover:dark:bg-gray-600"
        }`}
        onClick={() => onViewChange("calendar")}
      >
        📅 Calendar
      </button>
    </div>
  );
};

export default ViewToggle;
