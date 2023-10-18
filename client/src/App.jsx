import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage, ProtectedRoutes, ErrorPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SharedLayout, AllEntries, AddEntry, Profile } from "./pages/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<AllEntries />} />
          <Route path="/add-entry" element={<AddEntry />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
      />
    </Router>
  );
};

export default App;
