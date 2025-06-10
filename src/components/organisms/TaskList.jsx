import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import TaskItem from '@/components/molecules/TaskItem';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

function TaskList({
  tasks,
  bulkMode,
  selectedTasks,
  setSelectedTasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  getPriorityColor,
  getCategoryColor,
  emptyStateMessage,
  showAddFormButton,
  onAddFormClick
}) {
  const handleToggleSelect = (taskId, isChecked) => {
    const newSelected = new Set(selectedTasks);
    if (isChecked) {
      newSelected.add(taskId);
    } else {
      newSelected.delete(taskId);
    }
    setSelectedTasks(newSelected);
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="CheckSquare" className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        </motion.div>
        <Text as="h3" className="text-2xl font-semibold font-heading text-gray-900 mb-2">
          {emptyStateMessage.title}
        </Text>
        <Text as="p" className="text-gray-600 mb-6 max-w-md mx-auto">
          {emptyStateMessage.description}
        </Text>
        {showAddFormButton && (
          <Button
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddFormClick}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2 inline" />
            Create Your First Task
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            bulkMode={bulkMode}
            isSelected={selectedTasks.has(task.id)}
            onToggleSelect={handleToggleSelect}
            getPriorityColor={getPriorityColor}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  bulkMode: PropTypes.bool.isRequired,
  selectedTasks: PropTypes.instanceOf(Set).isRequired,
  setSelectedTasks: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  getPriorityColor: PropTypes.func.isRequired,
  getCategoryColor: PropTypes.func.isRequired,
  emptyStateMessage: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  showAddFormButton: PropTypes.bool.isRequired,
  onAddFormClick: PropTypes.func.isRequired,
};

export default TaskList;