import { SupaImage } from "@/components/SupaImage";
import { getPeople } from "@/services/getPeople";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PeoplePage() {
  const supabase = useSupabaseClient();

  const peopleQuery = useQuery({
    queryKey: ["people"],
    queryFn: () => getPeople(supabase),
    refetchInterval: 1000,
  });

  return (
    <div>
      <h1>People</h1>
      <a href="/people/create" className="btn btn-success">
        Add Person
      </a>

      {peopleQuery.isLoading && <div>Loading...</div>}
      <table className="table">
        <tbody>
          {peopleQuery.data?.map((person) => (
            <tr key={person.id}>
              <td>
                <SupaImage bucket="pictures" fileName={person.picture} />
              </td>
              <td>
                <Link href={`/people/${person.id}`}>{person.name}</Link>
              </td>
              <td>{person.dob}</td>
              <td>{person.address}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{person.countries?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {peopleQuery.isError && <div>Error fetching data</div>}
    </div>
  );
}
