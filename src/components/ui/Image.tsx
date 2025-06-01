import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src'> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  // Handle both local and remote images
  const imageSrc = src.startsWith('http') ? src : src;

  return (
    <div className={`relative ${className}`}>
      <NextImage
        src={imageSrc}
        alt={alt}
        className="object-cover"
        priority={priority}
        {...props}
      />
    </div>
  );
};

export default Image; 