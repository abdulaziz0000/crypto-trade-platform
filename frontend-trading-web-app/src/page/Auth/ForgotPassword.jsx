import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <>
      <h2>Reset Password 🔐</h2>

      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Send Reset Link</button>
      </form>

      <p className="toggle-text">
        Remember your password?
        <span onClick={() => navigate("/signin")}> Sign In</span>
      </p>
    </>
  )
}

export default ForgotPassword;