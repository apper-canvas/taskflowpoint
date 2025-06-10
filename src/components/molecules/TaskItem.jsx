import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  bulkMode,
  isSelected,
  onToggleSelect,
  getPriorityColor,
  getCategoryColor
}) {
  const priorityColorClass = getPriorityColor(task.priority);
  const categoryBgColor = getCategoryColor(task.category);

  const isOverdue = isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = isToday(new Date(task.dueDate));

  const dueDateClass = isOverdue
    ? 'bg-error/10 text-error border border-error/20'
    : isDueToday
    ? 'bg-accent/10 text-accent border border-accent/20'
    : 'bg-gray-100 text-gray-600 border border-gray-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox / Completion Button */}
        <div className="flex items-center space-x-3">
          {bulkMode && (
            <Input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onToggleSelect(task.id, e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              whileTap={{ scale: 0.9 }}
            />
          )}
          
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleComplete(task)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              task.completed
                ? 'bg-success border-success text-white'
                : 'border-gray-300 hover:border-success'
            }`}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="animate-bounce-gentle"
              >
                <ApperIcon name="Check" className="w-4 h-4" />
              </motion.div>
            )}
          </Button>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <Text as="h3" className={`text-lg font-medium break-words ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </Text>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Priority Badge */}
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColorClass}`}>
              {task.priority === 'high' && (
                <ApperIcon name="AlertTriangle" className="w-3 h-3 mr-1 inline animate-glow" />
              )}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>

            {/* Category Badge */}
            {task.category && (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                style={{ backgroundColor: categoryBgColor + '99' }}
              >
                {task.category}
              </span>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <span className={`px-2 py-1 text-xs rounded-full ${dueDateClass}`}>
                <ApperIcon name="Calendar" className="w-3 h-3 mr-1 inline" />
                {format(new Date(task.dueDate), 'MMM d')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>

          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-error rounded-lg hover:bg-error/10"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  bulkMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  getPriorityColor: PropTypes.func.isRequired,
  getCategoryColor: PropTypes.func.isRequired,
};

export default TaskItem;