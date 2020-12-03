import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import GoogleBtn from './GoogleBtn';



function App() {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <GoogleBtn
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {/* <GoogleBtn/> */}

      </header>
    </div>
  );
}

export default App;
