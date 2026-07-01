"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { AuthUser, getCurrentUser, logout as authLogout, getUserFromCookies } from "./auth";
import { trackVisit } from "./tracking";

interface AuthContextType {
  user: AuthUser | null;
  courses: unknown[];
  hasCourses: boolean;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  setCourses: (courses: unknown[]) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  courses: [],
  hasCourses: false,
  loading: true,
  setUser: () => {},
  setCourses: () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [courses, setCourses] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  const hasCourses = courses.length > 0;

  const refresh = useCallback(async () => {
    setLoading(true);
    // First check cookies for instant hydration
    const cookieUser = getUserFromCookies();
    if (cookieUser) setUser(cookieUser);

    // Then verify with server
    const { user: serverUser, courses: serverCourses } = await getCurrentUser();
    if (serverUser) {
      setUser(serverUser);
      setCourses(serverCourses);
      // Fire visit tracking (once per session, non-blocking)
      trackVisit(serverUser, { hasCourses: serverCourses.length > 0 });
    } else {
      // Session invalid — clear
      setUser(null);
      setCourses([]);
      await authLogout();
    }
    setLoading(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await authLogout();
    setUser(null);
    setCourses([]);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, courses, hasCourses, loading, setUser, setCourses, logout: handleLogout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
