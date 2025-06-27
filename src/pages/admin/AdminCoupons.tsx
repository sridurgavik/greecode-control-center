
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Copy, Tag, Calendar, Users, DollarSign } from 'lucide-react';

const AdminCoupons = () => {
  // Mock coupon data
  const coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      description: 'Welcome discount for new users',
      discount: 20,
      type: 'percentage',
      status: 'active',
      usageCount: 45,
      maxUsage: 100,
      expiryDate: '2024-12-31',
    },
    {
      id: 2,
      code: 'SAVE50',
      description: 'Fixed amount discount',
      discount: 50,
      type: 'fixed',
      status: 'active',
      usageCount: 12,
      maxUsage: 50,
      expiryDate: '2024-08-15',
    },
    {
      id: 3,
      code: 'EXPIRED10',
      description: 'Expired promotional code',
      discount: 10,
      type: 'percentage',
      status: 'expired',
      usageCount: 89,
      maxUsage: 100,
      expiryDate: '2024-01-15',
    },
  ];

  const stats = [
    { title: 'Active Coupons', value: '8', icon: Tag, color: 'text-green-600' },
    { title: 'Total Savings', value: '$12,450', icon: DollarSign, color: 'text-blue-600' },
    { title: 'Total Usage', value: '1,234', icon: Users, color: 'text-purple-600' },
    { title: 'Expires Soon', value: '3', icon: Calendar, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coupons Management</h1>
          <p className="text-gray-600 mt-2">Create and manage discount coupons for your platform</p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Coupons Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Coupons</CardTitle>
            <CardDescription>Manage your discount coupons and track their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Tag className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{coupon.code}</h3>
                        <Badge 
                          variant={coupon.status === 'active' ? 'default' : 'secondary'}
                          className={coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {coupon.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>
                          {coupon.type === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`}
                        </span>
                        <span>Used: {coupon.usageCount}/{coupon.maxUsage}</span>
                        <span>Expires: {coupon.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminCoupons;
