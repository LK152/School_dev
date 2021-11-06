import logo from "./logo.svg";
import "./App.css";
import GoogleLogin from "react-google-login";
import { useState } from "react";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (googleData) => {
    console.log(googleData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Login</h1>
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Log In"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      </header>
    </div>
  );
}

export default App;
