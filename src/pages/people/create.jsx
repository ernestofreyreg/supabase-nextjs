import { PersonSchema } from "@/services/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createPerson } from "@/services/createPerson";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/getPeople";
import { ImageInput } from "@/components/ImageInput";

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
      <form onSubmit={form.handleSubmit(handleSaveData)}>
        <label className="form-label">Name</label>
        <input
          type="text"
          {...form.register("name")}
          className="form-control"
        />
        {form.formState.errors.name && (
          <div className="text-danger">
            {form.formState.errors.name?.message}
          </div>
        )}

        <label className="form-label">DOB</label>
        <input
          type="date"
          {...form.register("dob", { valueAsDate: true })}
          className="form-control"
        />
        {form.formState.errors.dob && (
          <div className="text-danger">
            {form.formState.errors.dob?.message}
          </div>
        )}

        <label className="form-label">Email</label>
        <input
          type="text"
          {...form.register("email")}
          className="form-control"
        />
        {form.formState.errors.email && (
          <div className="text-danger">
            {form.formState.errors.email?.message}
          </div>
        )}

        <label className="form-label">Phone</label>
        <input
          type="text"
          {...form.register("phone")}
          className="form-control"
        />
        {form.formState.errors.phone && (
          <div className="text-danger">
            {form.formState.errors.phone?.message}
          </div>
        )}

        <label className="form-label">Address</label>
        <input
          type="text"
          {...form.register("address")}
          className="form-control"
        />
        {form.formState.errors.address && (
          <div className="text-danger">
            {form.formState.errors.address?.message}
          </div>
        )}

        <label className="form-label">Country</label>
        <select {...form.register("country_id")} className="form-control">
          <option value="">---</option>
          {countriesQuery.data?.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {form.formState.errors.country_id && (
          <div className="text-danger">
            {form.formState.errors.country_id?.message}
          </div>
        )}

        <label className="form-label">Picture</label>
        <div>
          <Controller
            control={form.control}
            name="picture"
            render={({ field }) => (
              <ImageInput
                bucket="pictures"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {form.formState.errors.picture && (
            <div className="text-danger">
              {form.formState.errors.picture?.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={peopleQuery.isPending}
        >
          {peopleQuery.isPending ? "Saving data..." : "Add Person"}
        </button>
      </form>
    </div>
  );
}
