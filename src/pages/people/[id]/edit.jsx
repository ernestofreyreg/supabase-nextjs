import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PersonSchema } from "@/services/schema";
import { updatePerson } from "@/services/createPerson";
import { PersonForm } from "@/components/PersonForm";
import { getCountries, getPerson } from "@/services/getPeople";
import { useEffect } from "react";

export default function EditPerson() {
  const router = useRouter();
  const id = router.query.id;
  const supabase = useSupabaseClient();

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(supabase),
  });

  const personQuery = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(supabase, id),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      dob: new Date(),
      email: "",
      address: "",
      phone: "",
    },
    resolver: zodResolver(PersonSchema),
  });

  useEffect(() => {
    if (personQuery.data) {
      form.reset(personQuery.data);
    }
  }, [personQuery.data, form]);

  const peopleQuery = useMutation({
    mutationFn: (data) => updatePerson(supabase, id, data),
  });

  const handleSaveData = async (data) => {
    peopleQuery.mutate(data, {
      onSuccess: (record) => {
        console.log(record);
        router.push(`/people/${id}`);
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  return (
    <div className="container">
      <h2>Edit person</h2>
      {personQuery.data && (
        <PersonForm
          form={form}
          onSaveData={handleSaveData}
          countries={countriesQuery.data}
          isPending={peopleQuery.isPending}
          submitLabel="Update person"
        />
      )}
    </div>
  );
}
