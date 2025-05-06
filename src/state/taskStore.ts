import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 1 | 2 | 3 | 4 | null;
  projectId: string;
  description?: string;
  labels?: string[];
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  moveTask: (id: string, projectId: string) => void;
}

// Initial mock data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    dueDate: "2025-05-10",
    priority: 1,
    projectId: "project1",
    description: "Finish the project proposal for the new client",
    labels: ["work", "important"],
  },
  {
    id: "2",
    title: "Buy groceries",
    completed: false,
    dueDate: "2025-05-08",
    priority: 2,
    projectId: "project3",
    labels: ["shopping"],
  },
  {
    id: "3",
    title: "Schedule doctor appointment",
    completed: false,
    dueDate: "2025-05-15",
    priority: 3,
    projectId: "project2",
    labels: ["health"],
  },
  {
    id: "4",
    title: "Review documentation",
    completed: true,
    priority: null,
    projectId: "project1",
    labels: ["work"],
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: uuidv4() }],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  moveTask: (id, projectId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, projectId } : task
      ),
    })),
}));
