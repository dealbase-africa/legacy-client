import { useEffect, useMemo, useState } from "react";
export function useAuthHeaders() {
    const [token, setToken] = useState(null);
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
//# sourceMappingURL=useAuthHeaders.js.map