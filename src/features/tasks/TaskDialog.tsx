import { useState, useEffect } from "react";
import { useTaskStore } from "../../state/taskStore";
import type { Task } from "../../state/taskStore";
import { useProjectStore } from "../../state/projectStore";
import { format } from "date-fns";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
}

const priorityOptions = [
  { value: 1, label: "Priority 1", color: "text-red-500" },
  { value: 2, label: "Priority 2", color: "text-orange-500" },
  { value: 3, label: "Priority 3", color: "text-blue-500" },
  { value: 4, label: "Priority 4", color: "text-gray-400" },
];

const TaskDialog = ({ isOpen, onClose, taskId }: TaskDialogProps) => {
  const { tasks, addTask, updateTask } = useTaskStore();
  const { projects, defaultProjects } = useProjectStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>(4);
  const [selectedProject, setSelectedProject] = useState<string>("inbox");

  // Initialize form with task data if editing
  useEffect(() => {
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(
          task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
        );
        setPriority(task.priority);
        setSelectedProject(task.projectId);
      }
    } else {
      // Reset form for new task
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority(4);
      setSelectedProject("inbox");
    }
  }, [taskId, tasks, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") return;

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate ? dueDate : undefined,
      priority,
      projectId: selectedProject,
    };

    if (taskId) {
      updateTask(taskId, taskData);
    } else {
      addTask({
        ...taskData,
        completed: false,
      });
    }

    onClose();
  };

  // Type guard for priority value
  const isPriorityValid = (value: string): value is "1" | "2" | "3" | "4" => {
    return ["1", "2", "3", "4"].includes(value);
  };

  // Handle priority change with type safety
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPriority(null);
    } else if (isPriorityValid(value)) {
      setPriority(Number(value) as 1 | 2 | 3 | 4);
    }
  };

  if (!isOpen) return null;

  // Combine default and user projects for selection
  const allProjects = [...defaultProjects, ...projects];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">
            {taskId ? "Edit Task" : "Add Task"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="task-title"
                className="block text-sm font-medium mb-1"
              >
                Task Title
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What needs to be done?"
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="task-description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Add details about this task"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="task-due-date"
                  className="block text-sm font-medium mb-1"
                >
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="block text-sm font-medium mb-1"
                >
                  Priority
                </label>
                <select
                  id="task-priority"
                  value={priority || ""}
                  onChange={handlePriorityChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">No priority</option>
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="task-project"
                className="block text-sm font-medium mb-1"
              >
                Project
              </label>
              <select
                id="task-project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {allProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md"
              >
                {taskId ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDialog;
