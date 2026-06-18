import Image from "next/image";

const ApplicationLogo = () => {
  return (
    <Image
      src="/images/ubika-logo.png"
      alt="Ubika logo"
      width={200}
      height={80}
      priority
      className="h-auto w-28 object-contain"
    />
  );
};

export default ApplicationLogo;
