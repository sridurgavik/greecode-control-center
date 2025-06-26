import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
  isTwoFactorVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  showWelcomeGreeting: boolean;
  setShowWelcomeGreeting: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomeGreeting, setShowWelcomeGreeting] = useState(false);

  useEffect(() => {
    // Check for existing auth token on mount
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@greecode.com' && password === 'admin123') {
        const tempUser = {
          id: '1',
          email,
          role: 'admin',
          isAuthenticated: true,
          isTwoFactorVerified: false,
        };
        setUser(tempUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate TOTP verification - replace with actual Cloud Function call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === '123456') {
        const updatedUser = user ? { ...user, isTwoFactorVerified: true } : null;
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem('adminToken', 'mock-jwt-token');
          localStorage.setItem('adminUser', JSON.stringify(updatedUser));
          setShowWelcomeGreeting(true);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('2FA verification error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setShowWelcomeGreeting(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      verifyTwoFactor, 
      logout, 
      loading, 
      showWelcomeGreeting, 
      setShowWelcomeGreeting 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
