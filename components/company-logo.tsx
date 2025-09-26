import Image from "next/image";
import { useState } from "react";

export const CompanyLogo = ({ src, alt, fallback }: { src: string; alt: string; fallback: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={32}
      height={32}
      className="w-8 h-8 object-contain"
      onError={() => setImgSrc(fallback)}
    />
  );
};
