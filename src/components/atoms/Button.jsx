import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function Button({ children, className = '', whileHover, whileTap, ...props }) {
  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={`${className} transition-all duration-200`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  whileHover: PropTypes.object,
  whileTap: PropTypes.object,
};

export default Button;