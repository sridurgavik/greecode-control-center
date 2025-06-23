
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Settings, Calendar, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  delta: string;
  deltaType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, delta, deltaType, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <div className={`flex items-center mt-2 text-sm ${
              deltaType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {deltaType === 'positive' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {delta}
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const currentHour = new Date().getHours();
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 17) {
    greeting = 'Good Evening';
  }

  const metrics = [
    {
      title: 'Revenue Today',
      value: '₹45,230',
      delta: '+12.3% vs yesterday',
      deltaType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Revenue This Month',
      value: '₹8,45,670',
      delta: '+8.7% vs last month',
      deltaType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'New Users Today',
      value: '24',
      delta: '+15.2% vs yesterday',
      deltaType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Passkeys Generated Today',
      value: '18',
      delta: '-5.4% vs yesterday',
      deltaType: 'negative' as const,
      icon: Settings,
    },
    {
      title: 'Upcoming Interviews',
      value: '7',
      delta: '+2 from yesterday',
      deltaType: 'positive' as const,
      icon: Calendar,
    },
    {
      title: 'Open Support Tickets',
      value: '3',
      delta: '-2 from yesterday',
      deltaType: 'positive' as const,
      icon: FileText,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Greeting Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl font-bold text-gray-900"
        >
          {greeting}, Admin!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600 mt-2"
        >
          Here's what's happening with your platform today.
        </motion.p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            delta={metric.delta}
            deltaType={metric.deltaType}
            icon={metric.icon}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <Users className="h-8 w-8 text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">View and edit user accounts</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">Revenue Analytics</p>
              <p className="text-sm text-gray-600">View detailed revenue reports</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <Calendar className="h-8 w-8 text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">Schedule Interview</p>
              <p className="text-sm text-gray-600">Add new interview sessions</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <FileText className="h-8 w-8 text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">Support Queue</p>
              <p className="text-sm text-gray-600">Handle customer inquiries</p>
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
