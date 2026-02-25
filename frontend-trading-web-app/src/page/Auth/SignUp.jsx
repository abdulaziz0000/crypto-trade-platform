import { useState } from "react"
import { register } from "@/State/Auth/Action"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()   // 🔥 VERY IMPORTANT
    dispatch(register(formData))
    console.log(formData)
  }

  return (
    <>
      <h2>Create Account 🚀</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
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
        <button type="submit">Sign Up</button>
      </form>

      <p className="toggle-text">
        Already have an account?
        <span onClick={() => navigate("/signin")}> Sign In</span>
      </p>
    </>
  )
}

export default SignUp