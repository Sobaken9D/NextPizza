'use client';

import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Category} from "@prisma/client";
import {useAppSelector} from "@/shared/store/hooks";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({items, className}) => {
  const {activeId} = useAppSelector((state) => state.category);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        items.map(({name, id}, index) => (
          <a
            href={`/#${name}`}
            key={index}
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
              activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )}
          >
            <button className="cursor-pointer">{name}</button>
          </a>
        ))
      }
    </div>
  );
};