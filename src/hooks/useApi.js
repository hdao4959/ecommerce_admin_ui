import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const useApi = (apiFunc, autoFetch = false, ...initialArgs) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)
  const [response, setResponse] = useState(null)

  const fetchApi = async (...args) => {
    setLoading(true);
    setError(null)
    try {
      const response = await apiFunc(...args);
      setData(response?.data?.data)
      setResponse(response?.data)
      if(response?.data?.success && response?.data?.message){
        toast.success(response.data.message)
      }
    } catch (error) {
      setError(error?.response?.data?.errors || error?.response?.data?.message || "Có lỗi không xác định");
      toast.error(error?.response?.data?.errors || error?.response?.data?.message || "Có lỗi không xác định")
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
    loading,response, data, error, fetchApi
  }
}

export default useApi