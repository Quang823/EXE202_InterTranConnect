// App.jsx
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
