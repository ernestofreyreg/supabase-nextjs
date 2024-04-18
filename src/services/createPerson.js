export async function createPerson(supabase, personData) {
  const { data, error } = await supabase
    .from("people")
    .insert([personData])
    .select();
  return data;
}
