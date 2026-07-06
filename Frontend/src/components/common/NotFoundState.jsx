import MainButton from "./MainButton";

function NotFoundState({ title, actionLabel = "العودة للرئيسية", onAction, to }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-ui-card rounded-2xl border border-dashed border-ui-border">
      <h2 className="text-3xl md:text-5xl font-black text-content-main mb-8 tracking-tight">
        {title}
      </h2>
      <MainButton variant="contained" to={to || "/"} className="mt-4" onClick={to ? undefined : onAction}>
        {actionLabel}
      </MainButton>
    </div>
  );
}

export default NotFoundState;
