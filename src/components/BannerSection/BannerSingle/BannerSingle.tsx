"use client";
import Image from "next/image";

import { MovieType } from "@/types/MovieType";

interface BannerSingleProps {
  movie: MovieType;
  isActive?: boolean;
}

const BannerSingle: React.FC<BannerSingleProps> = ({ movie, isActive = true }) => {
  if (!isActive) return null;
  const src = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.jpg";
  const alt = movie.title || "Banner";

  return (
    <div className="carousel-item w-full aspect-[16/9] relative flex items-center justify-center bg-black">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
};

export default BannerSingle