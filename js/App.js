// App.js

import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // Corrected import path
import Profile from "./pages/Profile"; // Corrected import path
import GigPage from "./pages/GigPage"; // Corrected import path
import OrderPage from "./pages/OrderPage"; // Corrected import path

function App() {
  const { currentUser, signInWithGoogle } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gigs" element={<GigPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <button onClick={signInWithGoogle}>Sign In with Google</button> */}
    </BrowserRouter>
  );
}

export default App;
