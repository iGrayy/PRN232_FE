"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Award,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Heart,
  Home,
  LineChart,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  User,
  Menu,
} from "lucide-react"

export default function DashboardPage() {
  const [progress, setProgress] = useState(65)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-4 border-b">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>NT</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium leading-none truncate">Nguyễn Văn Tuấn</p>
              <p className="text-xs text-muted-foreground truncate">Thành viên Nâng cao</p>
            </div>
          </div>

          <div className="flex-1 px-4 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tổng quan</h3>
                <nav className="space-y-1">
                  <a
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-md"
                  >
                    <Home className="h-4 w-4" />
                    Trang chủ
                  </a>
                  <a
                    href="/dashboard/progress"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <LineChart className="h-4 w-4" />
                    Tiến trình
                  </a>
                  <a
                    href="/plan"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Calendar className="h-4 w-4" />
                    Kế hoạch cai thuốc
                  </a>
                  <a
                    href="/dashboard/achievements"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Award className="h-4 w-4" />
                    Thành tích
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Hỗ trợ</h3>
                <nav className="space-y-1">
                  <a
                    href="/dashboard/community"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Cộng đồng
                  </a>
                  <a
                    href="/dashboard/coaches"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <User className="h-4 w-4" />
                    Huấn luyện viên
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t">
            <nav className="space-y-1">
              <a
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Settings className="h-4 w-4" />
                Cài đặt
              </a>
              <a
                href="/logout"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Bảng điều khiển</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Ghi nhận hôm nay
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ngày không hút thuốc</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 ngày</div>
                <p className="text-xs text-muted-foreground">+2 ngày so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tiền tiết kiệm được</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">840.000đ</div>
                <p className="text-xs text-muted-foreground">+60.000đ so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Điếu thuốc không hút</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">560 điếu</div>
                <p className="text-xs text-muted-foreground">+40 điếu so với tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sức khỏe cải thiện</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="progress">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="progress">Tiến trình</TabsTrigger>
                  <TabsTrigger value="plan">Kế hoạch</TabsTrigger>
                  <TabsTrigger value="achievements">Thành tích</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Tháng này
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <TabsContent value="progress" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tiến trình cai thuốc</CardTitle>
                    <CardDescription>Theo dõi tiến trình cai thuốc của bạn trong tháng này</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Biểu đồ tiến trình cai thuốc</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="plan" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Kế hoạch cai thuốc</CardTitle>
                    <CardDescription>Kế hoạch cai thuốc của bạn và các mốc quan trọng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Kế hoạch cai thuốc</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thành tích đạt được</CardTitle>
                    <CardDescription>Các huy hiệu và thành tích bạn đã đạt được</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                        <Award className="h-10 w-10 text-emerald-500 mb-2" />
                        <p className="font-medium text-center">1 tuần không hút thuốc</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                        <Award className="h-10 w-10 text-emerald-500 mb-2" />
                        <p className="font-medium text-center">2 tuần không hút thuốc</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                        <Award className="h-10 w-10 text-emerald-500 mb-2" />
                        <p className="font-medium text-center">3 tuần không hút thuốc</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                        <Award className="h-10 w-10 text-emerald-500 mb-2" />
                        <p className="font-medium text-center">4 tuần không hút thuốc</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lời nhắc hôm nay</CardTitle>
                <CardDescription>Thông điệp động viên và nhắc nhở</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <blockquote className="border-l-4 border-emerald-500 pl-4 italic">
                    "Mỗi ngày không hút thuốc là một chiến thắng. Hãy tiếp tục cố gắng!"
                  </blockquote>
                  <p className="text-sm text-muted-foreground">
                    Hôm nay là ngày thứ 28 của bạn không hút thuốc. Bạn đã tiết kiệm được 840.000đ và tránh được 560
                    điếu thuốc có hại.
                  </p>
                  <p className="text-sm font-medium">Lý do cai thuốc của bạn: "Vì sức khỏe bản thân và gia đình"</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cải thiện sức khỏe</CardTitle>
                <CardDescription>Những thay đổi tích cực về sức khỏe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Nhịp tim ổn định hơn</p>
                      <p className="text-sm text-muted-foreground">Sau 2 tuần không hút thuốc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Hơi thở dễ dàng hơn</p>
                      <p className="text-sm text-muted-foreground">Sau 3 tuần không hút thuốc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Cải thiện vị giác</p>
                      <p className="text-sm text-muted-foreground">Sau 4 tuần không hút thuốc</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hỗ trợ cộng đồng</CardTitle>
                <CardDescription>Tin nhắn mới từ cộng đồng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>TH</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Trần Hoàng</p>
                      <p className="text-sm text-muted-foreground">
                        Chúc mừng bạn đã đạt được 4 tuần không hút thuốc! Tôi đang ở tuần thứ 6 và cảm thấy tuyệt vời.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 giờ trước</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Lê Mai</p>
                      <p className="text-sm text-muted-foreground">
                        Bạn có thể chia sẻ những mẹo vượt qua cơn thèm thuốc không? Tôi đang gặp khó khăn.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">5 giờ trước</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Xem tất cả tin nhắn
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
