import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  alt = 'User avatar',
  size = 64,
  className = '',
}: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-purple-100 text-purple-600 font-semibold text-lg">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
