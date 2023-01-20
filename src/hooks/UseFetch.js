import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../App";
import { useContext } from "react";

export default function useFetch(url, { method, headers, body }) {
  const [personData, setPersonData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const navigate = useNavigate();
  const location = useLocation();

  //Display all data ---------------------------------------------------------------------
  function request() {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if(!response.ok){
            setErrorStatus(response.status)
        }
        return response.json();
      })
      .then((data) => {
        //console.log("setting data...");
        setPersonData(data.person);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //Delete specific data ---------------------------------------------------------------------
  function deleteData(id) {
    //console.log("deleting....");
    fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "applications/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorStatus(response.status);
        }
        if (response.status === 401) {
          setLoggedIn(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //Add new data ---------------------------------------------------------------------
  function appendData(name, company) {
    //console.log('adding new data...')
    const data = { name: name, company: company };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorStatus(response.status);
          if (response.status === 401) {
            setLoggedIn(false);
          }
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return { request, deleteData, appendData, personData, errorStatus };
}
