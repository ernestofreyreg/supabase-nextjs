export async function getImageUrl(supabase, bucketName, filePath) {
  const { data, urlError } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (urlError) {
    throw urlError;
  }

  return data.publicUrl;
}

export async function uploadImage(supabase, bucketName, file) {
  if (!file) {
    return;
  }
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = fileName;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    throw error;
  }
  return filePath;
}
