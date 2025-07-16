// src/components/ui/toast.jsx
import { Toaster, toast } from "react-hot-toast";
import { CheckCircle, XCircle, Loader2, X } from "lucide-react";
import clsx from "clsx";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          padding: 0,
          border: "none",
          background: "transparent",
        },
      }}
    >
      {(t) => {
        const type = t.type;
        const isVisible = t.visible;

        const baseStyle =
          "relative flex items-center gap-3 shadow-lg rounded-lg p-4 w-[320px] transition-transform transform bg-white dark:bg-gray-900 border overflow-hidden";
        const slideIn = isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0";

        const iconMap = {
          success: <CheckCircle className="text-green-500 h-5 w-5 min-w-[20px]" />,
          error: <XCircle className="text-red-500 h-5 w-5 min-w-[20px]" />,
          loading: <Loader2 className="animate-spin text-blue-500 h-5 w-5 min-w-[20px]" />,
        };

        const borderColor = {
          success: "border-green-300",
          error: "border-red-300",
          loading: "border-blue-300",
        };

        return (
          <div className={clsx(baseStyle, slideIn, borderColor[type])} role="alert">
            {/* Close button ở góc phải trên */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            {iconMap[type]}

            {/* Message */}
            <div className="flex-1 text-sm text-gray-800 dark:text-white pr-6">
              {t.message}
            </div>

            {/* Timeline ở dưới */}
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-emerald-500 animate-toast-progress" />
          </div>
        );
      }}
    </Toaster>
  );
}
