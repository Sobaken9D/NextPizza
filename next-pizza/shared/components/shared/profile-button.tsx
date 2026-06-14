import {Button} from "@/shared/components";
import {CircleUser, User} from "lucide-react";
import React from "react";
import Link from "next/link";
import {authClient} from "@/shared/lib/auth/auth-client";

interface Props {
  className?: string;
  onClickSignIn?: () => void;
}

export const ProfileButton = ({className, onClickSignIn}: Props) => {
  const {data: session} = authClient.useSession();
  // console.log(session);

  return (
    <div className={className}>
      {
        !session ? (
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={onClickSignIn}
          >
            <User size={16} />
            Войти
          </Button>
        ) : (
          <Link href="/profile">
            <Button
              variant="secondary"
              className="flex items-center gap-2"
            >
              <CircleUser size={18} />
              Профиль
            </Button>
          </Link>
        )
      }
    </div>
  );
}