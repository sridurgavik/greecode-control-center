
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminTwoFA from "./pages/admin/AdminTwoFA";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPasskeys from "./pages/admin/AdminPasskeys";
import AdminInterviews from "./pages/admin/AdminInterviews";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminEmail from "./pages/admin/AdminEmail";
import AdminSupport from "./pages/admin/AdminSupport";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 60 seconds as specified in requirements
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/2fa" element={<AdminTwoFA />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="revenue" element={<AdminRevenue />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="passkeys" element={<AdminPasskeys />} />
              <Route path="interviews" element={<AdminInterviews />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="email" element={<AdminEmail />} />
              <Route path="support" element={<AdminSupport />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
