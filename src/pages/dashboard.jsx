// src/pages/dashboard.jsx
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { securePage } from "@/services/securePage";
import { useEffect, useState } from "react";
import { getCompanies } from "@/services/getCompanies";
import { deleteCompany } from "@/services/deleteCompany";
import { ImageInput } from "@/components/ImageInput";

export default securePage(function Dashboard() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [imageUrl, setImageUrl] = useState("0.1466368422093962.jpg");

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    getCompanies(supabase).then(setCompanies);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handlerDelete = (id) => async () => {
    await deleteCompany(supabase, id);
  };

  return (
    <div>
      Dashboard for <strong>{user?.email || "Not authenticated"}</strong>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
      <ul>
        {companies.map((company, index) => (
          <li key={company.id}>
            {company.name}{" "}
            <button type="button" onClick={handlerDelete(company.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>
        <b>{imageUrl}</b>
      </p>
      <ImageInput bucket="pictures" value={imageUrl} onChange={setImageUrl} />
    </div>
  );
});
