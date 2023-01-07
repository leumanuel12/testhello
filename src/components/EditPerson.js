import React, { useEffect, useState } from 'react';
import { ModalTitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


export default function EditPerson(props) {
  const [show, setShow2] = useState(props.showHide2);

  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow2(true);

  const [name2, setName2] = useState();
  const [company2, setCompany2] = useState();


  useEffect( () => {
    //console.log(name2);
    //console.log(company2);
  } )

  return (
    <>
      <button
          className="mx-3"
          onClick={ () => {
            props.toggleShowModal2();
          } }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-green-700 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
      </button>

      <Modal
        show={props.showHide2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
            <ModalTitle>Edit Record</ModalTitle>
        </Modal.Header>
        <Modal.Body>
        
            {props.errormsg ? <><div class="alert alert-danger"><strong>Oh no!</strong> {props.errormsg}</div></> : null }
         
          <form 
            className="tbl-form m-3 mx-auto justify-center border-spacing-2 border-separate"
            id="edit-form2"
            onSubmit={(e) => {
                e.preventDefault();
                setName2('');
                setCompany2('');
                //props.addNewPerson(name, company);
            }}>
                <tr className=''>
                    <td className='px-3'>Name</td>
                    <td className='px-3'>
                        <input
                            type="text"
                            className='flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3'
                            onChange={ (e) => {
                                setName2(e.target.value);
                            } }/>
                    </td>
                </tr>
                <tr>
                    <td className='px-3'>Company</td>
                    <td className='px-3'>
                        <input
                            type="text"
                            className='flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3'
                            onChange={ (e) => {
                                setCompany2(e.target.value);
                            } }/>
                    </td>
                </tr>
            </form>
            <div className='mx-auto flex justify-center mt-5'>
                <button className="px-[20%] py-2 mx-auto bg-red-500 font-medium text-white hover:bg-red-600 hover:font-bold" onClick={props.toggleShowModal2}>Cancel</button>
                <button 
                    className="px-[20%] py-2 mx-auto bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
                    form="edit-form2">Save</button>
            </div>

        </Modal.Body>
      </Modal>
    </>
  );
}