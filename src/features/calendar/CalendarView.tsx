import { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  isToday,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useTaskStore } from "../../state/taskStore";
import type { Task } from "../../state/taskStore";

const CalendarView = () => {
  const { tasks } = useTaskStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate dates for the current week
  const generateWeekDays = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday

    return Array.from({ length: 7 }).map((_, index) => {
      const date = addDays(startDate, index);
      return date;
    });
  };

  const weekDays = generateWeekDays();

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      return isSameDay(new Date(task.dueDate), date);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setCurrentDate((prev) => addDays(prev, -7))}
            aria-label="Previous week"
          >
            ◀
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setCurrentDate(new Date())}
            aria-label="Today"
          >
            Today
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setCurrentDate((prev) => addDays(prev, 7))}
            aria-label="Next week"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {weekDays.map((day) => (
          <div
            key={format(day, "yyyy-MM-dd")}
            className="py-2 px-2 text-center border-r last:border-r-0 border-gray-200 dark:border-gray-700 font-medium"
          >
            {format(day, "EEE")}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 min-h-[500px]">
        {weekDays.map((day) => {
          const tasksForDay = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`p-2 border-r border-b last:border-r-0 border-gray-200 dark:border-gray-700 min-h-[100px] ${
                !isCurrentMonth
                  ? "bg-gray-100 dark:bg-gray-850 text-gray-400 dark:text-gray-500"
                  : ""
              } ${isToday(day) ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            >
              <div
                className={`text-right text-sm font-medium ${
                  isToday(day) ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                {format(day, "d")}
              </div>

              <div className="mt-1 space-y-1">
                {tasksForDay.map((task) => (
                  <div
                    key={task.id}
                    className={`p-1 text-xs rounded ${
                      task.completed
                        ? "line-through bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        : "bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
