function UserHeader() {
    const state = useContext(GlobalState);
    const [isUserLogged, setIsUserLogged] = state.studentAPI.isStdLogged;
    const [isUser, setIsUser] = state.userAPI.isUser;

    const userLogout = async () => {
      await axios.get("/user/userLogout");
      localStorage.clear();
      setIsUser(false);
      setIsUserLogged(false);
    };
    return (
      <header className='stdHeader'>
             <div className="stdmenu">
          <img src={Menu} width="25" />
        </div>
        <div className="stdlogo">
        <Link to="/studentHome">
            <p>Profile</p>
          </Link>
          <Link to="/studentHome">
            <img src={Logo} width="70" className="stdLOGO" />
          </Link>
        </div>
  
        <ul className='stdul'>
       
          {isUser && isUserLogged && (
            <>
              {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
              <li style={{ color: "#ffff" }}>
                <Link to="/userLogin" onClick={userLogout}>
                  <button className="stdlogout-button">Logout</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    );
  }