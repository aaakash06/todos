import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 1 | 2 | 3 | 4 | null;
  projectId: string;
}

interface TaskListProps {
  projectId: string | null;
}

const TaskList = ({ projectId }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      dueDate: "2025-05-10",
      priority: 1,
      projectId: "project1",
    },
    {
      id: "2",
      title: "Buy groceries",
      completed: false,
      dueDate: "2025-05-08",
      priority: 2,
      projectId: "project3",
    },
    {
      id: "3",
      title: "Schedule doctor appointment",
      completed: false,
      dueDate: "2025-05-15",
      priority: 3,
      projectId: "project2",
    },
    {
      id: "4",
      title: "Review documentation",
      completed: true,
      priority: null,
      projectId: "project1",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Filter tasks based on selected project
  const filteredTasks = projectId
    ? tasks.filter((task) => {
        if (projectId === "inbox") return true;
        if (projectId === "today") {
          const today = new Date();
          const taskDate = task.dueDate ? new Date(task.dueDate) : null;
          return (
            taskDate &&
            taskDate.getDate() === today.getDate() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
          );
        }
        if (projectId === "upcoming") {
          return task.dueDate && new Date(task.dueDate) > new Date();
        }
        return task.projectId === projectId;
      })
    : [];

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add new task
  const addTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      completed: false,
      priority: null,
      projectId: projectId || "inbox",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  // Get priority indicator
  const getPriorityIndicator = (priority: 1 | 2 | 3 | 4 | null) => {
    switch (priority) {
      case 1:
        return <span className="text-red-500">⚑</span>;
      case 2:
        return <span className="text-orange-500">⚑</span>;
      case 3:
        return <span className="text-blue-500">⚑</span>;
      case 4:
        return <span className="text-gray-400">⚑</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={addTask}
            className="ml-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>No tasks to show</p>
            <p className="text-sm mt-1">Create your first task above</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md ${
                task.completed
                  ? "bg-gray-100 dark:bg-gray-800/50"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="h-5 w-5 mr-3 rounded-full border-2 cursor-pointer text-primary focus:ring-primary"
                aria-label={`Mark task "${task.title}" as ${
                  task.completed ? "incomplete" : "complete"
                }`}
              />

              <div className="flex-1">
                <div
                  className={`flex items-center ${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  <span className="mr-2">{task.title}</span>
                  {getPriorityIndicator(task.priority)}
                </div>

                {task.dueDate && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    📅 {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <button
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Edit task"
                >
                  📝
                </button>
                <button
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Set reminder"
                >
                  ⏰
                </button>
                <button
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="More options"
                >
                  ⋯
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
