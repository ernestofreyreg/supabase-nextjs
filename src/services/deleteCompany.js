export async function deleteCompany(supabase, id) {
  await supabase.from("companies").delete().eq("id", id);
}
