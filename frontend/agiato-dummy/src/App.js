import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function App() {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          //href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login to Agiato
        </a><br></br>
        <GoogleLogin
    clientId="1065846623436-dc3o91lvp3egur7rsv1eoovr59l8nb3k.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
      </header>
    </div>
  );
}

export default App;
