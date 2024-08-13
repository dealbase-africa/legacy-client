import { useEffect, useMemo, useState } from "react";

export function useAuthHeaders(): {
  Authorization: string;
} | null {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken("");
  }, []);

  return useMemo(() => {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }

    return null;
  }, [token]);
}
