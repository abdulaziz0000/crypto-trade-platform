import { useState } from "react"
import { login } from "@/State/Auth/Action"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   await dispatch(login(formData))
    navigate("/")
  }

  return (
    <>
      <h2>Welcome Back 👋</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Sign In</button>
      </form>

      <p className="link-text" onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </p>

      <p className="toggle-text">
        Don't have an account?
        <span onClick={() => navigate("/signup")}> Sign Up</span>
      </p>
    </>
  )
}

export default SignIn