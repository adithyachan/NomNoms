/* TODO: Create Table Main Page */
import { ReadTables, WriteTable, DeleteTable } from "@/lib/firebase/table/TableOperations";
import { Timestamp } from "firebase/firestore";

import { ITable } from "../../types/Table";
import { useState } from "react";
import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";

export default function TablePage() {

  return (
    <>
      <TableSelectionLayout />
    </>
  );
}