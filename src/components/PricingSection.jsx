// ✅ Cập nhật PricingSection.js
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Leaf, Star, ChevronLeft, ChevronRight } from "lucide-react"
import baseApi from './../api/baseApi'
import API_PATHS from './../api/apiPaths'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export function PricingSection() {
  const [plans, setPlans] = useState([])
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseLeave = () => { isDragging.current = false }
  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleTouchStart = (e) => {
    isDragging.current = true
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }
  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }
  const handleTouchEnd = () => { isDragging.current = false }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await baseApi.get(API_PATHS.MEMBERSHIPPACKAGE)
        const result = res.data?.result || []
        setPlans(result)

        setTimeout(() => {
          const container = scrollRef.current
          if (!container) return
          const totalWidth = container.scrollWidth
          const visibleWidth = container.clientWidth
          if (totalWidth <= visibleWidth) return
          const centerScroll = (totalWidth - visibleWidth) / 2
          container.scrollTo({ left: centerScroll, behavior: "smooth" })
        }, 100)
      } catch (err) {
        console.error("Failed to fetch plans", err)
      }
    }
    fetchPlans()
  }, [])

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.offsetWidth * 0.8
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

const handlePurchase = async (planId) => {
  try {
    const token = localStorage.getItem("tokenA");
    if (!token) {
      toast.error("Bạn chưa đăng nhập");
      return;
    }

    const res = await baseApi.post(
      API_PATHS.PAYMENT,
      { membershipPackageId: planId }
    );

    const redirectUrl = res.data?.result;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      toast.error("Không nhận được link thanh toán từ hệ thống.");
    }
  } catch (err) {
    toast.error("Lỗi khi thực hiện thanh toán.");
    console.error(err);
  }
};


  return (
    <section id="pricing" className="bg-emerald-50 dark:bg-emerald-950/20 py-16 relative">
      <div className="container relative">
        {/* Tiêu đề */}
        <div className="flex flex-col items-center text-center mb-12">
          <Badge className="mb-4" variant="outline">Gói thành viên</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Star className="text-emerald-500 h-6 w-6" />
            Lựa chọn gói phù hợp với bạn
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl">
            Chúng tôi cung cấp nhiều gói thành viên khác nhau để hỗ trợ bạn trong hành trình cai thuốc lá
          </p>
        </div>

        {/* Nút mũi tên */}
        {plans.length > 3 && (
          <>
            <button onClick={() => scroll("left")} className="absolute left-[-24px] top-[60%] z-10 bg-white dark:bg-emerald-900 p-2 rounded-full shadow-md hover:bg-emerald-100 transition hidden md:inline-flex">
              <ChevronLeft className="text-emerald-600" />
            </button>
            <button onClick={() => scroll("right")} className="absolute right-[-24px] top-[60%] z-10 bg-white dark:bg-emerald-900 p-2 rounded-full shadow-md hover:bg-emerald-100 transition hidden md:inline-flex">
              <ChevronRight className="text-emerald-600" />
            </button>
          </>
        )}

        {/* Giao diện gói */}
        {plans.length <= 3 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {plans.map((plan, index) => (
              <CardItem key={plan.id} plan={plan} index={index} onPurchase={handlePurchase} />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-1 md:px-0 overflow-visible select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {plans.map((plan, index) => (
              <div key={plan.id} className="min-w-[300px] max-w-[400px] flex-shrink-0 mx-1.5 my-8">
                <CardItem plan={plan} index={index} onPurchase={handlePurchase} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CardItem({ plan, index, onPurchase }) {
  return (
    <Card className={`relative border-2 border-solid min-h-[360px] rounded-2xl transition-transform duration-300 hover:scale-[1.04] ${index === 1 ? "border-emerald-500 shadow-xl" : "border-gray-200 dark:border-gray-700"}`}>
      <CardContent className="pt-6 pb-8 px-6 flex flex-col items-center text-center h-full">
        {index === 1 && (
          <Badge className="absolute top-3 right-3" variant="default">
            Phổ biến
          </Badge>
        )}
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
        <div className="text-4xl font-bold text-emerald-600 mb-1">
          {plan.price === 0 ? "Miễn phí" : `${plan.price.toLocaleString()}đ`}
        </div>
        <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3 text-left w-full max-w-xs">
          <li className="flex items-start gap-2">
            <Leaf className="h-4 w-4 mt-1 text-emerald-500" />
            Thời hạn: {plan.durationInDays > 0 ? `${plan.durationInDays} ngày` : "Không giới hạn"}
          </li>
          <li className="flex items-start gap-2">
            <Leaf className="h-4 w-4 mt-1 text-emerald-500" />
            Trạng thái: {plan.isActive ? "Đang hoạt động" : "Ngưng sử dụng"}
          </li>
        </ul>

        <Button className="mt-8 w-full" disabled={!plan.isActive} onClick={() => onPurchase(plan.id)}>
          Đăng ký ngay
        </Button>
      </CardContent>
    </Card>
  )
}
