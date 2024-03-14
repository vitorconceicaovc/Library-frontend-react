import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut, verifyAuth } from "../../API";

const Nav = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth().then((isAuthenticated) => {
      setAuth(isAuthenticated);
    });
  }, [auth]); 

  const handleLogout = () => {
    logOut(navigate);
    setAuth(false);
  };

  return (
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/books'>All books</Link></li>
      <li><Link to='/authors'>All authors</Link></li>
      {auth ? (
        <>
            <br />
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/requirements'>Requirements</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
        </>
      ) : (
        <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </>
      )}
    </>
  );
};

export default Nav;
