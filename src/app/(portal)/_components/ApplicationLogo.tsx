"use client";

const ApplicationLogo = () => {
  return (
    <div className="overflow-hidden">
      <h1
        suppressHydrationWarning
        className="
          font-semibold text-2xl
          whitespace-nowrap
          transition-all duration-200
          group-data-[collapsible=icon]:opacity-0
          group-data-[collapsible=icon]:scale-95
          group-data-[collapsible=icon]:w-0
        "
      >
        Ubika
      </h1>
    </div>
  );
};

export default ApplicationLogo;
