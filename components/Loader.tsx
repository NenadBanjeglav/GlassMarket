import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-white p-10">
      <div className="relative flex items-center justify-center">
        <Image
          src="/logo.jpg"
          alt="Logo Loader Image"
          width={200}
          height={100}
          className=" animate-bounce object-cover"
        />
      </div>
    </div>
  );
};

export default Loader;
