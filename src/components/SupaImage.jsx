import { getImageUrl } from "@/services/images";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export function SupaImage({ bucket, fileName }) {
  const supabase = useSupabaseClient();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getImageUrl(supabase, bucket, fileName).then(setImageUrl);
  }, [supabase, bucket, fileName]);

  if (!imageUrl) {
    return null;
  }

  return <img src={imageUrl} width={100} />;
}
