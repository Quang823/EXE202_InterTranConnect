import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("accessToken") || "";
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return sessionStorage.getItem("refreshToken") || "";
  });
  const [priority, setPriority] = useState(() => {
    const stored = sessionStorage.getItem("priority");
    return stored !== null ? Number(stored) : null;
  });
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("accessToken", token);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      sessionStorage.setItem("refreshToken", refreshToken);
    } else {
      sessionStorage.removeItem("refreshToken");
    }
  }, [refreshToken]);

  useEffect(() => {
    if (priority !== null && priority !== undefined) {
      sessionStorage.setItem("priority", priority);
    } else {
      sessionStorage.removeItem("priority");
    }
  }, [priority]);

  const login = (userData, authToken, refreshToken, priority) => {
    setUser(userData);
    setToken(authToken);
    setRefreshToken(refreshToken);
    setPriority(priority);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setRefreshToken("");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("priority");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, refreshToken, priority, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
