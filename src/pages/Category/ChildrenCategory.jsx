import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';

const ChildrenCategory = () => {

  const [arrayChildrenCategory, setArrayChildrentCategory] = useState([]);
  const {id} = useParams();
  
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const {data} = await axiosInstance.get('/categories/' + id);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData()
  }, [])
  
  return (
    <div>
      Danh mục con
    </div>
  )
}

export default ChildrenCategory
