'use client';

import React from 'react';
import {useIntersection} from 'react-use';
import {Title} from "@/components/shared/title";
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/product-card";
import {useCategoryStore} from "@/store/category";

interface Props {
  title: string;
  items: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
                                                     title,
                                                     categoryId,
                                                     listClassName,
                                                     className,
                                                     items
                                                   }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (
    <div
      className={className}
      id={title}
      ref={intersectionRef}
    >
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-5"
      />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};