import { useState, useEffect } from "react";
import { baseUrl8000 } from "../shared";
import Table from "react-bootstrap/Table";
import AddPerson from "../components/AddPerson";
import EditPerson from "../components/EditPerson";


export default function Persons() {
  const [persons, setPersons] = useState();
  const [showHide, setShowHide] = useState(false);
  const [savedMsg, setSavedMsg] = useState();
  const [deleted, setDeleted] = useState(false);
  const [errormsg, setError] = useState();
  const [showHide2, setShowHide2] = useState(false);
  const [personId, setPersonId] = useState();

  function toggleShowModal(){
    setShowHide(!showHide);
    setError();
  }

  function toggleShowModal2(){
    setShowHide2(!showHide2);
  }



  useEffect(() => {
    const url = baseUrl8000 + "api/persons/";
    //console.log(url)

    //DISPLAY ALL DATA FROM PERSONS
    fetch(url, 
        {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          }
        })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setPersons(data.person);
        setDeleted(false);
        //console.log(data.person);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [deleted]);

  //ADD NEW PERSON ON DATABASE
  function addNewPerson(name, company){
    const url = baseUrl8000 + "api/persons/";
    const data = {name: name, company: company}
    //console.log('adding new record...');
    //console.log(name);
    //console.log(company);
    fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
    .then((response) => {
      if (!response.ok) {
        setError('Something went wrong.');
        if(response.status === 400){
          throw new Error("Something went wrong.");
        }
      }
      return response.json();
    })
    .then( (data) => {
      toggleShowModal();
      setPersons([...persons, data.person]) //this will show new data added without reloading the whole page
      setSavedMsg('New record is now added.');
    } )
    .catch((e) => {
      console.log(e);
    });
  }

  //DELETE A PERSON RECORD
  function deletePerson(id){
    console.log('deleting record...');
    //console.log(id);
    const url = baseUrl8000 + 'api/persons/' +id;
    console.log(url);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'applications/json',
      }
    })
    .then( (response) => {
      if(!response.ok){
        throw new Error('Something went wrong.')
      }
    } )
    .then( (data) => {
        setDeleted(true);
    } )
    .catch( (e) => {
      console.log(e);
    } );

  }

  //EDIT PERSON RECORD
  function updatePerson(id){
    console.log('updating record...');
    console.log(id)
  }
  

  return (
  <>
    <div className="px-10 py-3 max-w-6xl mx-auto">
      <h4 className="pb-3">Persons List</h4>

      <div className="block max-w-3xl mb-3">
        <AddPerson addNewPerson={addNewPerson} showHide={showHide} toggleShowModal={toggleShowModal} errormsg={errormsg} />
      </div>

      <Table
        bordered
        hover
        size="md"
        className="md:table-fixed persons-table max-w-3xl"
      >
        <thead className="bg-gray-800 text-white bg-gradient-to-r from-green-600">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="border-gray-400 border-collapse">
          <>
            {persons
              ? persons.map((names) => {
                  return (
                    <tr key={names.id} className="hover:bg-gray-300 hover:font-medium hover:m-3">
                      <td>{names.name}</td>
                      <td>{names.company}</td>
                      <td>
                        <EditPerson toggleShowModal2={toggleShowModal2} showHide2={showHide2} updatePerson={updatePerson}/>

                      <button
                        className="mx-3"
                        onClick={ () => {
                          deletePerson(names.id);
                        } }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="stroke-red-500 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                      </td>
                    </tr>
                  );
                }).reverse()
              : null}
          </>
        </tbody>
      </Table>
    </div>
  </>);
}