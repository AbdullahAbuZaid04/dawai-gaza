export function formatTimeArabic(timeStr) {
  if (!timeStr) return "غير متوفر";
  const [h, m] = timeStr.split(":").map(Number);
  if (isNaN(h)) return timeStr;
  const hour = h % 12 || 12;
  const period = h < 12 ? "ص" : "م";
  const mins = m ? `:${String(m).padStart(2, "0")}` : "";
  return `${hour}${mins} ${period}`;
}

export function formatTimeRangeArabic(open, close) {
  return `${formatTimeArabic(open)} - ${formatTimeArabic(close)}`;
}
