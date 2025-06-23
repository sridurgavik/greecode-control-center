
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8">
            G
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Greecode</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The future of coding interviews and technical assessments
          </p>
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/admin/login">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg">
                  <Settings className="mr-2 h-5 w-5" />
                  Access Admin Portal
                </Button>
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              Admin portal for managing users, revenue, and platform operations
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
