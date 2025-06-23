
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings, Bolt } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = () => {
    setIsNavigating(true);
    // Small delay to show the loading animation
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50" />
      
      {/* Loading overlay */}
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-4"
            >
              <Bolt className="w-12 h-12 text-black mx-auto" />
            </motion.div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg font-medium text-gray-700"
            >
              Loading Admin Portal...
            </motion.p>
          </div>
        </motion.div>
      )}

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo and Brand Section */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <motion.img
                src="/lovable-uploads/8c0145d5-1e96-4a15-aea4-5193d1d75a15.png"
                alt="Greecode Logo"
                className="w-16 h-16 object-contain"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  scale: 1.05
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-black/10 rounded-xl blur-xl"
                animate={{ 
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <motion.h1 
              className="text-4xl font-bold ml-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Greecode
            </motion.h1>
          </motion.div>

          {/* Tagline with typewriter effect */}
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The future of coding interviews and technical assessments
          </motion.p>
          
          {/* CTA Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/admin/login" onClick={handleNavigation}>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Access Admin Portal
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Bolt className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Admin portal for managing users, revenue, and platform operations
              </p>
              <motion.div
                className="flex items-center justify-center space-x-2 text-xs text-gray-500"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Secure & Professional</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-black/10 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-6 h-6 bg-black/5 rounded-full"
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default Index;
