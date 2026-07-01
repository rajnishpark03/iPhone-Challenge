import axios, { AxiosInstance } from "axios";

const MAIN_APP_BASE_URL = process.env.NEXT_PUBLIC_MAIN_APP_BASE_URL || "";

const TOKEN_KEY = "ipc_admin_token";
const ADMIN_KEY = "ipc_admin_info";

export interface AdminInfo {
  email: string;
  name: string;
  role?: string;
  dataRole?: string;
}

// ── Storage ──
export const getAdminToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAdminToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAdminInfo = (): AdminInfo | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminInfo;
  } catch {
    return null;
  }
};

export const setAdminInfo = (info: AdminInfo) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(info));
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

// ── Axios instance with auth header ──
export const adminApi: AxiosInstance = axios.create({
  baseURL: MAIN_APP_BASE_URL,
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      clearAdminSession();
    }
    return Promise.reject(err);
  }
);

// ── API calls ──
export const adminLogin = async (
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string; admin?: AdminInfo }> => {
  try {
    const res = await axios.post(`${MAIN_APP_BASE_URL}/lms/admin/login`, {
      email,
      password,
    });
    const data = res.data;
    if (data?.success !== "true" || !data?.token) {
      return { ok: false, error: data?.message || "Login failed" };
    }
    const admin: AdminInfo = {
      email: data.email,
      name: data.name,
      role: data.role,
      dataRole: data.dataRole,
    };
    setAdminToken(data.token);
    setAdminInfo(admin);
    return { ok: true, admin };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { ok: false, error: err.response?.data?.message || err.message };
    }
    return { ok: false, error: "Login failed" };
  }
};

export const verifyAdmin = async (): Promise<AdminInfo | null> => {
  const token = getAdminToken();
  if (!token) return null;
  try {
    const res = await axios.get(`${MAIN_APP_BASE_URL}/lms/admin/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success !== "true") {
      clearAdminSession();
      return null;
    }
    const admin: AdminInfo = {
      email: data.email,
      name: data.name,
      role: data.role,
      dataRole: data.dataRole,
    };
    setAdminInfo(admin);
    return admin;
  } catch {
    clearAdminSession();
    return null;
  }
};
