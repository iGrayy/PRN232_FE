"use client"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

// UI
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import SmokingRecordSection from "./../components/SmokingRecordSection"
import PlanSection from "./../components/PlanSection"

// Icons
import {
  Award, Calendar, Clock, DollarSign, Heart, Home, LineChart,
  LogOut, MessageCircle, Plus, User, Menu
} from "lucide-react"

import { getCurrentSmokingRecord, patchQuitSmoking } from "../api/smokingRecordApi"

export default function DashboardPage() {
  const [progress, setProgress] = useState(65)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)

  // Section control
  const [activeSection, setActiveSection] = useState("dashboard");
  // "dashboard" | "smoking-info" | "plan"

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const token = localStorage.getItem("tokenA")
    if (!token) {
      navigate("/login")
      return
    }
    if (!user?.id) return
    if (hasFetched.current) return

    hasFetched.current = true
    loadCurrentRecord(user.id)
    // eslint-disable-next-line
  }, [user?.id])

  const loadCurrentRecord = (customerId) => {
    setLoading(true)
    getCurrentSmokingRecord(customerId)
      .then((data) => {
        setRecord(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error("Không tải được tiến trình cai thuốc")
        setLoading(false)
      })
  }

  const handleQuitToday = () => {
    if (!record?.id) {
      toast.error("Không có dữ liệu để ghi nhận")
      return
    }
    patchQuitSmoking(record.id)
      .then(() => {
        toast.success("Ghi nhận hôm nay thành công")
        return getCurrentSmokingRecord(record.customerId)
      })
      .then((data) => {
        setRecord(data)
      })
      .catch(() => toast.error("Lỗi khi ghi nhận hôm nay"))
  }

  const calculateSmokeFreeDays = (startDateStr) => {
    if (!startDateStr) return 0
    const start = new Date(startDateStr)
    const now = new Date()
    const diff = now - start
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return days
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  }

  const smokeFreeDays = calculateSmokeFreeDays(record?.smokingStartDate)
  const cigarettesPerDay = record?.cigarettesPerDay ?? 0
  const cigarettesPerPack = record?.cigarettesPerPack ?? 20
  const costPerPack = record?.costPerPack ?? 0
  const cigarettesAvoided = smokeFreeDays * cigarettesPerDay
  const costPerCigarette = cigarettesPerPack > 0 ? costPerPack / cigarettesPerPack : 0
  const moneySaved = cigarettesAvoided * costPerCigarette

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-4 border-b">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>NT</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium leading-none truncate">{user?.userName || "Người dùng"}</p>
              <p className="text-xs text-muted-foreground truncate">Thành viên</p>
            </div>
          </div>

          <div className="flex-1 px-4 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tổng quan</h3>
                <nav className="space-y-1">
                  <button
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${activeSection === "dashboard" ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveSection("dashboard")}
                  >
                    <Home className="h-4 w-4" /> Trang chủ
                  </button>
                  <button
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${activeSection === "smoking-info" ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveSection("smoking-info")}
                  >
                    <User className="h-4 w-4" /> Thông tin hút thuốc
                  </button>
                  <button
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${activeSection === "plan" ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveSection("plan")}
                  >
                    <Calendar className="h-4 w-4" /> Kế hoạch cai thuốc
                  </button>
                  <button
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100`}
                    onClick={() => setActiveSection("achievements")}
                  >
                    <Award className="h-4 w-4" /> Thành tích
                  </button>
                </nav>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Hỗ trợ</h3>
                <nav className="space-y-1">
                  <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    <MessageCircle className="h-4 w-4" /> Cộng đồng
                  </button>
                  <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    <User className="h-4 w-4" /> Huấn luyện viên
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t">
            <nav className="space-y-1">
              <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                <LogOut className="h-4 w-4" /> Quay về
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b bg-background px-4 py-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Bảng điều khiển</h1>
          </div>
          {activeSection === "dashboard" && (
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleQuitToday}>
                <Plus className="mr-2 h-4 w-4" /> Ghi nhận hôm nay
              </Button>
            </div>
          )}
        </header>

        <main className="flex-1 p-6 pt-4 overflow-auto max-h-[calc(100vh-4rem)]">

          {/* DASHBOARD OVERVIEW */}
          {activeSection === "dashboard" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Ngày không hút thuốc</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{smokeFreeDays} ngày</div>
                  <p className="text-xs text-muted-foreground">Kể từ ngày bắt đầu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tiền tiết kiệm được</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {moneySaved.toLocaleString("vi-VN")} đ
                  </div>
                  <p className="text-xs text-muted-foreground">Dựa trên giá thuốc</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Điếu thuốc không hút</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cigarettesAvoided} điếu</div>
                  <p className="text-xs text-muted-foreground">Tránh được</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sức khỏe cải thiện</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{progress}%</div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>
            </div>
          )}

          {/* SECTION: Thông tin hút thuốc */}
          {activeSection === "smoking-info" && (
            <section>
              <SmokingRecordSection refreshRecord={() => loadCurrentRecord(user.id)} />
            </section>
          )}

          {/* SECTION: Kế hoạch cai thuốc */}
          {activeSection === "plan" && (
            <section>
              <PlanSection />
            </section>
          )}

        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
