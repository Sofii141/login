import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();

  if(loading) return <h1>Loading...</h1>

  if (!loading && !isAuthenticated) return <Navigate to='login' replace />

  //continuar con el componente que esta adentro 
  return (
    <Outlet />
  )
}

export default ProtectedRoute