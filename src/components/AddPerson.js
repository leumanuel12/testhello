import React, { useEffect, useState } from 'react';
import { ModalTitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ErrorMessages from './ErrorMessages';


export default function AddPerson(props) {
  const [show, setShow] = useState(props.showHide);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [company, setCompany] = useState();


  useEffect( () => {
    //console.log(name);
    //console.log(company);
  }, [name,company] )

  return (
    <>
      <button onClick={props.toggleShowModal} className="btn-add-record hover:border-l-8 border-green-700 font-bold px-3 py-2 bg-green-500 text-white">
        + New Record
      </button>

      <Modal
        show={props.showHide}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
            <ModalTitle>New Record</ModalTitle>
        </Modal.Header>
        <Modal.Body>
        

          <form 
            id="edit-form"
            onSubmit={(e) => {
                e.preventDefault();
                setName('');
                setCompany('');
                props.addNewPerson(name, company);
            }}>
              <table className="tbl-form m-3 mx-auto justify-center border-spacing-2 border-separate">
                <tr>
                    <td className='px-3'>Name</td>
                    <td className='px-3'>
                        <input
                            type="text"
                            className='flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3'
                            onChange={ (e) => {
                                setName(e.target.value);
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
                                setCompany(e.target.value);
                            } }/>
                    </td>
                </tr>
                </table>
            </form>
            <div className='mx-auto flex justify-center mt-5'>
                <button className="px-[20%] py-2 mx-auto bg-red-500 font-medium text-white hover:bg-red-600 hover:font-bold" onClick={props.toggleShowModal}>Cancel</button>
                <button 
                    className="px-[20%] py-2 mx-auto bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
                    form="edit-form">Save</button>
            </div>

        </Modal.Body>
      </Modal>
    </>
  );
}