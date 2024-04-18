import { useRouter } from "next/router";

export default function PersonPage() {
  const router = useRouter();
  const id = router.query.id;

  return <div>THis is the person page for person ID: {id}</div>;
}
