
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const AdminInterviews = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Interview Management</h1>
        <p className="text-gray-600 mt-2">Schedule and manage coding interviews and assessments.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
            <Calendar className="h-5 w-5 text-gray-600" />
          </div>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Interview scheduling interface will be implemented here</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminInterviews;
