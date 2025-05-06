import { useState } from "react";
import { useProjectStore } from "../../state/projectStore";

interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorOptions = [
  { id: "red", color: "#DB4C3F", label: "Red" },
  { id: "orange", color: "#FF9933", label: "Orange" },
  { id: "yellow", color: "#FFD700", label: "Yellow" },
  { id: "green", color: "#36B37E", label: "Green" },
  { id: "blue", color: "#0065FF", label: "Blue" },
  { id: "purple", color: "#6554C0", label: "Purple" },
];

const iconOptions = [
  { id: "briefcase", icon: "💼", label: "Work" },
  { id: "home", icon: "🏠", label: "Home" },
  { id: "shopping", icon: "🛒", label: "Shopping" },
  { id: "book", icon: "📚", label: "Education" },
  { id: "heart", icon: "❤️", label: "Health" },
  { id: "plane", icon: "✈️", label: "Travel" },
];

const AddProjectDialog = ({ isOpen, onClose }: AddProjectDialogProps) => {
  const { addProject } = useProjectStore();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[0].id
  );
  const [selectedIcon, setSelectedIcon] = useState<string>(iconOptions[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") return;

    // Get the color and icon from selected options
    const color = colorOptions.find((c) => c.id === selectedColor)?.color;
    const icon = iconOptions.find((i) => i.id === selectedIcon)?.icon;

    addProject({
      name: name.trim(),
      color,
      icon,
    });

    // Reset form and close dialog
    setName("");
    setSelectedColor(colorOptions[0].id);
    setSelectedIcon(iconOptions[0].id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Add Project</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="project-name"
                className="block text-sm font-medium mb-1"
              >
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Project Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedColor(option.id)}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === option.id
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: option.color }}
                    aria-label={`Select ${option.label} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Project Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedIcon(option.id)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 ${
                      selectedIcon === option.id ? "ring-2 ring-primary" : ""
                    }`}
                    aria-label={`Select ${option.label} icon`}
                  >
                    {option.icon}
                  </button>
                ))}
              </div>
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
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectDialog;
