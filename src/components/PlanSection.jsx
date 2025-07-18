import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import baseApi from "../api/baseApi";
import API_PATHS from "../api/apiPaths";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Calendar, FileText, StickyNote, Plus, ActivitySquare, Flag,
  BadgeCheck, ChevronDown, ChevronUp, Target, Timer, Layers, Info
} from "lucide-react";

// Status badge UI
const STATUS_UI = {
  "Bản nháp": {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border border-gray-200",
    icon: <Info className="w-4 h-4 text-gray-400 mr-1" />
  },
  "Đang thực hiện": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border border-yellow-300",
    icon: <ActivitySquare className="w-4 h-4 text-yellow-500 mr-1" />
  },
  "Đã hoàn thành": {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border border-emerald-300",
    icon: <BadgeCheck className="w-4 h-4 text-emerald-500 mr-1" />
  },
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN");
}

export default function PlanSection() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    reasons: "",
    notes: "",
    autoGeneratePhases: true,
  });
  const [expandPlanId, setExpandPlanId] = useState(null);

  const loadMyPlans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenA");
      const res = await baseApi.get(API_PATHS.QUITPLAN_MY_PLANS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(res.data?.result || []);
    } catch {
      toast.error("Không tải được danh sách kế hoạch!");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMyPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.reasons.trim()) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và lý do!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenA");
      await baseApi.post(API_PATHS.QUITPLAN, { ...form }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Tạo kế hoạch thành công!");
      setShowCreate(false);
      setForm({ title: "", reasons: "", notes: "", autoGeneratePhases: true });
      loadMyPlans();
    } catch {
      toast.error("Tạo kế hoạch thất bại!");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-8xl w-full mx-auto pt-3 pb-3 px-2 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Kế hoạch cai thuốc</h2>
          <p className="text-gray-500 text-base">Tạo mới hoặc theo dõi các kế hoạch phù hợp với bạn.</p>
        </div>
        {!showCreate && (
          <Button
            onClick={() => setShowCreate(true)}
            className="gap-2 rounded-xl font-semibold text-base bg-emerald-600 hover:bg-emerald-700 shadow-lg px-6 py-2"
          >
            <Plus className="w-6 h-6" /> Tạo kế hoạch mới
          </Button>
        )}
      </div>

      <div className="w-full space-y-8">
        {plans.length === 0 ? (
          <div className="text-gray-400 text-center italic py-14 bg-white rounded-2xl shadow-inner">
            Chưa có kế hoạch nào.
          </div>
        ) : (
          plans.map((plan) => {
            const statusUi = STATUS_UI[plan.statusText] || STATUS_UI["Bản nháp"];
            return (
              <div
                key={plan.id}
                className="relative bg-white border border-emerald-100 rounded-3xl shadow-2xl px-9 py-7 transition-all duration-200 hover:shadow-emerald-100 hover:border-emerald-400 group"
              >
                {/* Status badge */}
                <span className={`absolute top-6 right-8 flex items-center px-4 py-1.5 text-xs rounded-full font-bold shadow-sm ${statusUi.bg} ${statusUi.text} ${statusUi.border} z-10`}>
                  {statusUi.icon} {plan.statusText}
                </span>
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-7 h-7 text-emerald-500" />
                  <span className="text-2xl font-bold text-emerald-700">{plan.title}</span>
                </div>
                {/* INFO LINES */}
                <div className="flex flex-wrap items-center gap-6 text-base mb-2 mt-1">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-5 h-5" /> <span>Bắt đầu: <b>{formatDate(plan.startDate)}</b></span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Flag className="w-5 h-5" /> <span>Kết thúc: <b>{formatDate(plan.targetDate)}</b></span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <ActivitySquare className="w-5 h-5" /> <span>Tiến trình: <b className="text-emerald-600">{plan.overallProgress || 0}%</b></span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Timer className="w-5 h-5" /> <span>Còn lại: <b>{plan.daysRemaining} ngày</b></span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full mt-1 mb-3">
                  <div
                    className="h-2 bg-emerald-400 rounded-full transition-all"
                    style={{ width: `${plan.overallProgress || 0}%` }}
                  />
                </div>
                {/* Lý do, ghi chú */}
                <div className="flex items-center gap-2 text-gray-800 text-base mt-1">
                  <StickyNote className="w-4 h-4 opacity-70" />
                  <span className="font-semibold">Lý do:</span>
                  <span>{plan.reasons}</span>
                </div>
                {plan.notes && (
                  <div className="flex items-center gap-2 text-gray-800 text-base mt-1">
                    <StickyNote className="w-4 h-4 opacity-70" />
                    <span className="font-semibold">Ghi chú:</span>
                    <span>{plan.notes}</span>
                  </div>
                )}

                {/* Accordion giai đoạn */}
                <div className="mt-6">
                  <button
                    onClick={() => setExpandPlanId(expandPlanId === plan.id ? null : plan.id)}
                    className="text-emerald-700 font-semibold flex items-center gap-2 hover:underline border border-emerald-100 rounded-full px-5 py-2 bg-emerald-50/70 transition shadow-sm"
                  >
                    {expandPlanId === plan.id ? (
                      <>
                        <ChevronUp className="w-5 h-5" /> Ẩn các giai đoạn ({plan.totalPhases})
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" /> Xem các giai đoạn ({plan.totalPhases})
                      </>
                    )}
                  </button>
                  {/* Timeline phases */}
                  {expandPlanId === plan.id && (
                    <div className="mt-4 flex flex-col gap-6 pl-4 border-l-4 border-emerald-200">
                      {plan.phases?.map((phase, idx) => (
                        <div
                          key={phase.id}
                          className={`relative bg-emerald-50/60 border border-emerald-200 rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3
                            ${phase.isActive ? "border-l-8 border-emerald-500 bg-white" : ""}
                          `}
                          style={{ marginLeft: "-22px" }} // Đẩy card vào gần timeline
                        >
                          {/* Step dot */}
                          <span className={`absolute -left-[32px] top-7 w-4 h-4 rounded-full border-4 border-white
                            ${phase.isCompleted ? "bg-emerald-500" : phase.isActive ? "bg-yellow-400" : "bg-gray-300"}
                          `} />
                          <div>
                            <div className="font-semibold text-emerald-700 flex items-center">
                              <Layers className="w-5 h-5 mr-2" />
                              {phase.title}
                              {phase.isActive && (
                                <BadgeCheck className="w-4 h-4 ml-2 text-emerald-500" title="Đang diễn ra" />
                              )}
                              {phase.isUpcoming && (
                                <span className="ml-2 text-xs text-gray-400">(Sắp tới)</span>
                              )}
                            </div>
                            <div className="text-gray-700">{phase.description}</div>
                            <div className="flex flex-wrap gap-4 text-xs mt-2 text-gray-500">
                              <span>
                                <Calendar className="inline w-3 h-3 mb-0.5" /> {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                              </span>
                              <span>
                                <Target className="inline w-3 h-3 mb-0.5" /> Mục tiêu: {phase.targetCigarettesPerDay} điếu/ngày
                              </span>
                              <span>
                                <Timer className="inline w-3 h-3 mb-0.5" /> {phase.totalDays} ngày
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full
                              ${phase.isCompleted ? "bg-emerald-200 text-emerald-800" : phase.isActive ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}
                            `}>
                              {phase.isCompleted ? "Đã hoàn thành" : (phase.isActive ? "Đang diễn ra" : (phase.isUpcoming ? "Sắp tới" : "Chưa hoàn thành"))}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Form tạo kế hoạch mới */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handleCreatePlan}
            className="w-full max-w-md mx-auto bg-white border border-emerald-200 rounded-2xl p-8 shadow-xl space-y-4 animate-fade-in"
            style={{ animation: "fadeIn .25s" }}
          >
            <div className="text-xl font-bold text-emerald-700 mb-3">
              Tạo kế hoạch mới
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Tiêu đề kế hoạch <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề kế hoạch..."
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Lý do <span className="text-red-500">*</span>
              </label>
              <Input
                name="reasons"
                value={form.reasons}
                onChange={handleChange}
                placeholder="Nhập lý do cai thuốc..."
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Ghi chú</label>
              <Input
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Ghi chú thêm (nếu có)..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="autoGeneratePhases"
                checked={form.autoGeneratePhases}
                onChange={handleChange}
                id="autoGeneratePhases"
                className="h-4 w-4"
              />
              <label htmlFor="autoGeneratePhases" className="font-medium text-gray-700">
                Tự động tạo các giai đoạn cai thuốc
              </label>
            </div>
            <div className="flex gap-3 mt-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreate(false)}
                disabled={loading}
                className="rounded-lg"
              >
                Huỷ
              </Button>
              <Button
                type="submit"
                className="rounded-lg px-6 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={loading}
              >
                {loading ? "Đang tạo..." : "Xác nhận"}
              </Button>
            </div>
          </form>
        </div>
      )}
      <style>
        {`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        `}
      </style>
    </section>
  );
}
