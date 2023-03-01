/* TODO: Table Main Page */
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";

export default function TablePage() {

  return (
    <ProtectedRoute>
    <>
      <TableSelectionLayout />
    </>
    </ProtectedRoute>
  );
}