import PropTypes from 'prop-types';

function Input({ className = '', ...props }) {
  return (
    <input
      className={`${className} w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;