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

  // Check if page is loaded yet
  if (router.isFallback) {
    return <LoadingLayout fullscreen logo/>;
  }

  // Create Table 
  const table = JSON.parse(tableJSON)

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
  
  //TODO: Check if current authenticated user is in the users list for this table and if they are not, add them and show a confirmation

  return <TableSelectedLayout table={ table }/>
}