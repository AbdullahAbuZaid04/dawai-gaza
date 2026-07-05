import { Trash2 } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-ui-card w-full max-w-sm rounded-3xl p-6 sm:p-8 border border-ui-border shadow-2xl relative text-center">
        <div className="w-16 h-16 bg-status-error/10 text-status-error rounded-full flex items-center justify-center mx-auto mb-4 border border-status-error/20">
          <Trash2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-content-main mb-2">{title || "تأكيد حذف"}</h3>
        <p className="text-content-light mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-status-error text-content-white py-3 rounded-xl font-bold hover:bg-status-error/80 transition active:scale-95 shadow-lg shadow-status-error/20"
          >
            نعم، احذف
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-ui-border text-content-main py-3 rounded-xl font-bold hover:bg-ui-gray transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
