
import CreateBook from "../components/CreateBook";
import { AdminRoute } from "../Routes/ProtectedRoutes";

const AdminPage = () => (
  <AdminRoute>
    <CreateBook />
  </AdminRoute>
);

export default AdminPage;