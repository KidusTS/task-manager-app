import { useState } from "react";
import type { Task as TaskType } from "../types";

interface TaskProps {
  task: TaskType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Omit<TaskType, "id" | "createdAt">>
  ) => void;
}

function Task({ task, onToggle, onDelete, onUpdate }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editEndDate, setEditEndDate] = useState(
    task.endDate ? task.endDate.toISOString().split('T')[0] : ''
  );

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
        endDate: editEndDate ? new Date(editEndDate) : undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditEndDate(task.endDate ? task.endDate.toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-700",
    high: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-200 dark:border-rose-700",
  };

  const priorityIcons = { low: "🟢", medium: "🟡", high: "🔴" };



  return (
    <li className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/30 dark:border-gray-600/30 mb-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-gray-800/80">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`font-semibold text-lg ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                priorityColors[task.priority]
              }`}
            >
              {priorityIcons[task.priority]} {task.priority.toUpperCase()}
            </span>
          </div>
          {task.description && (
            <p
              className={`text-sm leading-relaxed ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
              } mb-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-2`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              📅 {task.createdAt.toLocaleDateString()}
            </span>
            {task.endDate && (
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                🏁 Due {task.endDate.toLocaleDateString()}
              </span>
            )}
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                ✏️ Updated
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-200 hover:scale-110"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 hover:scale-110"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-white/20 dark:border-gray-600/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">✨ Edit Task</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as TaskType["priority"])}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
              <input
                type="date"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Task;
