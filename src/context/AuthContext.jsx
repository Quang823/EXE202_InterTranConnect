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

  const login = (userData, authToken, refreshToken) => {
    setUser(userData);
    setToken(authToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setRefreshToken("");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
