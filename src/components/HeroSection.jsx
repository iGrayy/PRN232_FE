import { Button } from "./ui/button";
import { ArrowRight, Clock, DollarSign, Heart } from "lucide-react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function HeroSection() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.accessToken);

  const handleStart = () => {
    if (user) {
      toast.success("Bạn đã đăng nhập!");
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hành trình cai thuốc lá <span className="text-emerald-500">bắt đầu từ hôm nay</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Nền tảng hỗ trợ cai nghiện thuốc lá toàn diện, giúp bạn đạt được mục tiêu sống khỏe mạnh hơn
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-2" onClick={handleStart}>
                Bắt đầu ngay
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a href="/about">
                <Button size="lg" variant="outline">
                  Tìm hiểu thêm
                </Button>
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-3 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Tiết kiệm thời gian</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Tiết kiệm chi phí</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Cải thiện sức khỏe</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-100 rounded-full dark:bg-emerald-900/20" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full dark:bg-emerald-900/20" />
              <img
                src="/quit-smoking-no-bg.png"
                alt="Hành trình cai thuốc lá"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-contain sm:w-full relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
