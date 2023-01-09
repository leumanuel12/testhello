import { useParams, useNavigate } from "react-router-dom";
import { baseUrl8000 } from "../shared";
import { useEffect, useState } from "react";
import ErrorMessages from "../components/ErrorMessages";

export default function Person() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState();
  const [tempPerson, setTempPerson] = useState();
  const [changed, setChanged] = useState(false);
  const [pageMessage, setPageMessage] = useState();

  //show and hide Save button
  useEffect(() => {
    if (!person) return; //checking first if it has value is necessary
    let equal = true;
    if (person.name !== tempPerson.name) equal = false;
    if (person.company !== tempPerson.company) equal = false;
    if (equal) setChanged(false);
  });

  useEffect(() => {
    const url = baseUrl8000 + "api/persons/" + id;
    //console.log(url)

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204 ){
          navigate('/NotFound');
        }
        if (response.status === 400 ){
          navigate('/NotFound');
        }
        if (response.status === 401 ){
          navigate('/NotFound');
        }
        if (response.status === 404 ){
          navigate('/NotFound');
        }
        /*if (!response.ok) {
          throw new Error("Something went wrong.");
        }*/
        return response.json();
      })
      .then((data) => {
        setPerson(data.person);
        setTempPerson(data.person);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //UPDATE PERSON RECORD
  function updatePerson() {
    console.log("updating record...");
    const data = { ...tempPerson };
    const url = baseUrl8000 + "api/persons/" + id;
    //console.log(url)

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            setPageMessage({ code: 3, mcode: 300 });
          }
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setPerson(data.person);
        setPageMessage({ code: 1, mcode: 101 });
        //console.log(person)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {person ? (
        <>
          <h4 className="pb-3">Edit Record</h4>

          <ErrorMessages pageMessage={pageMessage} />

          <form>
            <div className="max-w-lg m-4 p-5 border-2 border-solid border-gray-300">
              <div className="md:flex md:items-center m-3">
                <div className="md:w-1/4">
                  <label for="name">Name</label>
                </div>
                <div className="md:w-1/4">
                  <input
                    id="name"
                    type="text"
                    className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                    value={tempPerson.name}
                    onChange={(e) => {
                      setTempPerson({ ...tempPerson, name: e.target.value });
                      //console.log(tempPerson.name)
                      setChanged(true);
                    }}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center m-3">
                <div className="md:w-1/4">
                  <label for="company">Company</label>
                </div>
                <div className="md:w-1/4">
                  <input
                    id="company"
                    type="text"
                    className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                    value={tempPerson.company}
                    onChange={(e) => {
                      setTempPerson({ ...tempPerson, company: e.target.value });
                      //console.log(tempPerson.company)
                      setChanged(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mt-3 md:flex ml-12">
            {!changed ? (
              <button
                className="m-2 px-[8%] py-2 font-medium text-white hover:font-bold bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  navigate("/persons");
                }}
              >
                Back
              </button>
            ) : (
              <></>
            )}

            {changed ? (
              <>
                <button
                  className="m-2 px-[8%] py-2 font-medium text-white hover:font-bold bg-red-500 hover:bg-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setTempPerson({ ...person });
                  }}
                >
                  Cancel
                </button>

                <button
                  className="m-2 px-[8%] py-2 bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    updatePerson();
                  }}
                >
                  Save
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
