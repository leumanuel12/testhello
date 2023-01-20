import { useEffect, useState } from "react";
import { baseUrl8000 } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import ErrorMessages from "./ErrorMessages";

export default function Register() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const [pageMessage, setPageMessage] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect( () => {
      //force logout user if existing user is loggedin
      localStorage.clear();
      setLoggedIn(false);
    } )


    function register(){
        const url = baseUrl8000 + 'api/register/';
        //console.log(url)
        //console.log('registering....')

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
        })
        .then( (response) => {
          if(response.ok){
            setPageMessage({ code: 1, mcode: 102 });
            setEmail('');
            setUserName('');
            setPassword('');
          }
          return response.json();
        } )
        .then( (data) => {

          //Instead of automatically redirecting user to a homepage,
          //I decided to display a message that will ask the user to login first
          //the Account created message was moved to the response because it seems that this here will still execute despite having error thrown for bad request

          //console.log(data.email[0])
          //console.log(data)
          if(data.username){
            //console.log(data.username[0])
            setPageMessage({ code: 2, mcode: data.username[0] });
          }
          if(data.email){
            //console.log(data.email[0])
            setPageMessage({ code: 2, mcode: data.email[0] });
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
          register();
        }}
      >
        <div className="max-w-md my-5 p-8 border-2 border-gray-300 mx-auto rounded-md">
        <ErrorMessages pageMessage={pageMessage} />
          <div className="m-2 sm:flex sm:items-center">
            <div className="w-1/3">
              <label for="email">Email</label>
            </div>
            <div className="w-1/3">
              <input
                id="email"
                type="text"
                className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
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
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
