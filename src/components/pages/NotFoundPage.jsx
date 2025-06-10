import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="AlertTriangle" className="w-24 h-24 text-accent mx-auto" />
        </motion.div>
        
        <Text as="h1" className="text-4xl font-bold font-heading text-gray-900 mb-4">
          Page Not Found
        </Text>
        
        <Text as="p" className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. Let's get you back to your tasks.
        </Text>
        
        <Button
          whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl"
        >
          Back to Tasks
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;