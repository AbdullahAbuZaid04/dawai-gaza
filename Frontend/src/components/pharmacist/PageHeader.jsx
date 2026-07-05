const PageHeader = ({ title, description, actionButton, backButton }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-4">
        {backButton && backButton}
        <div>
          <h1 className="text-3xl font-extrabold text-content-main tracking-tight">{title}</h1>
          {description && <p className="text-content-light font-medium mt-1">{description}</p>}
        </div>
      </div>
      {actionButton && actionButton}
    </div>
  );
};

export default PageHeader;
