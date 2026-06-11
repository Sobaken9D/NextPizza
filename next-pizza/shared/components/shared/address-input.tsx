'use client';

import React, {useId} from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId();

  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_DADATA_TOKEN || ''}
      uid={id}
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};