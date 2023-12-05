
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [check, setCheck] = useState();

    const change =(e)=> {
        let {name,value}=e.target;
        setUser({...user,[name]:value});
    }
    const checkpassword = (e)=> {
        let {name,value}=e.target;
        setUser({...user,[name]:value});

        // Checking password and confirm password
        if(value !== user.password){
            setCheck(<p>Invalid Password</p>);
        }else{
            setCheck([]);
        }
    }
    
    const handleChange =(e)=> {
        e.preventDefault();

        // Checking password and confirmpassword
        if(user.password === user.confirmPassword){

            // Connect to backend using API
            axios.post('http://localhost:8080/myapp/signup',{...user})
            .then(res => {

                //Checking response from backend
                if(res.data === "created"){
                    alert("User Created Successfully");

                    // Redirect to login page after successful signup
                    navigate('/login');
                }else if(res.data === "exists"){
                    alert("Email already exists !");
                }
            })
            .catch(err => {
                alert("Error creating user !");
            })
            setUser({});
        }else{
            alert("Password does not match !");
        }
    }
    return(
        <div className="main">
            <h1>Sign up</h1>
            <form onSubmit={handleChange} method="POST" className="signupForm">
                <input type="text" name="name" placeholder="Name" value={user.name || ""} onChange={change} required /><br />
                <input type="email" name="email" placeholder="Email" value={user.email || ""} onChange={change} required /><br />
                <input type="password" name="password" placeholder="Password" value={user.password || ""} onChange={change} required /><br />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword || ""} onChange={checkpassword} required />{check}<br />
                <button type="submit" className="btn">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login" className="link">login</Link></p>
        </div>    
    )
}

export default Signup;