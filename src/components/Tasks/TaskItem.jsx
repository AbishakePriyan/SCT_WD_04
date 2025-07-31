import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, Clock } from 'lucide-react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md group ${
        task.completed
            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
            : isOverdue
            ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
            : 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
        }`}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggle(task.id, task.completed)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium transition-all duration-200 ${
                task.completed
                  ? 'text-gray-500 dark:text-gray-400 line-through'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`mt-1 text-sm transition-all duration-200 ${
                  task.completed
                    ? 'text-gray-400 dark:text-gray-500 line-through'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {task.description}
              </p>
            )}

            {(task.dueDate || task.dueTime) && (
              <div className="flex items-center space-x-4 mt-2">
                {task.dueDate && (
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      isOverdue
                        ? 'text-red-600 dark:text-red-400'
                        : task.completed
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                )}

                {task.dueTime && (
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      isOverdue
                        ? 'text-red-600 dark:text-red-400'
                        : task.completed
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(task.dueTime)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
              title="Delete task"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
