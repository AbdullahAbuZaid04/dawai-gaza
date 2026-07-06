import { AlertTriangle, CheckCircle, X } from "lucide-react";

const variants = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-status-error/10",
    iconColor: "text-status-error",
    border: "border-status-error/20",
    confirmBg: "bg-status-error hover:bg-status-error/80",
  },
  success: {
    icon: CheckCircle,
    iconBg: "bg-status-success/10",
    iconColor: "text-status-success",
    border: "border-status-success/20",
    confirmBg: "bg-status-success hover:bg-status-success/80",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-status-warning/10",
    iconColor: "text-status-warning",
    border: "border-status-warning/20",
    confirmBg: "bg-status-warning hover:bg-status-warning/80",
  },
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const v = variants[variant] || variants.danger;
  const Icon = v.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "تأكيد الإجراء"}
    >
      <div
        className="bg-ui-card w-full max-w-sm rounded-3xl p-6 sm:p-8 border border-ui-border shadow-2xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 p-1 rounded-full hover:bg-ui-gray transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5 text-content-light" />
        </button>
        <div
          className={`w-16 h-16 ${v.iconBg} ${v.iconColor} rounded-full flex items-center justify-center mx-auto mb-4 border ${v.border}`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-content-main mb-2">{title}</h3>
        <p className="text-content-light mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className={`flex-1 ${v.confirmBg} text-content-white py-3 rounded-xl font-bold transition active:scale-95 shadow-lg`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-ui-border text-content-main py-3 rounded-xl font-bold hover:bg-ui-gray transition"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
