// Next Imports
import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error"

// Firestore Imports
import { ReadTable } from "@/lib/firebase/table/TableOperations";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { onAuthStateChanged } from "firebase/auth";

// Layouts
import TableSelectedLayout from "@/layouts/table/tableSelected/TableSelectedLayout";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/AuthProvider";

export default function TablePage() {
  const router = useRouter()
  const { tableid } = router.query
  const user = useUser()
  const [valid, setValid] = useState(false)
  const [table, setTable] = useState()
  const [tables, setTables] = useState()

  useEffect(() => {
    if (!user) {
      router.push("/auth/register")
    }
    
    const unsub = ReadTable

    if (tableid) {
      try {
        const unsub = ReadTable(tableid as string, setTable)
        setValid(true)
        return unsub
      }
      catch (err) {
        setValid(false)
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