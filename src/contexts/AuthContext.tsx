
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";

// Mock users for frontend testing
const MOCK_USERS = [
  { id: 1, username: "muser", password: "muser", role: "user" },
  { id: 2, username: "mvc", password: "mvc", role: "admin" }
];

type User = {
  id: number;
  username: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("tutor_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tutor_user");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // First check mock users (for frontend testing)
    const mockUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (mockUser) {
      const userData = {
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("tutor_user", JSON.stringify(userData));
      toast.success("Logged in successfully");
      return true;
    }

    // If not a mock user, check with backend
    try {
      // This would be replaced with actual API call
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("tutor_user", JSON.stringify(data.user));
        toast.success("Logged in successfully");
        return true;
      } else {
        toast.error("Invalid username or password");
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("tutor_user");
    toast.info("Logged out successfully");
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    // This would be replaced with actual API call
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast.success("Registered successfully. Please log in.");
        return true;
      } else {
        toast.error("Registration failed. Please try a different username.");
        return false;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
