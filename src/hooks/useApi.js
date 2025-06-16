import { useEffect, useState } from "react"

const useApi = (apiFunc, autoFetch = false, ...initialArgs) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)

  const fetchApi = async (...args) => {
    setLoading(true);
    setError(null)
    try {
      const response = await apiFunc(...args);
      setData(response?.data?.data)
    } catch (error) {
      setError(error?.response || "Có lỗi không xác định");
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(autoFetch){
      fetchApi(...initialArgs);
    }
  }, [])



  return {
    loading, data, error, fetchApi
  }
}

export default useApi