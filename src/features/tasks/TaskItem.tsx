import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTaskStore } from "../../state/taskStore";
import type { Task } from "../../state/taskStore";
import TaskDialog from "./TaskDialog";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTaskCompletion } = useTaskStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md mb-1 ${
          task.completed
            ? "bg-gray-100 dark:bg-gray-800/50"
            : "bg-white dark:bg-gray-800"
        }`}
      >
        <div
          className="cursor-move mr-2 text-gray-400 touch-none"
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </div>

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
            onClick={() => setIsEditDialogOpen(true)}
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

      <TaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        taskId={task.id}
      />
    </>
  );
};

export default TaskItem;
