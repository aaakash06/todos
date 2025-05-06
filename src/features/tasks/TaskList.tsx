import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTaskStore } from "../../state/taskStore";
import TaskItem from "./TaskItem";
import TaskDialog from "./TaskDialog";

interface TaskListProps {
  projectId: string | null;
}

const TaskList = ({ projectId }: TaskListProps) => {
  const { tasks } = useTaskStore();
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => setIsAddTaskDialogOpen(true)}
          className="flex items-center w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          <span className="mr-2 text-primary">+</span>
          <span className="text-gray-600 dark:text-gray-300">Add task</span>
        </button>
      </div>

      <div className="space-y-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>No tasks to show</p>
            <p className="text-sm mt-1">
              Create your first task using the button above
            </p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter}>
            <SortableContext
              items={filteredTasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      <TaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={() => setIsAddTaskDialogOpen(false)}
      />
    </div>
  );
};

export default TaskList;
