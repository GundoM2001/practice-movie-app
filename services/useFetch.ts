import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    // Holds the fetched data
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    // Core async function that performs the fetch
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await fetchFunction()

            setData(result)
        } catch (e) {
            setError(e instanceof Error ? e : new Error('An error occurred.'))
        } finally {
            setLoading(false)
        }
    }

    //Resets the hook back to its initial state
    const reset = () => {
        setData(null)
        setLoading(false)
        setError(null)
    }

    // Runs after the component mounts (and on re-renders)
    // Fetch triggers if autoFetch is true
    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    },[autoFetch]) //called when you want to execute something at the start of the component load

    //Exposes state and actions to the components using the hook
    return {data, loading, error, refetch: fetchData, reset}
}

export default useFetch