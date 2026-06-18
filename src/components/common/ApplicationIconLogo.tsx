import Image from "next/image";

const ApplicationIconLogo = () => {
  return (
    <Image
      src="/images/ubika-icon-logo.png"
      alt="Ubika icon logo"
      width={32}
      height={32}
      priority
      className="h-8 w-8 object-contain"
    />
  );
};

export default ApplicationIconLogo;
