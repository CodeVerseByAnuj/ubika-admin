"use client";

import Image from "next/image";

const ApplicationLogo = () => {
  return (
    <>
      {/* Expanded Sidebar */}
      <div className="group-data-[collapsible=icon]:hidden px-2">
        <Image
          src="/images/ubika-logo.png"
          alt="Ubika logo"
          width={200}
          height={80}
          priority
          className="h-auto w-28 object-contain"
        />
      </div>

      {/* Collapsed Sidebar */}
      <div className="hidden items-center justify-center group-data-[collapsible=icon]:flex">
        <Image
          src="/images/ubika-icon-logo.png"
          alt="Ubika icon logo"
          width={32}
          height={32}
          priority
          className="h-8 w-8 object-contain"
        />
      </div>
    </>
  );
};

export default ApplicationLogo;
