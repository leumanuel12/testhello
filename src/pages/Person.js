import { useParams, useNavigate } from "react-router-dom";
import { baseUrl8000 } from "../shared";
import { useEffect, useState } from "react";


export default function Person() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState();
  const [tempPerson, setTempPerson] = useState();
  const [changed, setChanged] = useState(false);
  const [errormsg, setError] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  
  //show and hide Save button
  useEffect( () => {
    if(!person) return; //checking first if it has value is necessary
    let equal = true;
    if(person.name !== tempPerson.name) equal=false;
    if(person.company !== tempPerson.company) equal=false;
    if(equal) setChanged(false);
  } )

  useEffect(() => {
    const url = baseUrl8000 + "api/persons/"+id;
    //console.log(url)

    fetch(url, 
        {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          }
        })
      .then((response) => {
        if (!response.ok) {
          if(response.status === 404){
            navigate('/NotFound');
          }
          throw new Error("Something went wrong.");
        }
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
  function updatePerson(){
    console.log('updating record...');
    const data = {...tempPerson};
    const url = baseUrl8000 + 'api/persons/' + id;
    //console.log(url)

    fetch(url, { 
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
      })
    .then( (response) => {
      if(!response.ok){
        if( response.status === 400 ){
          setError(true);
        }
        throw new Error('Something went wrong.');
      }
      return response.json();
    } )
    .then( (data) => {
      setPerson(data.person);
      setSavedMsg(true);
      //console.log(person)
    } )
    .catch( (e) => {
      console.log(e);
    } )
  }

  return (
    <>
      <h4 className="pb-3">Edit Record</h4>


      {errormsg ? <><div class="alert alert-danger"><b>Oh no!</b> Something went wrong.</div></> : null }
      {savedMsg ? <><div class="alert alert-success"><b>Changes are saved.</b></div></> : null }

      <form>
          {person ? (<>
          <table className="tbl-form p-5 border-spacing-2 border-separate border-2 border-solid border-gray-300">
            <tbody>
            <tr>
                <td className='px-3'>Name</td>
                <td className='px-3'>
                    <input
                        type="text"
                        className='flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3'
                        value={tempPerson.name}
                        onChange={ (e) => {
                            setTempPerson({...tempPerson, name: e.target.value});
                            //console.log(tempPerson.name)
                            setChanged(true);
                        } }/>
                </td>
            </tr>
            <tr>
                <td className='px-3'>Company</td>
                <td className='px-3'>
                    <input
                        type="text"
                        className='flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3'
                        value={tempPerson.company}
                        onChange={ (e) => {
                          setTempPerson({...tempPerson, company: e.target.value});
                          //console.log(tempPerson.company)
                          setChanged(true);
                        } }/>
                </td>
            </tr>
            </tbody>
          </table>
          </>) : null }
          
      </form>
      <div className='mx-auto mt-3'>

        {savedMsg ? (
          <button className="m-2 px-[8%] py-2 font-medium text-white hover:font-bold bg-green-500 hover:bg-green-600"
            onClick={ () => {
              navigate('/persons');
            } }>Back</button>
            ) : (
          <button className="m-2 px-[8%] py-2 font-medium text-white hover:font-bold bg-red-500 hover:bg-red-600"
            onClick={ () => {
              navigate('/persons');
            } }>Cancel</button>
            ) }

            {changed ? (
          <button className="m-2 px-[8%] py-2 bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
          onClick={(e) => {
            e.preventDefault();
            updatePerson();
        }}
              >Save</button>) : null}
      </div>
    </>
  )
}
