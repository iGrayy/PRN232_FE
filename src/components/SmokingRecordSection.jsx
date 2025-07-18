import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import {
  User, CalendarDays, Cigarette, DollarSign, Clock, Edit2, History,
  Save, PlusCircle, Hash, Tag, Zap, BarChart2, Trash2
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getCurrentSmokingRecord,
  createSmokingRecord,
  updateSmokingRecord,
  getSmokingHistory,
  deleteSmokingRecord,
} from "../api/smokingRecordApi";

// Row UI nhỏ gọn, dùng chung
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-base">
      <Icon className="text-emerald-400" size={20} />
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-800 font-semibold">{value || <span className="text-gray-400">-</span>}</span>
    </div>
  );
}
function CostRow({ label, value }) {
  return (
    <div className="flex items-center gap-2 justify-between">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="font-bold text-emerald-600 text-lg">{value ? value.toLocaleString("vi-VN") + " đ" : "-"}</span>
    </div>
  );
}

export default function SmokingRecordSection({ refreshRecord }) {
  const [record, setRecord] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    smokingStartDate: "",
    cigarettesPerDay: "",
    cigarettesPerPack: "",
    costPerPack: "",
    frequency: "",
    brands: "",
    triggers: "",
    smokingYears: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load record khi mount/refreshRecord
  useEffect(() => {
    setLoading(true);
    getCurrentSmokingRecord()
      .then((data) => {
        if (data && data.smokingStartDate) {
          setRecord(data);
          setEditing(false);
          setForm({
            smokingStartDate: data.smokingStartDate?.substring(0, 10),
            cigarettesPerDay: data.cigarettesPerDay,
            cigarettesPerPack: data.cigarettesPerPack,
            costPerPack: data.costPerPack,
            frequency: data.frequency,
            brands: data.brands,
            triggers: data.triggers,
            smokingYears: data.smokingYears,
          });
          setNotFound(false);
        } else {
          setRecord(null);
          setNotFound(true);
        }
      })
      .catch(() => {
        setRecord(null);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [refreshRecord]);

  // Lịch sử record
const handleShowHistory = () => {
  if (!record?.customerId) return toast.error("Không lấy được user");
  setLoading(true);
  getSmokingHistory(record.customerId)
    .then((res) => {
      const historyList = Array.isArray(res?.data) ? res.data : [];
      if (historyList.length === 0) {
        toast("Chưa có lịch sử cập nhật!", { icon: "ℹ️" });
        setShowHistory(false);
      } else {
        setHistory(historyList);
        setShowHistory((prev) => !prev);
      }
    })
    .catch(() => toast.error("Không lấy được lịch sử"))
    .finally(() => setLoading(false));
};


  // Xoá bản ghi
  const handleDelete = async () => {
    if (!record?.id) return;
    if (!window.confirm("Bạn chắc chắn muốn xoá bản ghi này?")) return;
    setLoading(true);
    try {
      await deleteSmokingRecord(record.id);
      toast.success("Đã xoá thành công!");
      setRecord(null);
      setEditing(false);
      setNotFound(true);
    } catch {
      toast.error("Xoá thất bại!");
    }
    setLoading(false);
  };

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu/cập nhật bản ghi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      smokingStartDate: form.smokingStartDate,
      cigarettesPerDay: Number(form.cigarettesPerDay),
      cigarettesPerPack: Number(form.cigarettesPerPack),
      costPerPack: Number(form.costPerPack),
      frequency: Number(form.frequency),
      brands: form.brands,
      triggers: form.triggers,
      smokingYears: Number(form.smokingYears),
    };
    try {
      if (record && editing) {
        await updateSmokingRecord(record.id, dataToSend);
        toast.success("Cập nhật thành công!");
      } else {
        await createSmokingRecord(dataToSend);
        toast.success("Tạo bản ghi thành công!");
      }
      setEditing(false);
      setNotFound(false);
      setLoading(true);
      getCurrentSmokingRecord()
        .then((data) => setRecord(data))
        .finally(() => setLoading(false));
    } catch {
      toast.error("Lưu thất bại. Vui lòng thử lại!");
      setLoading(false);
    }
  };

  // ===== Loading UI =====
  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse w-full rounded-2xl bg-white p-8 shadow-md">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="h-4 bg-gray-100 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-100 rounded mb-2 w-1/4"></div>
        </div>
      </div>
    );
  }

  // ===== Không có record: Thông báo + Tạo mới =====
  if (notFound && !editing) {
    return (
      <div className="w-full">
        <Card className="rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-3">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center mb-2">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-xl font-bold mb-1">Thông tin hút thuốc</div>
            <div className="text-gray-400 font-semibold text-sm mb-3">Chưa có dữ liệu trong ngày</div>
            <Button
              onClick={() => setEditing(true)}
              variant="outline"
              className="gap-2"
              disabled={loading}
            >
              <PlusCircle size={18} /> Tạo bản ghi mới
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ===== VIEW MODE =====
  if (!editing && record) {
    return (
      <div className="w-full relative">
        {/* Action bar: luôn ở ngoài card, dàn ngang hoặc căn phải section */}
        <div className="flex justify-end mb-2 gap-2">
          <Button onClick={() => setEditing(true)} variant="outline" size="sm" className="gap-1" disabled={loading}>
            <Edit2 size={16} /> Sửa
          </Button>
          <Button onClick={handleShowHistory} variant="secondary" size="sm" className="gap-1" disabled={loading}>
            <History size={16} /> {showHistory ? "Ẩn lịch sử" : "Lịch sử"}
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm" className="gap-1" disabled={loading}>
            <Trash2 size={16} /> Xoá
          </Button>
        </div>
        <Card className="rounded-2xl shadow-xl px-8 py-8 w-full">
          <div className="flex items-center gap-3 mb-6">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div> */}
            <div>
              <div className="text-2xl font-bold text-gray-900">Thông tin hút thuốc</div>
              <div className="text-gray-400 font-semibold text-xs">Theo dõi quá trình của bạn</div>
            </div>
          </div>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 text-base">
            <div className="space-y-3">
              <InfoRow icon={CalendarDays} label="Ngày bắt đầu" value={record.smokingStartDate?.substring(0, 10)} />
              <InfoRow icon={Cigarette} label="Số điếu/ngày" value={record.cigarettesPerDay} />
              <InfoRow icon={Clock} label="Điếu/bao" value={record.cigarettesPerPack} />
              <InfoRow icon={DollarSign} label="Giá 1 bao" value={record.costPerPack?.toLocaleString("vi-VN") + " đ"} />
              <InfoRow icon={BarChart2} label="Tần suất/ngày" value={record.frequencyDisplay || record.frequency} />
              <InfoRow icon={Tag} label="Nhãn hiệu" value={record.brands} />
              <InfoRow icon={Zap} label="Tác nhân kích thích" value={record.triggers} />
              <InfoRow icon={Hash} label="Số năm hút" value={record.smokingYears} />
            </div>
            <div className="flex flex-col gap-4 bg-emerald-50 rounded-xl px-5 py-4 shadow-inner mt-2 border border-emerald-100">
              <div className="text-base font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                <DollarSign size={19} className="text-emerald-400" /> Chi phí hút thuốc
              </div>
              <CostRow label="Chi phí/ngày" value={record.dailyCost} />
              <CostRow label="Chi phí/tháng" value={record.monthlyCost} />
              <CostRow label="Chi phí/năm" value={record.yearlyCost} />
            </div>
          </CardContent>
          {/* Lịch sử */}
          {showHistory && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4 border transition-all duration-300">
              <div className="font-semibold mb-2 text-emerald-700 flex items-center gap-1">
                <History size={18} /> Lịch sử cập nhật
              </div>
              <div className="overflow-x-auto rounded border">
                <table className="min-w-full text-xs text-gray-800">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="py-2 px-3">Ngày bắt đầu</th>
                      <th className="py-2 px-3">Điếu/ngày</th>
                      <th className="py-2 px-3">Ngày cập nhật</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-2 px-3 text-center text-gray-500">Chưa có lịch sử</td>
                      </tr>
                    ) : (
                      history.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-1 px-3">{item.smokingStartDate?.substring(0, 10)}</td>
                          <td className="py-1 px-3">{item.cigarettesPerDay}</td>
                          <td className="py-1 px-3">{new Date(item.updatedAt).toLocaleString("vi-VN")}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // ===== EDIT/CREATE MODE =====
  return (
    <div className="w-full">
      <Card className="rounded-2xl shadow-xl px-8 py-8 w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{record ? "Chỉnh sửa thông tin" : "Nhập thông tin hút thuốc"}</div>
              <div className="text-gray-400 font-semibold text-xs">Vui lòng nhập đủ thông tin</div>
            </div>
          </div>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <CalendarDays className="inline-block mr-1" size={16} />
                  Ngày bắt đầu hút thuốc
                </label>
                <Input
                  type="date"
                  name="smokingStartDate"
                  value={form.smokingStartDate}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <Cigarette className="inline-block mr-1" size={16} />
                  Số điếu/ngày
                </label>
                <Input
                  type="number"
                  name="cigarettesPerDay"
                  value={form.cigarettesPerDay}
                  onChange={handleChange}
                  min={1}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <Clock className="inline-block mr-1" size={16} />
                  Số điếu/bao
                </label>
                <Input
                  type="number"
                  name="cigarettesPerPack"
                  value={form.cigarettesPerPack}
                  onChange={handleChange}
                  min={1}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <DollarSign className="inline-block mr-1" size={16} />
                  Giá 1 bao (VNĐ)
                </label>
                <Input
                  type="number"
                  name="costPerPack"
                  value={form.costPerPack}
                  onChange={handleChange}
                  min={0}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <BarChart2 className="inline-block mr-1" size={16} />
                  Tần suất hút (lần/ngày)
                </label>
                <Input
                  type="number"
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                  min={1}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <Tag className="inline-block mr-1" size={16} />
                  Nhãn hiệu thuốc lá
                </label>
                <Input
                  type="text"
                  name="brands"
                  value={form.brands}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <Zap className="inline-block mr-1" size={16} />
                  Các tác nhân kích thích (trigger)
                </label>
                <Input
                  type="text"
                  name="triggers"
                  value={form.triggers}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  <Hash className="inline-block mr-1" size={16} />
                  Số năm hút thuốc
                </label>
                <Input
                  type="number"
                  name="smokingYears"
                  value={form.smokingYears}
                  onChange={handleChange}
                  min={0}
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
          <div className="flex gap-2 mt-6 justify-end">
            <Button type="submit" loading={loading} className="gap-1" disabled={loading}>
              <Save size={16} /> {loading ? "Đang lưu..." : (record ? "Cập nhật" : "Lưu thông tin")}
            </Button>
            {record && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
                disabled={loading}
                className="gap-1"
              >
                Huỷ
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
