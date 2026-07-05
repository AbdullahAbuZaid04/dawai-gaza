import { Link } from "react-router-dom";

export default function MainButton({ to, variant, size, children, className, ...props }) {
  const Tag = to ? Link : "button";

  const variantStyles =
    variant === "outlined"
      ? "border-2 border-primary text-primary hover:bg-primary hover:text-content-white"
      : "bg-primary text-content-white hover:bg-primary-700";

  const sizeStyles =
    size === "large"
      ? "px-6 py-3 text-sm md:px-10 md:py-4 md:text-lg"
      : "px-2 py-1.5 text-[10px] md:px-3 md:py-2 md:text-xs";

  return (
    <Tag
      {...(to ? { to } : { type: "button" })}
      className={`inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 ${variantStyles} ${sizeStyles} ${className || ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
