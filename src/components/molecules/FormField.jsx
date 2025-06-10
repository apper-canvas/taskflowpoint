import PropTypes from 'prop-types';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';

function FormField({ label, id, type = 'text', selectOptions, children, ...props }) {
  const InputComponent = selectOptions ? Select : Input;

  return (
    <div>
      <Text as="label" htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </Text>
      <InputComponent id={id} type={type} {...props}>
        {selectOptions && selectOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {children} {/* For cases where children are passed directly to Select */}
      </InputComponent>
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  children: PropTypes.node,
};

export default FormField;