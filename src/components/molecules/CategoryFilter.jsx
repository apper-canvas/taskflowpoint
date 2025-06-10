import PropTypes from 'prop-types';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';

function CategoryFilter({ categories, selectedCategory, onSelectChange, className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Text as="span" className="text-sm font-medium text-gray-700">Category:</Text>
      <Select
        value={selectedCategory}
        onChange={onSelectChange}
        className="px-3 py-2"
      >
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name} ({category.taskCount})
          </option>
        ))}
      </Select>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    taskCount: PropTypes.number,
  })).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CategoryFilter;