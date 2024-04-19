import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "@/services/getPeople";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupaImage } from "@/components/SupaImage";
import Link from "next/link";

export default function PersonPage() {
  const router = useRouter();
  const id = router.query.id;
  const supabase = useSupabaseClient();

  const personQuery = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(supabase, id),
  });

  return (
    <div>
      <h2>{personQuery.data?.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>Picture</td>
            <td>
              {personQuery.data?.picture && (
                <SupaImage
                  bucket="pictures"
                  fileName={personQuery.data.picture}
                />
              )}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{personQuery.data?.email}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{personQuery.data?.address}</td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>{personQuery.data?.phone}</td>
          </tr>

          <tr>
            <td>DOB</td>
            <td>{personQuery.data?.dob}</td>
          </tr>

          <tr>
            <td>Country</td>
            <td>{personQuery.data?.countries?.name}</td>
          </tr>
        </tbody>
      </table>
      <Link href={`/people/${id}/edit`} className="btn btn-info">
        Edit
      </Link>

      <Link href="/people">All People</Link>
    </div>
  );
}
