import FollowButton from "@/components/FollowButton/FollowButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

/* TODO: Find out why this does not work */
// export async function generateMetaData({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.id } });

//   return {
//     title: `Profile of ${user?.name}`,
//   };
// }

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  const { name, image } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img src={image ?? "/mememan.webp"} alt={`${name}'s profile`} />

      <h3>Bio</h3>
      <p>{user?.bio}</p>

      <h3>Age</h3>
      <p>{user?.age}</p>

      {/* @ts-expect-error Server Component */}
      <FollowButton targetUserId={params.id} />
    </div>
  );
}
