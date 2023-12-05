
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const change =(e)=> {
        let {name,value}=e.target;
        setUser({...user,[name]:value});
    }

    const handleChange =(e)=> {
        e.preventDefault();

        // Connect to backend using API
        axios.post('http://localhost:8080/myapp/login',{...user})
        .then(res => {
            console.log(res.data);
            //Checking response from backend
            if(res.data === "Login"){
                
                // Redirect to profile page after successful login
                navigate('/profile',{state:user.email});
                setUser({});
            }else if(res.data === "Invalid"){
                alert("Invalid email or password");
            }
        })
        .catch(err => {
            alert("Error Login");
        })
        
        axios.get('http://localhost:8080/myapp/')
        .then(data => console.log(data))
        .catch(err => console.log(40,err))
    }

    return(
        <div className="main">
            <h1>Login</h1>
            <form onSubmit={handleChange} method="POST" className="loginForm">
                <input type="email" name="email" placeholder="Email" value={user.email || ""} onChange={change} required /><br />
                <input type="password" name="password" placeholder="Password" value={user.password || ""} onChange={change} required /><br />
                <button type="submit" className="btn">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup" className="link">sign up</Link></p>
        </div>
    )
}

export default Login;