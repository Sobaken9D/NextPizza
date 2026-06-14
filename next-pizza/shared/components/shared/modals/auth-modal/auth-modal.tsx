'use client';

import {Button, Dialog} from "@/shared/components";
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/shared/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import React from "react";
import {authClient} from "@/shared/lib/auth/auth-client";
import {LoginForm} from "@/shared/components/shared/modals/forms/login-form";
import {
  RegisterForm
} from "@/shared/components/shared/modals/forms/register-from";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({open, onClose}: Props) => {
  const [type, setType] = React.useState<'login' | 'register'>();

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      {/*выдает ошибку без DialogTitle*/}
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      </VisuallyHidden>

      <DialogContent className="w-[450px] bg-white p-10">
        {
          type === 'login' ? (
            <LoginForm onClose={handleClose}/>
          ) : (
            <RegisterForm onClose={handleClose}/>
          )
        }

        <hr />

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={async () => {
              await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/'
              })
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={async () => {
              await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/'
              })
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>

          <Button
            variant="outline"
            onClick={onSwitchType}
            type="button"
            className="h-12"
          >
            {type !== 'login' ? 'Войти' : 'Регистрация'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

