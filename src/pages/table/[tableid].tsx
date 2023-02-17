// Next Imports
import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error"

// Firestore Imports
import { Timestamp } from "firebase/firestore";
import { ReadTable } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";

// Layouts
import TableSelectedLayout from "@/layouts/tableSelected/TableSelectedLayout";
import LoadingLayout from "@/layouts/LoadingLayout";


// Look for the table on page load
export async function getStaticProps (context: GetStaticPropsContext) {
  const table = await ReadTable(context.params?.tableid as string);

  if (!table) {
    return {
      notFound: true
    }
  }

  const tableJSON = JSON.stringify(table)

  return {
    props: {
      tableJSON
    }
  }
}

// Load static paths and fallback
export function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  }
}

export default function TablePage({ tableJSON }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { tableid } = router.query

  // Check if page is loaded yet
  if (router.isFallback) {
    return <LoadingLayout fullscreen />;
  }

  // Create Table 
  const table: Table = new Table(JSON.parse(tableJSON))

  if (!table) {
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