import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import TaskList from "./features/tasks/TaskList";
import Header from "./components/Header";
import CalendarView from "./features/calendar/CalendarView";
import ViewToggle from "./components/ViewToggle";
import type { ViewType } from "./components/ViewToggle";
import { useProjectStore } from "./state/projectStore";

// Create a client
const queryClient = new QueryClient();

function App() {
  const { activeProject, setActiveProject } = useProjectStore();
  const [activeView, setActiveView] = useState<ViewType>("list");

  // Render the active view
  const renderView = () => {
    switch (activeView) {
      case "list":
        return <TaskList projectId={activeProject} />;
      case "calendar":
        return <CalendarView />;
      case "board":
        return (
          <div className="flex h-full items-center justify-center p-10 text-gray-500 dark:text-gray-400">
            <p>Board view coming soon</p>
          </div>
        );
      default:
        return <TaskList projectId={activeProject} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header activeProject={activeProject} />

          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg">
              {activeView === "calendar" ? "Calendar" : "Tasks"}
            </h2>
            <ViewToggle activeView={activeView} onViewChange={setActiveView} />
          </div>

          <main className="flex-1 overflow-y-auto p-4">{renderView()}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
