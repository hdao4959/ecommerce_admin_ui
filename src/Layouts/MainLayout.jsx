import { toast } from 'react-toastify'
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'
import PrivateRoute from '../PrivateRoute'
import { socket } from '../utils/socket'
import { useEffect } from 'react'
const MainLayout = () => {

  useEffect(() => {
    const handleShowNotification = (data) => {
      toast.success(data.title)
    }
    
    socket.on('notification', handleShowNotification)

    return () => {
      socket.off('notification', handleShowNotification)
    }
  }, [])

  return (
    <PrivateRoute>
      <LeftPanel />
      <RightPanel />
    </PrivateRoute>
  )
}

export default MainLayout
