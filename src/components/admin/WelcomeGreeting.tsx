
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WelcomeGreetingProps {
  show: boolean;
  onComplete: () => void;
  userEmail?: string;
}

const WelcomeGreeting = ({ show, onComplete, userEmail }: WelcomeGreetingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const greeting = getCurrentGreeting();
  const userName = userEmail?.split('@')[0] || 'Admin';

  useEffect(() => {
    if (!show) return;

    const timer1 = setTimeout(() => setCurrentStep(1), 500);
    const timer2 = setTimeout(() => setCurrentStep(2), 1500);
    const timer3 = setTimeout(() => setCurrentStep(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50 flex items-center justify-center"
      >
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: currentStep >= 0 ? 1 : 0,
              rotate: currentStep >= 0 ? 0 : -180
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <img
                src="/lovable-uploads/9be281c4-8e08-4889-aaed-259328e16ee4.png"
                alt="Greecode Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
          </motion.div>

          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: currentStep >= 1 ? 1 : 0,
              y: currentStep >= 1 ? 0 : 20
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {greeting}
            </h1>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: currentStep >= 2 ? 1 : 0,
              y: currentStep >= 2 ? 0 : 20
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-300 capitalize">
              Welcome back, {userName}
            </p>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: currentStep >= 3 ? 1 : 0,
              scale: currentStep >= 3 ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: currentStep >= 3 ? [-8, 0, -8] : 0,
                    opacity: currentStep >= 3 ? [0.4, 1, 0.4] : 0.4
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 ml-4"
            >
              Loading your dashboard...
            </motion.p>
          </motion.div>
        </div>

        {/* Background Animation */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeGreeting;
