import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function Login() {

const navigate = useNavigate();

const [form,setForm] = useState({
email:"",
password:""
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]:e.target.value
});
};

const login = async (e) => {
e.preventDefault();

try{

  const res = await API.post(
    "/auth/login",
    form
  );

  localStorage.setItem(
    "token",
    res.data.token
  );

  navigate("/dashboard");

}catch(err){
  alert("Invalid Credentials");
}

};

return( <div className="auth-container"> <div className="auth-card">

    <h2 className="auth-title">
      Welcome Back 👋
    </h2>

    <form onSubmit={login}>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      <button
        className="btn-primary"
        type="submit"
      >
        Login
      </button>

    </form>

    <div className="auth-footer">
      Don't have an account?{" "}
      <Link to="/signup">
        Sign Up
      </Link>
    </div>

  </div>
</div>

);
}

export default Login;