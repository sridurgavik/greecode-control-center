import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, TrendingUp, Users, Settings, Calendar, FileText, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock data for message count - in real app this would come from your backend
  const messageCount = 5;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: TrendingUp },
    { name: 'Revenue', href: '/admin/revenue', icon: TrendingUp },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Passkeys', href: '/admin/passkeys', icon: Settings },
    { name: 'Interviews', href: '/admin/interviews', icon: Calendar },
    { name: 'Support', href: '/admin/support', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with smooth animations */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              opacity: { duration: 0.2 }
            }}
            className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg lg:shadow-none border-r border-gray-200"
          >
            <div className="flex h-full flex-col">
              {/* Logo */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src="/lovable-uploads/9be281c4-8e08-4889-aaed-259328e16ee4.png"
                    alt="Greecode Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="ml-2 text-xl font-bold text-gray-900">Greecode</span>
                  <span className="ml-2 text-sm text-gray-500">Admin</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <motion.nav 
                className="flex-1 px-4 py-6 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {navigation.map((item, index) => {
                  const isActive = location.pathname === item.href || 
                    (item.href === '/admin' && location.pathname === '/admin');
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.05), duration: 0.2 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                          isActive
                            ? 'bg-black text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* User info and logout */}
              <motion.div 
                className="border-t border-gray-200 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user?.email}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-all duration-200 hover:scale-105"
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            </Button>
            
            <motion.h1 
              className="text-xl font-semibold text-gray-900 ml-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Greecode Admin Portal
            </motion.h1>
          </div>
          
          {/* Messages Icon with Badge */}
          <div className="ml-auto">
            <Link to="/admin/support" className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-md transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 text-gray-600" />
                {messageCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    {messageCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
