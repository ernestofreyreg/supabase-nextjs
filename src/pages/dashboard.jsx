import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div>
      Dashboard{" "}
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
