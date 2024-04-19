export async function getPeople(supabase) {
  let { data: people, error } = await supabase
    .from("people")
    .select("*, countries(*)");
  return people;
}

export async function getCountries(supabase) {
  let { data: countries, error } = await supabase.from("countries").select("*");
  return countries;
}

export async function getPerson(supabase, id) {
  let { data: person, error } = await supabase
    .from("people")
    .select("*, countries(*)")
    .eq("id", id)
    .single();
  return person;
}
