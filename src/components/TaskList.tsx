import Task from "./Task";
import type { Task as TaskType } from "../types";

interface TaskListProps {
  tasks: TaskType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Omit<TaskType, "id" | "createdAt">>
  ) => void;
}

function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Tasks ({totalCount}/5)
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {completedCount} of {totalCount} completed
        </div>
      </div>

      {totalCount > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <ul className="space-y-0">
        {tasks
          .sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
      </ul>
    </div>
  );
}

export default TaskList;
