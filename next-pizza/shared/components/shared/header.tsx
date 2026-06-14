'use client';

import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Container} from "@/shared/components/shared/container";
import Image from "next/image";
import Link from "next/link";
import {SearchInput} from "@/shared/components/shared/search-input";
import {CartButton} from "@/shared/components/shared/cart-button";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {AuthModal, ProfileButton} from "@/shared/components";


interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true
}) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>

        {/*{Левая часть}*/}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={35}
              height={35}
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (<div className="mx-10 flex-1"><SearchInput /></div>)}

        {/*Правая часть*/}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && (<div><CartButton /></div>)}
        </div>

      </Container>
    </header>
  );
};