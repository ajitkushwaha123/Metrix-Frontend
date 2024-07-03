import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'http://localhost:8000';

export default function useFetch(query) {
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null,
        networkError: null, // Add this state property
    });

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            try {
                setData((prev) => ({ ...prev, isLoading: true }));

                const { data, status } = await axios.get(`/api${query}`);

                if (status === 200) { // Check for 200 status
                    setData((prev) => ({ ...prev, isLoading: false, apiData: data, status }));
                }

                setData((prev) => ({ ...prev, isLoading: false }));
            } catch (error) {
                setData((prev) => ({ ...prev, isLoading: false, networkError: error })); // Handle network errors
            }
        };

        fetchData();
    }, []); 
    
    return [getData, setData];
}
