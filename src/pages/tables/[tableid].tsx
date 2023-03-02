// Next Imports
import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error"

// Firestore Imports
import { ReadTable } from "@/lib/firebase/table/TableOperations";

// Layouts
import TableSelectedLayout from "@/layouts/table/tableSelected/TableSelectedLayout";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect, useState } from "react";

export default function TablePage() {
  const router = useRouter()
  const { tableid } = router.query
  const [valid, setValid] = useState(false)
  const [table, setTable] = useState()

  useEffect(() => {
    if (tableid) {
      try {
        console.log("here")
        const unsub = ReadTable(tableid as string, setTable)
        setValid(true)
        return unsub
      }
      catch (err) {
        console.log(err)
      }
    }
  }, [tableid])

  // Check if page is loaded yet
  if (!table) {
    return <LoadingLayout fullscreen logo/>;
  }

  if (!valid) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex"/>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return <TableSelectedLayout table={ table }/>
}