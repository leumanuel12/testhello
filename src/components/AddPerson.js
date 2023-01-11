import React, { useEffect, useState } from "react";
import { ModalTitle } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ErrorMessages from "./ErrorMessages";

export default function AddPerson(props) {
  const [show, setShow] = useState(props.showHide);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [company, setCompany] = useState();

  useEffect(() => {
    //console.log(name);
    //console.log(company);
  }, [name, company]);

  return (
    <>
      <button
        onClick={props.toggleShowModal}
        className="btn-add-record hover:border-l-8 border-green-700 font-bold px-3 py-2 bg-green-500 text-white"
      >
        + New Record
      </button>

      <Modal
        show={props.showHide}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <ModalTitle>New Record</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <form
            id="edit-form"
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setCompany("");
              props.addNewPerson(name, company);
            }}
            >
            <div className="m-3">
              <div className="m-4 sm:flex sm:items-center">
                <div className="w-1/3">
                  <label for="name">Name</label>
                </div>
                <div className="w-2/3">
                  <input
                    id="name"
                    type="text"
                    className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="m-4 sm:flex sm:items-center">
                <div className="w-1/3">
                  <label for="company">Company</label>
                </div>
                <div className="w-2/3">
                  <input
                    id="company"
                    type="text"
                    className="flex shrink min-w-0 border-2 border-solid border-gray-300 rounded-md px-3"
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mx-auto md:flex justify-center mt-5">
            <button
              className="px-[20%] mb-2 py-2 bg-red-500 font-medium text-white hover:bg-red-600 hover:font-bold mr-2"
              onClick={props.toggleShowModal}
            >
              Cancel
            </button>
            <button
              className="px-[20%] mb-2 py-2 bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
              form="edit-form"
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}