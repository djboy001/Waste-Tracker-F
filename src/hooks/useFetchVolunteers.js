import React, { useEffect } from 'react';
import { useAuth } from '../context/ContextApi';
import { url } from '../constants';

function useFetchVolunteers({ setError, setFlag, setAllVolunteers }) {
    const { currentPlaceId  } = useAuth();
    useEffect(() => {
        var controller = new AbortController();
        const { signal } = controller;
        async function fetchData() {
            try {
                const response = await fetch(`${url}api/volunteer/${currentPlaceId}`, { signal });
                const data = await response.json();
                controller = null;
                if (data && data.length === 0) {
                    setFlag(false);
                    setAllVolunteers(data);
                } else {
                    setFlag(true);
                    setAllVolunteers(data);
                }
            } catch (error) {
                setFlag(false);
                setError("There are no volunteers at this location");
            }
        }
        fetchData();
        return () => controller?.abort();
    }, [currentPlaceId]);
}

export default useFetchVolunteers;