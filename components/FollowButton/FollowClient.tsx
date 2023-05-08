"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export function FollowClient({ targetUserId, isFollowing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isPending || isFetching;

  async function follow() {
    setIsFetching(true);

    const res = await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetUserId,
      }),
    });

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  }

  async function unfollow() {
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);

    console.log(res);

    startTransition(() => {
      router.refresh();
    });
  }

  if (isFollowing) {
    return (
      <button onClick={unfollow}>{!isMutating ? "Unfollow" : "..."}</button>
    );
  } else {
    return <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>;
  }
}
