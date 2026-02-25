import { useLocation } from "react-router-dom"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"
import "./auth.css"

const Auth = () => {

  const location = useLocation()

  const renderForm = () => {
    if (location.pathname === "/signup") return <SignUp />
    if (location.pathname === "/forgot-password") return <ForgotPassword />
    return <SignIn />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {renderForm()}
      </div>
    </div>
  )
}

export default Auth