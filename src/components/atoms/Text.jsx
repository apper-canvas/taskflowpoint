import PropTypes from 'prop-types';

function Text({ as: Component = 'p', children, className = '', ...props }) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

Text.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Text;