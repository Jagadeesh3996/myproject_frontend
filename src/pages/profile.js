
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Profile = () =>{
           
        const navigate = useNavigate();
        const location = useLocation();
        const [user, setUser] = useState({});
    
        const change =(e)=> {
            let {name,value}=e.target;
            setUser({...user,[name]:value});
        }

        const handleChange =(e)=> {
            e.preventDefault();

            // Connect to backend using API
            axios.put('http://localhost:8080/myapp/profile',{...user})
            .then(res => {

                //Checking response from backend
                if(res.data === "Unauthorized"){
                    alert("User Unauthorized");

                    // Redirect to login page
                    navigate('/login');
                }else if(res.data === "updated"){
                    alert("Profile updated successfully");
                }
            })
            .catch(err => {
                alert("Error Profile updating");
                console.log("Error : "+ err);
            })
            setUser({});
        }

        const logout = () =>{

            // Connect to backend using API
            axios.get('http://localhost:8080/myapp/logout')
            .then(res => {

                //Checking response from backend
                if(res.data === "logout"){
                    alert("User logout");

                    // Redirect to login page after successful logout
                    navigate('/login');
                }else if(res.data === "Error"){
                    alert("Error logging out");
                }
            })
            .catch(err => console.log("Error : "+ err))
        }
        
    return(
        <div className="main">
            <h1>Profile</h1>
            <p>Hi, Welcome {location.state} please update your profile.</p>
            <form className="profileForm" onSubmit={handleChange} method="POST">
                <input type="number" name="age" placeholder="Age" value={user.age || ""} onChange={change} required /><br />
                <input type="text" name="gender" placeholder="Gender" value={user.gender || ""} onChange={change} required /><br />
                <input type="date" name="dob" placeholder="dob" value={user.dob || ""} onChange={change} required /><br />
                <input type="number" name="mobile" placeholder="Mobile" value={user.mobile || ""} onChange={change} required /><br />
                <input type="text" name="city" placeholder="City" value={user.city || ""} onChange={change} required /><br />
                <button type="submit" className="btn">Update Profile</button>
            </form>
            <Link className="link" onClick={logout}>Logout</Link>
        </div>    
    )
}

export default Profile;