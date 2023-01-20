import { useEffect, useState } from "react";
import { baseUrl8000 } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext, UserContext } from "../App";
import ErrorMessages from "./ErrorMessages";

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [userLogged, setUserLogged] = useContext(UserContext);

    const [pageMessage, setPageMessage] = useState(false);


    function login(){
        const url = baseUrl8000 + 'api/token/';
        //console.log(url)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then( (response) => {
          if( response.status === 401 ){
            setLoggedIn(false);
            localStorage.clear();
          }
          return response.json();
        } )
        .then( (data) => {
          localStorage.setItem('token', data);
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          //console.log(localStorage);
          
          //console.log(data.detail);
          //I added this condition to prevent the headers from rendering into loggedin state even though the credentials are incorrect
          //thus, checking first if theres error is necessary here before setting state to login true
          if(!data.detail){
            setUserLogged(username);
            setLoggedIn(true); //added this so the Login/Logout text in headers will render properly
            navigate(localStorage?.state?.previousUrl ? localStorage.state.previousUrl : '/persons');
          } else {
            setLoggedIn(false);
            setPageMessage({ code: 2, mcode: data.detail });
          }
          
        } )
        .catch( (e) => {
            console.log(e);
        } )
    }

  return (
    <>
      <form
        id="edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div className="max-w-md my-5 p-8 border-2 border-gray-300 mx-auto rounded-md">
        <ErrorMessages pageMessage={pageMessage} />
          <div className="m-2 sm:flex sm:items-center">
            <div className="w-1/3">
              <label for="username">Username</label>
            </div>
            <div className="w-1/3">
              <input
                id="username"
                type="text"
                className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                value={username}
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="m-2 sm:flex sm:items-center">
            <div className="w-1/3">
              <label for="password">Password</label>
            </div>
            <div className="w-1/3">
              <input
                id="password"
                type="password"
                className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mx-auto md:flex justify-center mt-5">
            <button
              className="px-10 py-2 bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
              form="edit-form"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
