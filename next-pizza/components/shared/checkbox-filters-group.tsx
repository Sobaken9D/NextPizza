'use client';

import React from 'react';
import {
  FilterChecboxProps,
  FilterCheckbox
} from "@/components/shared/filter-checkbox";
import {Input, Skeleton} from "@/components/ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  className?: string;
  items?: Item[];
  // При не раскрытом списке
  defaultItems: Item[];
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  limit?: number;
  loading?: boolean;
  selected?: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultValue,
  limit = 5,
  searchInputPlaceholder = 'Поиск ...',
  className,
  onClickCheckbox,
  defaultItems,
  loading,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {
          ...Array(limit).fill(0).map((_, index) => (
            <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
          ))
        }
        <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {
        showAll && (
          <div className="mb-5">
            <Input
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
              onChange={onChangeSearchInput}
            />
          </div>
        )
      }

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item,
          index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}

// события должны выполняться только в клинском компоненте => use client (рендер на сервере + браузере клиента)
// в серверном только рендер и возвращение html (сервернйы компонент рендерится на сервере и до клиента доходит уже чистый html)