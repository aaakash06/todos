import { useState } from "react";
import { useTaskStore } from "../../state/taskStore";
import type { Task } from "../../state/taskStore";

interface TaskListProps {
  projectId: string | null;
}

const TaskList = ({ projectId }: TaskListProps) => {
  const { tasks, addTask, toggleTaskCompletion } = useTaskStore();
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

  // Add new task
  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    addTask({
      title: newTaskTitle,
      completed: false,
      priority: null,
      projectId: projectId || "inbox",
    });

    setNewTaskTitle("");
  };

  // Get priority indicator
  const getPriorityIndicator = (priority: Task["priority"]) => {
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
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleAddTask}
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

                {task.labels && task.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.labels.map((label) => (
                      <span
                        key={label}
                        className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {label}
                      </span>
                    ))}
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
