import Image from "next/image";

import type { BrandImageAsset } from "@/config/brand-registry";

type BrandLogoProps = {
  asset: BrandImageAsset;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ asset, className, priority = false }: BrandLogoProps) {
  return (
    <Image
      alt={asset.alt}
      className={className}
      height={asset.height}
      priority={priority}
      src={asset.normalized}
      width={asset.width}
    />
  );
}
