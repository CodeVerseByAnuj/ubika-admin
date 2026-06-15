"use client";

import Image from "next/image";

const ApplicationLogo = () => {
  return (
    <div className="overflow-hidden">
      {/* Full Logo */}
      <div
        className="
          hidden group-data-[collapsible=]:flex
          items-center px-2
        "
      >
        <Image
          src="/images/ubika-logo.png"
          alt="Ubika logo"
          width={200}
          height={80}
          priority
          className="w-28 h-auto object-contain"
        />
      </div>

      {/* Icon Logo */}
      <div
        className="
          hidden group-data-[collapsible=icon]:flex
          items-center justify-center
        "
      >
        <Image
          src="/images/ubika-icon-logo.png"
          alt="Ubika icon logo"
          width={100}
          height={100}
          priority
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  );
};

export default ApplicationLogo;
