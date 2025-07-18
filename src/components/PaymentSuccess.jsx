import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccess() {
  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate("/") // về trang chủ
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-50">
      <Card className="w-[360px] text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-600">🎉 Thanh toán thành công!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Cảm ơn bạn đã đăng ký gói thành viên.</p>
          <Button onClick={handleConfirm} className="w-full">Về trang chủ</Button>
        </CardContent>
      </Card>
    </div>
  )
}
