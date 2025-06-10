import PropTypes from 'prop-types';

function Select({ children, className = '', ...props }) {
  return (
    <select
      className={`${className} w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
      {...props}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;