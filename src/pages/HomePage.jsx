import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ArrowRight, Award, BarChart2, Calendar, Heart, Leaf, MessageCircle, Users } from "lucide-react"
import { HeroSection } from "../components/HeroSection"
import { FeatureSection } from "../components/FeatureSection"
import { AchievementRanking } from "../components/AchievementRanking"
import { BlogPreview } from "../components/BlogPreview"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">QuitSmoke</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium">
              Trang chủ
            </a>
            <a href="/features" className="text-sm font-medium">
              Tính năng
            </a>
            <a href="/pricing" className="text-sm font-medium">
              Gói thành viên
            </a>
            <a href="/blog" className="text-sm font-medium">
              Blog
            </a>
            <a href="/about" className="text-sm font-medium">
              Về chúng tôi
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login">
              <Button variant="outline">Đăng nhập</Button>
            </a>
            <a href="/register">
              <Button>Đăng ký</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Badge className="mb-4">Tính năng nổi bật</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Hỗ trợ toàn diện cho hành trình cai thuốc lá
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
              Nền tảng của chúng tôi cung cấp các công cụ và hỗ trợ cần thiết để giúp bạn cai nghiện thuốc lá thành công
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureSection
              icon={<Calendar className="h-10 w-10 text-emerald-500" />}
              title="Lập kế hoạch cai thuốc"
              description="Tạo kế hoạch cai thuốc cá nhân hóa với các mục tiêu và giai đoạn phù hợp với bạn"
            />
            <FeatureSection
              icon={<BarChart2 className="h-10 w-10 text-emerald-500" />}
              title="Theo dõi tiến trình"
              description="Ghi nhận và theo dõi tiến trình cai thuốc, số ngày không hút và tiền tiết kiệm được"
            />
            <FeatureSection
              icon={<Award className="h-10 w-10 text-emerald-500" />}
              title="Huy hiệu thành tích"
              description="Nhận huy hiệu thành tích khi đạt được các cột mốc quan trọng trong hành trình cai thuốc"
            />
            <FeatureSection
              icon={<MessageCircle className="h-10 w-10 text-emerald-500" />}
              title="Tư vấn chuyên gia"
              description="Trao đổi trực tuyến với các huấn luyện viên chuyên nghiệp để nhận tư vấn cá nhân"
            />
            <FeatureSection
              icon={<Users className="h-10 w-10 text-emerald-500" />}
              title="Cộng đồng hỗ trợ"
              description="Kết nối với cộng đồng người cai thuốc để chia sẻ kinh nghiệm và động viên lẫn nhau"
            />
            <FeatureSection
              icon={<Heart className="h-10 w-10 text-emerald-500" />}
              title="Theo dõi sức khỏe"
              description="Theo dõi các cải thiện về sức khỏe khi bạn tiếp tục hành trình không hút thuốc"
            />
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <Badge className="mb-4">Bảng xếp hạng</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Thành tích nổi bật</h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
                Những thành viên có thành tích xuất sắc trong hành trình cai thuốc lá
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AchievementRanking
                category="Ngày không hút thuốc"
                users={[
                  { name: "Nguyễn Văn A", achievement: "365 ngày", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Trần Thị B", achievement: "280 ngày", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Lê Văn C", achievement: "210 ngày", avatar: "/placeholder.svg?height=40&width=40" },
                ]}
              />
              <AchievementRanking
                category="Tiền tiết kiệm được"
                users={[
                  { name: "Phạm Văn D", achievement: "10.500.000đ", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Hoàng Thị E", achievement: "8.200.000đ", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Vũ Văn F", achievement: "6.800.000đ", avatar: "/placeholder.svg?height=40&width=40" },
                ]}
              />
              <AchievementRanking
                category="Huy hiệu đạt được"
                users={[
                  { name: "Đặng Thị G", achievement: "25 huy hiệu", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Bùi Văn H", achievement: "22 huy hiệu", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Ngô Thị I", achievement: "20 huy hiệu", avatar: "/placeholder.svg?height=40&width=40" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Badge className="mb-4">Blog</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Chia sẻ kinh nghiệm</h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
              Những bài viết và chia sẻ hữu ích từ cộng đồng và chuyên gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogPreview
              title="7 cách đối phó với cơn thèm thuốc lá"
              excerpt="Những phương pháp hiệu quả giúp bạn vượt qua cơn thèm thuốc lá trong những ngày đầu cai nghiện"
              author="TS. Nguyễn Văn Chuyên"
              date="12/05/2023"
              image="/placeholder.svg?height=200&width=400"
            />
            <BlogPreview
              title="Lợi ích sức khỏe khi bỏ thuốc lá sau 1 tháng"
              excerpt="Những thay đổi tích cực về sức khỏe mà cơ thể bạn sẽ trải qua sau 1 tháng không hút thuốc"
              author="BS. Trần Minh Tuấn"
              date="28/04/2023"
              image="/placeholder.svg?height=200&width=400"
            />
            <BlogPreview
              title="Câu chuyện thành công: Từ 2 gói/ngày đến hoàn toàn cai nghiện"
              excerpt="Hành trình cai thuốc lá thành công của anh Hoàng sau 15 năm hút thuốc liên tục"
              author="Hoàng Minh Đức"
              date="15/04/2023"
              image="/placeholder.svg?height=200&width=400"
            />
          </div>

          <div className="flex justify-center mt-8">
            <a href="/blog">
              <Button variant="outline" className="gap-2">
                Xem thêm bài viết
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        <section className="bg-emerald-50 dark:bg-emerald-950/20 py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <Badge className="mb-4" variant="outline">
                Gói thành viên
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Lựa chọn gói phù hợp với bạn</h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px]">
                Chúng tôi cung cấp nhiều gói thành viên khác nhau để đáp ứng nhu cầu của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-muted">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">Cơ bản</h3>
                    <div className="mt-4 text-4xl font-bold">Miễn phí</div>
                    <p className="text-sm text-muted-foreground mt-2">Bắt đầu hành trình cai thuốc</p>
                  </div>
                  <ul className="space-y-2 mt-6">
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Lập kế hoạch cai thuốc cơ bản</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Theo dõi tiến trình cơ bản</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Huy hiệu thành tích</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Truy cập blog và tài liệu</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Đăng ký ngay</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-500 shadow-lg relative">
                <CardContent className="pt-6">
                  <Badge className="absolute top-2 right-2" variant="default">
                    Phổ biến
                  </Badge>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">Nâng cao</h3>
                    <div className="mt-4 text-4xl font-bold">199.000đ</div>
                    <p className="text-sm text-muted-foreground mt-2">Mỗi tháng</p>
                  </div>
                  <ul className="space-y-2 mt-6">
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Tất cả tính năng cơ bản</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Kế hoạch cai thuốc cá nhân hóa</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Thông báo động viên hàng ngày</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Báo cáo sức khỏe chi tiết</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>1 buổi tư vấn với huấn luyện viên</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="default">
                    Đăng ký ngay
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-muted">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">Chuyên nghiệp</h3>
                    <div className="mt-4 text-4xl font-bold">499.000đ</div>
                    <p className="text-sm text-muted-foreground mt-2">Mỗi tháng</p>
                  </div>
                  <ul className="space-y-2 mt-6">
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Tất cả tính năng nâng cao</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Tư vấn không giới hạn với huấn luyện viên</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Hỗ trợ 24/7 qua chat</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Phân tích dữ liệu nâng cao</span>
                    </li>
                    <li className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                      <span>Tài liệu và khóa học độc quyền</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Đăng ký ngay
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Badge className="mb-4">Bắt đầu ngay hôm nay</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Hãy để chúng tôi đồng hành cùng bạn trong hành trình cai thuốc lá
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
                Đăng ký ngay hôm nay để bắt đầu hành trình cai thuốc lá của bạn với sự hỗ trợ toàn diện từ nền tảng của
                chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  Đăng ký ngay
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-100 rounded-full dark:bg-emerald-900/20" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full dark:bg-emerald-900/20" />
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Hành trình cai thuốc lá"
                  className="rounded-lg relative z-10 w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold">QuitSmoke</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nền tảng hỗ trợ cai nghiện thuốc lá toàn diện, giúp bạn đạt được mục tiêu sống khỏe mạnh hơn.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/features" className="text-muted-foreground hover:text-foreground">
                    Tính năng
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Gói thành viên
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-foreground">
                    Về chúng tôi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-foreground">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground">
                    Điều khoản sử dụng
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Email: support@quitsmoke.vn</li>
                <li className="text-muted-foreground">Điện thoại: 1900 1234</li>
                <li className="text-muted-foreground">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2023 QuitSmoke. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
