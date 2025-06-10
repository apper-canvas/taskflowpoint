import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

function TaskForm({ showForm, formData, setFormData, handleSubmit, resetForm, editingTask, categories }) {
  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ];

  const categoryOptions = [
    { value: '', label: 'Select category...' },
    ...categories.map(category => ({ value: category.name, label: category.name }))
  ];

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-surface rounded-xl p-6 border border-gray-200">
            <Text as="h3" className="text-lg font-semibold font-heading text-gray-900 mb-4">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </Text>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  id="task-title"
                  label="Task Title *"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title..."
                  required
                />

                <FormField
                  id="task-category"
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  selectOptions={categoryOptions}
                />

                <FormField
                  id="task-priority"
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  selectOptions={priorityOptions}
                />

                <FormField
                  id="task-dueDate"
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </Button>
                <Button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-900"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TaskForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  editingTask: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default TaskForm;