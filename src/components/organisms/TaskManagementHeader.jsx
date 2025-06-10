import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import SearchInput from '@/components/molecules/SearchInput';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

function TaskManagementHeader({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  bulkMode,
  setBulkMode,
  selectedTasksCount,
  handleBulkComplete,
  handleBulkDelete,
  onAddTaskClick,
  onCancelBulkMode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6 space-y-4"
    >
      <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div className="flex flex-wrap items-center gap-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectChange={(e) => setSelectedCategory(e.target.value)}
        />

        <div className="flex items-center space-x-2 ml-auto">
          {!bulkMode ? (
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBulkMode(true)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300"
            >
              <ApperIcon name="CheckSquare" className="w-4 h-4 mr-2 inline" />
              Bulk Select
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedTasksCount} selected
              </span>
              {selectedTasksCount > 0 && (
                <>
                  <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBulkComplete}
                    className="px-3 py-2 bg-success text-white rounded-lg text-sm hover:filter hover:brightness-110"
                  >
                    Complete
                  </Button>
                  <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBulkDelete}
                    className="px-3 py-2 bg-error text-white rounded-lg text-sm hover:filter hover:brightness-110"
                  >
                    Delete
                  </Button>
                </>
              )}
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancelBulkMode}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300"
              >
                Cancel
              </Button>
            </div>
          )}

          <Button
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTaskClick}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2 inline" />
            Add Task
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

TaskManagementHeader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  bulkMode: PropTypes.bool.isRequired,
  setBulkMode: PropTypes.func.isRequired,
  selectedTasksCount: PropTypes.number.isRequired,
  handleBulkComplete: PropTypes.func.isRequired,
  handleBulkDelete: PropTypes.func.isRequired,
  onAddTaskClick: PropTypes.func.isRequired,
  onCancelBulkMode: PropTypes.func.isRequired,
};

export default TaskManagementHeader;