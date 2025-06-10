import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';

import StatsOverview from '@/components/organisms/StatsOverview';
import TaskManagementHeader from '@/components/organisms/TaskManagementHeader';
import TaskForm from '@/components/organisms/TaskForm';
import TaskList from '@/components/organisms/TaskList';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [bulkMode, setBulkMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksResult, categoriesResult] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksResult);
      setCategories(categoriesResult);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      dueDate: ''
    });
    setShowAddForm(false);
    setEditingTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate || null,
        completed: false
      };

      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.id, taskData);
        setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
        toast.success('Task updated successfully');
      } else {
        const newTask = await taskService.create(taskData);
        setTasks([newTask, ...tasks]);
        toast.success('Task created successfully');
      }

      resetForm();
    } catch (err) {
      toast.error('Failed to save task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await taskService.update(task.id, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
      
      if (!task.completed) {
        toast.success('🎉 Task completed!');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      category: task.category || '',
      priority: task.priority,
      dueDate: task.dueDate || ''
    });
    setShowAddForm(true);
  };

  const handleBulkComplete = async () => {
    try {
      const updates = Array.from(selectedTasks).map(taskId => {
        const task = tasks.find(t => t.id === taskId);
        return taskService.update(taskId, {
          ...task,
          completed: true,
          completedAt: new Date().toISOString()
        });
      });

      await Promise.all(updates);
      
      setTasks(tasks.map(task => 
        selectedTasks.has(task.id) 
          ? { ...task, completed: true, completedAt: new Date().toISOString() }
          : task
      ));

      setSelectedTasks(new Set());
      setBulkMode(false);
      toast.success(`${selectedTasks.size} tasks completed!`);
    } catch (err) {
      toast.error('Failed to complete tasks');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedTasks.size} selected tasks?`)) return;

    try {
      await Promise.all(Array.from(selectedTasks).map(id => taskService.delete(id)));
      setTasks(tasks.filter(t => !selectedTasks.has(t.id)));
      setSelectedTasks(new Set());
      setBulkMode(false);
      toast.success(`${selectedTasks.size} tasks deleted`);
    } catch (err) {
      toast.error('Failed to delete tasks');
    }
  };

  const handleCancelBulkMode = () => {
    setBulkMode(false);
    setSelectedTasks(new Set());
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-info bg-info/10 border-info/20';
      default: return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#8B5CF6'; // Default color if not found
  };

  const completedTodayCount = tasks.filter(t => t.completed && t.completedAt && isToday(new Date(t.completedAt))).length;
  const totalTasksCount = tasks.length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedTodayCount / totalTasksCount) * 100) : 0;

  if (loading) {
    return (
      <div className="h-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface rounded-xl p-6 shadow-sm"
              >
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Task List Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="animate-pulse space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-4"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <Text as="h3" className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</Text>
          <Text as="p" className="text-gray-600 mb-6">{error}</Text>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:filter hover:brightness-110"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  const emptyStateMessage = {
    title: searchQuery || selectedCategory !== 'all' ? 'No tasks found' : 'No tasks yet',
    description: searchQuery || selectedCategory !== 'all'
      ? 'Try adjusting your search or filter criteria.'
      : 'Start organizing your day by creating your first task.'
  };

  const showCreateFirstTaskButton = !searchQuery && selectedCategory === 'all';

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Text as="h1" className="text-4xl font-bold font-heading text-gray-900 mb-2">
            TaskFlow
          </Text>
          <Text as="p" className="text-gray-600">
            Organize and complete your daily tasks efficiently
          </Text>
        </motion.div>

        {/* Stats Cards */}
        <StatsOverview
          completedToday={completedTodayCount}
          totalTasks={totalTasksCount}
          completionRate={completionRate}
        />

        {/* Search and Filters */}
        <TaskManagementHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          bulkMode={bulkMode}
          setBulkMode={setBulkMode}
          selectedTasksCount={selectedTasks.size}
          handleBulkComplete={handleBulkComplete}
          handleBulkDelete={handleBulkDelete}
          onAddTaskClick={() => setShowAddForm(true)}
          onCancelBulkMode={handleCancelBulkMode}
        />

        {/* Add/Edit Task Form */}
        <TaskForm
          showForm={showAddForm}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editingTask={editingTask}
          categories={categories}
        />

        {/* Task List */}
        <TaskList
          tasks={sortedTasks}
          bulkMode={bulkMode}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDelete}
          getPriorityColor={getPriorityColor}
          getCategoryColor={getCategoryColor}
          emptyStateMessage={emptyStateMessage}
          showAddFormButton={showCreateFirstTaskButton}
          onAddFormClick={() => setShowAddForm(true)}
        />
      </div>
    </div>
  );
}

export default HomePage;