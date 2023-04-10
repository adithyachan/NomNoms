import { useRouter } from "next/router";

export default function ResultsPage() {
  const router = useRouter();
  return(
    <>
      This will be the results page for table {router.query.tableid}.
    </>
  )
}