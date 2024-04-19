export async function createPerson(supabase, personData) {
  const { data, error } = await supabase
    .from("people")
    .insert([personData])
    .select();
  return data;
}

export async function updatePerson(supabase, id, personData) {
  const { data, error } = await supabase
    .from("people")
    .update(personData)
    .eq("id", id)
    .select();
  return data;
}
