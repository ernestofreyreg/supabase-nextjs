// src/services/securePage.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

export function securePage(Page) {
  return () => {
    const { isLoading, session } = useSessionContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !session) {
        router.replace("/");
      }
    }, [isLoading, session, router]);

    if (isLoading) {
      return null;
    }

    if (!session) {
      return null;
    }

    return <Page />;
  };
}
