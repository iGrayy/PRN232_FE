// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Button } from './../../components/ui/button';
import { Card, CardContent } from './../../components/ui/card';
import { Switch } from './../../components/ui/switch';
import baseApi from '../../api/baseApi';
import API_PATHS from '../../api/apiPaths';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('tokenA');
    if (!token) return navigate('/login');

    baseApi
      .get(API_PATHS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        const result = data.result ?? data;
        setProfile(result);
        setNotificationEnabled(result.customer?.isNotificationEnabled ?? false);
      })
      .catch(() => toast.error('Không tải được dữ liệu'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="text-center mt-20">Đang tải...</p>;

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Cover + Avatar */}
        <div className="relative mb-16">
          <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg"></div>
          <img
            src={profile.customer.avatarUrl || '/placeholder.svg'}
            alt="Avatar"
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>

        {/* Name + Username */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {profile.customer.fullName}
          </h1>
          <p className="text-gray-500 text-lg mt-1">@{profile.userName}</p>
        </div>

        {/* Info Card */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Thông tin cá nhân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="text-sm">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm">Vai trò</p>
                <p className="font-medium">{profile.role}</p>
              </div>
              <div>
                <p className="text-sm">Trạng thái</p>
                <p className="font-medium">{profile.status}</p>
              </div>
              <div>
                <p className="text-sm">Ngày tham gia</p>
                <p className="font-medium">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-between md:col-span-2 mt-4">
                <div>
                  <p className="text-sm">Nhận thông báo</p>
                </div>
                <Switch
                  checked={notificationEnabled}
                  onCheckedChange={() => {
                    setNotificationEnabled((v) => !v);
                    toast.success(`Thông báo đã ${notificationEnabled ? 'tắt' : 'bật'}`);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 text-base"
          >
            Quay lại
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('tokenA');
              toast.success('Đã đăng xuất');
              navigate('/');
            }}
            className="flex-1 py-3 text-base"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
