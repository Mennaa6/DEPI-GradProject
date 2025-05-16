import { Route, Routes } from "react-router-dom";
import { ProductContext } from "./context/ProductContext";
import { ToastContainer } from "react-toastify";
import AdminView from "./adminView";
import UserView from "./userView";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
const App = () => {
  const { signedUser } = useContext(ProductContext);
  const role = signedUser?.role;

  return (
    <div>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/*" element={<UserView />} />
        <Route
          path="/admin/*"
          element={role == "Admin" ? <AdminView /> : <NotFound />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
