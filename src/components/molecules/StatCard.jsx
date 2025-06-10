import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

function StatCard({ title, value, iconName, bgColorClass, textColorClass, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-xl p-6 shadow-sm border border-gray-100 ${bgColorClass}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <Text as="p" className={`text-sm ${textColorClass}`}>{title}</Text>
          <Text as="p" className="text-3xl font-bold text-gray-900">{value}</Text>
        </div>
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <ApperIcon name={iconName} className={`w-6 h-6 ${textColorClass}`} />
        </div>
      </div>
    </motion.div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconName: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string,
  textColorClass: PropTypes.string,
  delay: PropTypes.number,
};

export default StatCard;