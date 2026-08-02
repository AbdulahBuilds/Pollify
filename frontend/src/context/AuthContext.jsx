import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api.js";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
export const useAuth = useAuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    created: 0,
    voted: 0,
    bookmarked: 0,
  });

  const [loading, setLoading] = useState(true);

  // to load users profile
  const loadMe = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      setStats(data.stats);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) loadMe();
    else setLoading(false);
  }, []);

  // to save the token inside the localstorage
  const saveToken = async (token) => {
    localStorage.setItem("token", token);
    await loadMe();
  };

  // to register the user
  const register = async (formData) => {
    return (await api.post("/auth/register", formData)).data;
  };

  // to verify otp
  const verifyOtp = (payload) =>
    api.post("/auth/verify-otp", payload);

  // to resend otp
  const resendOtp = (email) =>
    api.post("/auth/resend-otp", { email });

  // to login
  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    await saveToken(data.token);
  };

  // for forgot, verification and reset password
  const forgotPassword = (email) =>
    api.post("/auth/forgot-password", { email });

  const verifyResetOtp = (payload) =>
    api.post("/auth/verify-reset-otp", payload);

  const resetPassword = (payload) =>
    api.post("/auth/reset-password", payload);

  // for setting the page to update profile and change password
  const updateProfile = async (formData) => {
    const { data } = await api.patch("/auth/profile", formData);
    setUser(data.user);
  };

  const changePassword = (payload) =>
    api.patch("/auth/password", payload);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // to delete the user account
  const deleteAccount = async () => {
    await api.delete("/auth/account");
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        stats,
        loading,
        loadMe,
        saveToken,
        register,
        verifyOtp,
        resendOtp,
        login,
        forgotPassword,
        verifyResetOtp,
        resetPassword,
        updateProfile,
        changePassword,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}