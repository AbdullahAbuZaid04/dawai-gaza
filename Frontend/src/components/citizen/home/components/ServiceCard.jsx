function ServiceCard({ icon, title, description, color, tinted, step = null }) {
  const getAtt = () => {
    const att = {
      primary: {
        iconColor: "bg-primary/20 text-primary",
        badgeColor: "bg-primary",
        borderColor: "border-primary/20",
        hoverBorderColor: "hover:border-primary",
      },
      secondary: {
        iconColor: "bg-secondary/20 text-secondary",
        badgeColor: "bg-secondary",
        borderColor: "border-secondary/20",
        hoverBorderColor: "hover:border-secondary",
      },
      success: {
        iconColor: "bg-status-success/20 text-status-success",
        badgeColor: "bg-status-success",
        borderColor: "border-status-success/20",
        hoverBorderColor: "hover:border-status-success",
      },
    };
    return att[color] || att.primary;
  };

  return (
    <div
      className={`group w-full max-w-[320px] h-full bg-${tinted ? "ui-gray" : "ui-card"} rounded-2xl border-2 border-border p-8  ${getAtt().hoverBorderColor} hover:-translate-y-2 transition-all duration-300 mx-auto`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* الأيقونة */}
        <div className="relative transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center ${getAtt().iconColor} `}
          >
            <div className="[&>svg]:!text-[40px]">{icon}</div>
          </div>

          {/* رقم الخطوة */}
          {step && (
            <div
              className={`absolute -top-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm border-4 border-white ${getAtt().badgeColor}`}
            >
              {step}
            </div>
          )}
        </div>

        {/* العنوان */}
        <h3 className="text-lg font-bold text-content-main">{title}</h3>

        {/* الوصف */}
        <p className="text-sm text-content-light leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
