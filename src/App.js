import "./App.css";
import ShowPerson from "./components/ShowPerson";
import { useState } from "react";
import Table from 'react-bootstrap/Table';


function App(props) {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Bill Gates",
      company: "Microsoft",
    },
    {
      id: 2,
      name: "Steve Jobs",
      company: "Apple",
    },
    {
      id: 3,
      name: "Elon Musk",
      company: "Tesla",
    },
    {
      id: 4,
      name: "Mark Zuckerberg",
      company: "Meta",
    },
  ]);


  function updatePerson(id, newName, newCompany){
    const updatedPersons = persons.map( (person) => {
      //console.log('updatePerson function executing...');
      if( id == person.id ){
        return {...person, name: newName, company: newCompany}
      }
      return person;
    } );
    setPersons(updatedPersons);
  }

  return (
    <div className="App px-10 py-10">
      <h2 className="pb-5">Persons List</h2>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID #</th>
          <th>Name</th>
          <th>Company</th>
          <th>Settings</th>
        </tr>
      </thead>
      <tbody>
      {persons.map((person) => {
        return (
        <ShowPerson 
          id={person.id}
          name={person.name} 
          company={person.company}
          updatePerson={updatePerson}
        />
        );
      })}
      </tbody>
    </Table>
    </div>
  );
}

export default App;
