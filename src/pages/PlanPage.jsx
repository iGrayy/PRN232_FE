"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"

export default function PlanPage() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold ml-4">Lập kế hoạch cai thuốc</h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {step > 1 ? <Check className="h-4 w-4" /> : 1}
          </div>
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Thông tin cơ bản</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {step > 2 ? <Check className="h-4 w-4" /> : 2}
          </div>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Lý do cai thuốc</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {step > 3 ? <Check className="h-4 w-4" /> : 3}
          </div>
          <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Kế hoạch</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Cung cấp thông tin về thói quen hút thuốc hiện tại của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cigarettes">Số điếu thuốc hút mỗi ngày</Label>
              <Input id="cigarettes" type="number" placeholder="Ví dụ: 10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Số năm đã hút thuốc</Label>
              <Input id="years" type="number" placeholder="Ví dụ: 5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá một bao thuốc (VNĐ)</Label>
              <Input id="price" type="number" placeholder="Ví dụ: 30000" />
            </div>
            <div className="space-y-2">
              <Label>Thời điểm thường hút thuốc</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="morning" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="morning" className="font-normal">
                    Buổi sáng
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="afternoon" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="afternoon" className="font-normal">
                    Buổi chiều
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="evening" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="evening" className="font-normal">
                    Buổi tối
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="night" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="night" className="font-normal">
                    Đêm khuya
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextStep}>Tiếp theo</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Lý do cai thuốc</CardTitle>
            <CardDescription>Xác định lý do tại sao bạn muốn cai thuốc lá</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Lý do chính để cai thuốc</Label>
              <RadioGroup defaultValue="health">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="health" id="health" />
                  <Label htmlFor="health" className="font-normal">
                    Vì sức khỏe bản thân
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family" className="font-normal">
                    Vì gia đình
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="money" id="money" />
                  <Label htmlFor="money" className="font-normal">
                    Tiết kiệm chi phí
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="social" />
                  <Label htmlFor="social" className="font-normal">
                    Áp lực xã hội
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivation">Mô tả chi tiết lý do của bạn</Label>
              <textarea
                id="motivation"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ví dụ: Tôi muốn cai thuốc để có sức khỏe tốt hơn và làm gương cho con em..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
            <Button onClick={nextStep}>Tiếp theo</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Kế hoạch cai thuốc</CardTitle>
            <CardDescription>Thiết lập kế hoạch cai thuốc phù hợp với bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày bắt đầu cai thuốc</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetDate">Ngày dự kiến cai hoàn toàn</Label>
              <Input id="targetDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label>Phương pháp cai thuốc</Label>
              <RadioGroup defaultValue="gradual">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immediate" id="immediate" />
                  <Label htmlFor="immediate" className="font-normal">
                    Cai ngay lập tức
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gradual" id="gradual" />
                  <Label htmlFor="gradual" className="font-normal">
                    Cai dần dần
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Mục tiêu giảm số điếu mỗi tuần</Label>
              <Input id="dailyGoal" type="number" placeholder="Ví dụ: 2" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Quay lại
            </Button>
            <Button onClick={() => navigate("/dashboard")}>Hoàn thành</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
