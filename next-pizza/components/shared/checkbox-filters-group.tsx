'use client';

import React from 'react';
import {
  FilterChecboxProps,
  FilterCheckbox
} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";

type Item = FilterChecboxProps;

interface Props {
  className?: string;
  items?: Item[];
  // При не раскрытом списке
  defaultItems: Item[];
  searchInputPlaceholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string[];
  limit?: number;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                        title,
                                                        items,
                                                        defaultValue,
                                                        limit = 5,
                                                        searchInputPlaceholder = 'Поиск ...',
                                                        className,
                                                        onChange,
                                                        defaultItems
                                                      }) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={onChange}
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