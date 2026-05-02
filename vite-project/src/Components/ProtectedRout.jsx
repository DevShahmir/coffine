import { useAuth } from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";




const ProtectedRout = ({ children }) => {
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" />
  return children

}

export default ProtectedRout