import React, {useState} from "react";
import { login } from '../api/auth'
import{ useNavigate} from 'react-router-dom'
import './LoginPage.css'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate('')

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log("loginclick")
            const response = await login(email, password);

            if(response.status ===200){
                const {role, name,_id} =response.data.user;
                console.log(_id);
                sessionStorage.setItem('role' ,role);
                sessionStorage.setItem('name',name);
                sessionStorage.setItem('id',_id);
               
                if (role == 'admin'){
                    navigate('/admin')
                }else{
                    navigate('/')
                }
            }
              
        } catch (error) {
            console.log(error)
                 
        }
    };
    return (
        <div className="login-page">
            <h1>login</h1>
            <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>

                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
              

              <button type="submit">login</button>
              <p>
                Don't have an account? <a href="/register">register Here</a>
              </p>
            </form>
        </div>
    )
}


export default LoginPage