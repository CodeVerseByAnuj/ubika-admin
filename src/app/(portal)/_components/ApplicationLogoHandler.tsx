"use client";
import ApplicationIconLogo from "@/components/common/ApplicationIconLogo";
import ApplicationLogo from "@/components/common/ApplicationLogo";

const ApplicationLogoHandler = () => {
  return (
    <>
      {/* Expanded Sidebar */}
      <div className="group-data-[collapsible=icon]:hidden px-2">
        <ApplicationLogo />
      </div>

      {/* Collapsed Sidebar */}
      <div className="hidden items-center justify-center group-data-[collapsible=icon]:flex">
        <ApplicationIconLogo />
      </div>
    </>
  );
};

export default ApplicationLogoHandler;
