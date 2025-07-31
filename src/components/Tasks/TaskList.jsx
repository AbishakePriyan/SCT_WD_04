import React, { useState } from 'react';
import { Plus, Filter, Search, CheckCircle, Circle, Clock } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(undefined);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'overdue':
        return task.dueDate && task.dueDate < new Date() && !task.completed;
      default:
        return true;
    }
  });

  const handleAddTask = async (taskData) => {
    await addTask(taskData);
    setIsFormOpen(false);
  };

  const handleUpdateTask = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
      setIsFormOpen(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const getFilterIcon = (filterType) => {
    switch (filterType) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'active':
        return <Circle className="w-4 h-4" />;
      case 'overdue':
        return <Clock className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = tasks.filter(t => !t.completed).length;
    const overdue = tasks.filter(t => t.dueDate && t.dueDate < new Date() && !t.completed).length;
    
    return { total, completed, active, overdue };
  };

  const counts = getTaskCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {counts.total} total • {counts.active} active • {counts.completed} completed
          </p>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
        </div>

        <div className="flex space-x-2">
          {['all', 'active', 'completed', 'overdue'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                filter === filterType
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {getFilterIcon(filterType)}
              <span className="capitalize">{filterType}</span>
              {filterType === 'overdue' && counts.overdue > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {counts.overdue}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery 
                ? 'No tasks found' 
                : filter === 'completed'
                  ? 'No completed tasks'
                  : filter === 'active'
                    ? 'No active tasks'
                    : filter === 'overdue'
                      ? 'No overdue tasks'
                      : 'No tasks yet'
              }
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first task to get organized!'
              }
            </p>
            {!searchQuery && filter === 'all' && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Task
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={handleEditTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        onCancel={handleCancelForm}
        editingTask={editingTask}
      />
    </div>
  );
};

export default TaskList;
