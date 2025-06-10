import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';

function SearchInput({ value, onChange, placeholder = 'Search tasks...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-12 pr-4 py-3"
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchInput;