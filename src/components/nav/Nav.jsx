import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut, verifyLogin, getMyStatus } from "../../API";

const Nav = () => {
  const [admin, setAdmin] = useState(false);
  const [login, setLogin] = useState(false);
  const [userStatus, setUserStatus] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    verifyLogin().then((login) => {
      setLogin(login);
    });
  }, [userStatus]); 

  const handleLogout = () => {
    logOut(navigate);
    setAdmin(false);
    window.location.reload(false);
  };

  const fetchMyStatus = async () => {
    try {
      const myStatusData = await getMyStatus()
      setUserStatus(myStatusData)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    console.log("User status:", userStatus.data);
    console.log("Admin?:", userStatus.admin);

    if(userStatus.admin) {
      setAdmin(true)
    }

  }, [userStatus]);

  return (
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/books'>All books</Link></li>
      <li><Link to='/authors'>All authors</Link></li>
      <br />
      {login ? (
        <>
          <li><Link to='/profile'>Profile</Link></li>
          
          {admin &&
            <>             
             <li><Link to='/requirements'>Requirements</Link></li>
            </>
          }
          <br />
          <li><button onClick={fetchMyStatus} >verivy status</button></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </>
      ) : (
        <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </>
        
      )
      }
    </>
  );
};

export default Nav;
