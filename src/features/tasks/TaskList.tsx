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

interface TaskListProps {
  projectId: string | null;
}

const TaskList = ({ projectId }: TaskListProps) => {
  const { tasks, addTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");

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
    </div>
  );
};

export default TaskList;
