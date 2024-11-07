import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {
    return  <Navigate to="/login"  />;
  }

  return <Outlet />
}

export default ProtectedRoute