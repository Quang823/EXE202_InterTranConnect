import React from "react";
import ClientLayout from "./routes/ClientRoute/ClientLayout";
import ClientRoute from "./routes/ClientRoute/ClientRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <ClientLayout>
              <ClientRoute />
            </ClientLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
