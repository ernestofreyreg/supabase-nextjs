export async function getCompanies(supabase) {
  const { data: companies } = await supabase.from("companies").select("*");
  return companies;
}
