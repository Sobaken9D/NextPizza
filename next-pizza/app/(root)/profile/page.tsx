import {redirect} from "next/navigation";
import {prisma} from "@/prisma/prisma-client";
import {headers} from "next/headers";
import {auth} from "@/shared/lib/auth/auth";
import {ProfileForm} from "@/shared/components";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/not-auth');
  }

  console.log(session);

  const user = await prisma.user.findFirst(
    {
      where: {
        id: session?.id
      }
    }
  );

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}