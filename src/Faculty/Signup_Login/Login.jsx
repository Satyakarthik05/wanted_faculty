import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import org from "./Login.module.css";
import axios from 'axios';
import { API_URL } from '../../data/apipath';
import { useNavigate } from 'react-router-dom';
import Model from 'react-modal';
import style from '../../Institution/AddPost/Addpost.module.css'
// import ForgetPassword from "./forgetPassword/ForgetPassword";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [visible, setvisible] = useState(false);
  const [success,setsuccess]= useState(false);
  const [Emails,setEmails] = useState('');
  const [OTP,setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword,setnewPassword] =useState('');
  const [disabled,setDisabled] = useState(false);
  Model.setAppElement('#root')

  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  const mess = document.getElementById('error');
  const logmess = document.getElementById('logerror')
  const otp =document.getElementById('otp');
  const emailcheck = document.getElementById('emailcheck');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await fetch(`${API_URL}/faculty/facultySign`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ Name, email, password })
      })

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setMessage(data.message);
        // alert('Registration success');
        setsuccess(true);
        setTimeout(()=> {
          setsuccess(false);
        },3000);
        setIsSignIn(true);

      } else {
        mess.textContent = "Email Id already Exists"
      }

    } catch (error) {
      console.error(error);
    }


  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/faculty/facultyLogin`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ Email, Password })

      })
      setLoading(false);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        // alert('Login Successful');
        localStorage.setItem('loginToken', data.token)
        navigate('/')

      }
      else {
        logmess.textContent = "Invalid email or Password"

      }
    } catch (error) {
      console.error(error)
    }
  }


  const handleOtp =async (e)=> {
    e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/faculty/resetpass`,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({Emails})
        })

        const data = await response.json();

        if(response.ok){
          console.log(data);
          otp.textContent="* OTP send successfully"

        }
        else{
          emailcheck.textContent="Invalid Email id"
        }
      } catch (error) {
        console.error(error);
      }

  }  


  const handleResetPassword = async (e)=> {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/faculty/verifyotp`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({Emails,OTP,newPassword})
      })

      const data = await response.json();

      if(response.ok){
        console.log(data);
        alert('Your password reset successfully');
        setvisible(false);
      }

      otp.textContent="An error occured please try again"
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      id="container"
      className={`${org.container} ${isSignIn ? org.signin : org.signup}`} style={{ zIndex: visible ? -1 : '6' }}
    >
      {/* <br /> */}
      <div className={org.navbar}>
        <div className={org.navlinks} >
          <h3 className={org.actives}>Faculty</h3>
          <h3 className={org.inactive}>
            <Link to="/org">Organization</Link>
          </h3>
        </div>
      </div>
      <div className={org.row}>
        {/* SIGN UP */}
        <div
          className={`${org.col} ${org.alignitemscenter} ${org.flexcol} ${org.signup}`}
        >
          <div className={`${org.formwrapper} ${org.alignitemscenter}`}>
            <div className={`${org.form} ${org.signup}`}>
              <form onSubmit={handleSubmit}>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxsuser}`}></i>
                  <p id="error"></p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxmailsend}`}></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxslockalt}`}></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxslockalt}`}></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {/* <input type="submit" name="" id="" /> */}
                <button type="submit" disabled={disabled}>Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggleForm} className={org.pointer}>
                    Sign in here
                  </b>
                </p>
              </form>
              {loading && <div className={org.loader}></div>}
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div
          className={`${org.col} ${org.alignitemscenter} ${org.flexcol} ${org.signin}`}
        >
          <div className={`${org.formwrapper} ${org.alignitemscenter}`}>
            <div className={`${org.form} ${org.signin}`}>
              <form onSubmit={loginHandler}>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxsuser}`}></i>
                  <p id="logerror"></p>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Email"
                    required
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={org.inputgroup}>
                  <i className={`${org.bx} ${org.bxslockalt}`}></i>
                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    required
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Sign in</button>
                <p>
                  <Link onClick={(e)=> setvisible(true)}>Forgot password?</Link>
                </p>
                <p>
                  <span>Don't have an account?</span>
                  <b onClick={toggleForm} className={org.pointer}>
                    Sign up here
                  </b>
                </p>
              </form>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className={`${org.row} ${org.contentrow}`} >
        {/* SIGN IN CONTENT */}
        <div className={`${org.col} ${org.alignitemscenter} ${org.flexcol}`}>
          <div className={`${org.text} ${org.signin}`}>
            <br />
            <br />
            <h2>Faculty Login</h2>
          </div>
          <div className={`${org.img} ${org.signin}`}></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className={`${org.col} ${org.alignitemscenter} ${org.flexcol}`}>
          <div className={`${org.img} ${org.signup}`}></div>
          <div className={`${org.text} ${org.signup}`}>
            <br />
            <br />
            <h2>Faculty signup</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
      {/* Message Section */}
      {message.text && (
        <div style={{ color: message.color }}>
          <p>{message.text}</p>
        </div>
      )}

      <div className={org.modal} id="popup">
        <Model
          isOpen={visible}
          onRequestClose={() => setvisible(false)}
          className={org.content}
          // overlayClassName={org.overlay}
          style={{
            overlay: {
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.75)',
            }
          }}  
        >
            <h1 style={{color:"black"}} className={org.retext}>RESET PASSWORD</h1>
            <p id="emailcheck" style={{color:"black"}}></p>
            <form action="" onClick={handleOtp}>
              <div className={org.firotp}>
                <input type="text" placeholder="Email"  className={org.inp} value={Emails} onChange={(e)=> setEmails(e.target.value)}/>
                <button  className={org.otp} type="submit">Send OTP</button>
              </div>
            </form>
            <p id="otp" style={{color:"green"}}></p>
            <form action="" onSubmit={handleResetPassword}>
              <div className={org.secotp}>
              <input type="text" placeholder="OTP"  className={org.inp} value={OTP} onChange={(e)=> setOTP(e.target.value)}/>
              <input type="hidden" placeholder="OTP"  className={org.inp} value={Emails}/>
              <input type="text" placeholder="New Password"  className={org.inp} value={newPassword} onChange={(e)=> setnewPassword(e.target.value)}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <button onClick={() => setvisible(false)} style={{ padding: '10px 20px', margin: '10px', }} className={org.close}>Close</button>
                <button style={{ padding: '10px 20px', margin: '10px' }} className={org.sub} type="submit">Submit</button>
              </div>
            </form>
        </Model>
        <Model
          isOpen={success}
          onRequestClose={() => setsuccess(false)}
          className={style.contents}
          // overlayClassName={org.overlay}
          style={{
            overlay: {
              zIndex: 2,
              background: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <div className={style.card}>
      <svg className={style.wave} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
          fill-opacity="1"
        ></path>
      </svg>

      <div className={style.iconContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          stroke-width="0"
          fill="currentColor"
          stroke="currentColor"
          className={style.icon}
        >
          <path
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
          ></path>
        </svg>
      </div>
      <div className={style.messageTextContainer}>
        <p className={style.messageText}>Success message</p>
        <p className={style.subText}>Registered successfully You can login now</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        stroke-width="0"
        fill="none"
        stroke="currentColor"
        className={style.crossIcon}
        // onClick={onClose}
      >
        <path
          fill="currentColor"
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>

        </Model>
      </div>
    </div>
  );
};

export default Login;
