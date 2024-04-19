import { PersonSchema } from "@/services/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPerson } from "@/services/createPerson";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/getPeople";
import { ImageInput } from "@/components/ImageInput";
import { PersonForm } from "@/components/PersonForm";

export default function CreatePersonPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(supabase),
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

  const peopleQuery = useMutation({
    mutationFn: (data) => createPerson(supabase, data),
  });

  const handleSaveData = async (data) => {
    peopleQuery.mutate(data, {
      onSuccess: (record) => {
        console.log(record);
        router.push("/people");
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  return (
    <div className="container">
      <h2>Create person</h2>
      <PersonForm
        form={form}
        onSaveData={handleSaveData}
        countries={countriesQuery.data}
        isPending={peopleQuery.isPending}
        submitLabel="Add Person"
      />
    </div>
  );
}
