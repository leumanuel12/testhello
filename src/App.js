import "./App.css";
import Persons from "./pages/Persons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Person from "./pages/Person";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { createContext, useState, useEffect } from "react";
import { baseUrl8000 } from "./shared";
import Register from "./components/Register";

export const LoginContext = createContext();


export default function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  const [userLogged, setUserLogged] = useState();

  function changeLoggedIn(value){
    setLoggedIn(value);
    if( value === false ){
      localStorage.clear();
    }
  }

  function setTokens(){
    if (localStorage.refresh) { //we check first if we have tokens else refresh token fetch will run everytime even when not loggedin
      
      //console.log("refreshing token...");
      const url = baseUrl8000 + "api/refresh/";
      //console.log(url);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: localStorage.refresh,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong.");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.access = data.access; //now we set the new tokens
          localStorage.refresh = data.refresh;
          //console.log("access=",localStorage.access)
          setLoggedIn(true); //just making sure we wont get kicked out once refresh
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    const minute = 1000 * 60;

    setTokens(); //we invoke it at once so it will refresh the moment we login
    
    setInterval(setTokens, minute * 3); //now refresh token will execute every 3 minutes on this case
  });


  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Persons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/persons/:id" element={<Person />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}
