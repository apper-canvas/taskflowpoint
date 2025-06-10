import PropTypes from 'prop-types';
import StatCard from '@/components/molecules/StatCard';
import { motion } from 'framer-motion';

function StatsOverview({ completedToday, totalTasks, completionRate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      <StatCard
        title="Tasks Completed Today"
        value={completedToday}
        iconName="CheckCircle"
        bgColorClass="bg-gradient-to-r from-primary to-secondary text-white"
        textColorClass="text-white/80"
        delay={0.1}
      />
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        iconName="List"
        bgColorClass="bg-surface"
        textColorClass="text-accent"
        delay={0.2}
      />
      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        iconName="TrendingUp"
        bgColorClass="bg-surface"
        textColorClass="text-success"
        delay={0.3}
      />
    </motion.div>
  );
}

StatsOverview.propTypes = {
  completedToday: PropTypes.number.isRequired,
  totalTasks: PropTypes.number.isRequired,
  completionRate: PropTypes.number.isRequired,
};

export default StatsOverview;