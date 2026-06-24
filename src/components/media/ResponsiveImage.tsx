import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = ImageProps & {
  className?: string;
};

export function ResponsiveImage({
  alt,
  className,
  ...props
}: ResponsiveImageProps) {
  return <Image alt={alt} className={className} {...props} />;
}
