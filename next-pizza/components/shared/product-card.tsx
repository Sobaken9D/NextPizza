import React from 'react';
import Link from "next/link";

interface Props {
  className?: string;
}

export const ProductCard: React.FC<Props> = ({className}) => {
  return (
    <div className={className}>
      <Link href="/product/1">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img
            className="w-[215px] h-[215px]"
            src={imageUrl}
            alt="Logo"
          />
        </div>
      </Link>
    </div>
  );
};