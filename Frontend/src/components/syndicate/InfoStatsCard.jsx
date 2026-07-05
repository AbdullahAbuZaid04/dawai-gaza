import React from "react";
import { motion } from "framer-motion";

function InfoStatsCard({ icon, label, value, color = "#3b82f6", delay = 0, variant = "vertical" }) {
  const isVertical = variant === "vertical";

  return (
    <motion.div
      initial={{ opacity: 0, [isVertical ? "y" : "scale"]: isVertical ? 20 : 0.95 }}
      animate={{ opacity: 1, [isVertical ? "y" : "scale"]: isVertical ? 0 : 1 }}
      transition={{ delay }}
    >
      <div
        className={`p-6 rounded-2xl border transition-all duration-300 flex ${
          isVertical ? "flex-col bg-ui-bg border-ui-border" : "items-center gap-6 bg-ui-card"
        }`}
        style={{
          borderColor: isVertical ? undefined : "rgb(241 245 249)",
          border: isVertical ? undefined : `1px dashed ${color}`,
        }}
      >
        {/* Icon Wrapper */}
        <div
          className={`flex items-center justify-center shrink-0 ${
            isVertical
              ? "mb-4 w-10 h-10 rounded-xl bg-ui-card shadow-sm"
              : "w-14 h-14 md:w-16 md:h-16 rounded-2xl"
          }`}
          style={{
            backgroundColor: isVertical ? undefined : `${color}15`,
            color: color,
          }}
        >
          {React.cloneElement(icon, {
            className: isVertical ? "!text-[20px]" : "!text-[28px] md:!text-[32px]",
          })}
        </div>

        {/* Content */}
        <div className="min-w-0">
          <span
            className={`block uppercase tracking-[0.1em] mb-1 ${
              isVertical
                ? "text-[10px] font-black text-content-light"
                : "text-xs font-bold text-content-light"
            }`}
          >
            {label}
          </span>
          <div
            className={`font-black break-all ${
              isVertical ? "text-content-main text-sm" : "text-content-main text-base md:text-lg"
            }`}
          >
            {value}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default InfoStatsCard;
