import { useState, useEffect } from "react";

interface ApiResponse<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

function useApi<T>(url: string): ApiResponse<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(`Erreur de requête: ${error}`);
            } finally {
                setLoading(true);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
}

export default useApi;
