import { useState, useEffect } from "react";

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    token: string | undefined;
}

function useApi<T>(url: string, token?: string): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers: Record<string, string> = {};
                if (token) {
                    headers.Authorization = `Bearer ${token}`; 
                }
                const response = await fetch(url, { headers });
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(`Erreur de requête: ${error}`);
            } finally {
                setLoading(true);
            }
        };
        fetchData();
    }, [url, token]);
    return { data, loading, error, token };
}

export default useApi;
