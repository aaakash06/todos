import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import TaskList from "./features/tasks/TaskList";
import Header from "./components/Header";
import { useProjectStore } from "./state/projectStore";

// Create a client
const queryClient = new QueryClient();

function App() {
  const { activeProject, setActiveProject } = useProjectStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header activeProject={activeProject} />
          <main className="flex-1 overflow-y-auto p-4">
            <TaskList projectId={activeProject} />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
