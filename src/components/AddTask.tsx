import { useState } from "react";
import type { Task } from "../types";

interface AddTaskProps {
  onAdd: (
    title: string,
    description?: string,
    priority?: Task["priority"],
    endDate?: Date
  ) => boolean;
  canAddMore: boolean;
}

function AddTask({ onAdd, canAddMore }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [endDate, setEndDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const success = onAdd(
        title.trim(),
        description.trim() || undefined,
        priority,
        endDate ? new Date(endDate) : undefined
      );
      if (success) {
        setTitle("");
        setDescription("");
        setPriority("medium");
        setEndDate("");
        setShowDetails(false);
      }
    }
  };

  if (!canAddMore) {
    return (
      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
          ⚠️ Task limit reached (5/5). Complete or delete tasks to add more.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 dark:border-gray-600/30">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-3 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
          >
            ⚙️
          </button>
        </div>

        {showDetails && (
          <div className="space-y-3 mb-3">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description (optional)"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          ✨ Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;
