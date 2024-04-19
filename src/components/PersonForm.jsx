import { Controller } from "react-hook-form";
import { ImageInput } from "./ImageInput";

export function PersonForm({
  form,
  onSaveData,
  countries,
  isPending,
  submitLabel,
}) {
  return (
    <form onSubmit={form.handleSubmit(onSaveData)}>
      <label className="form-label">Name</label>
      <input type="text" {...form.register("name")} className="form-control" />
      {form.formState.errors.name && (
        <div className="text-danger">{form.formState.errors.name?.message}</div>
      )}

      <label className="form-label">DOB</label>
      <input
        type="date"
        {...form.register("dob", { valueAsDate: true })}
        className="form-control"
      />
      {form.formState.errors.dob && (
        <div className="text-danger">{form.formState.errors.dob?.message}</div>
      )}

      <label className="form-label">Email</label>
      <input type="text" {...form.register("email")} className="form-control" />
      {form.formState.errors.email && (
        <div className="text-danger">
          {form.formState.errors.email?.message}
        </div>
      )}

      <label className="form-label">Phone</label>
      <input type="text" {...form.register("phone")} className="form-control" />
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
        {countries?.map((country) => (
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

      <button type="submit" className="btn btn-success" disabled={isPending}>
        {isPending ? "Saving data..." : submitLabel}
      </button>
    </form>
  );
}
