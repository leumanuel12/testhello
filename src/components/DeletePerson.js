import Modal from 'react-bootstrap/Modal';


export default function DeletePerson(props) {

  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
    >
      <Modal.Body closeButton>
        <div className="m-3">
            <h4 className='text-red-500'>Warning !</h4>
            <div>Are you sure you want to delete this record?</div>
            <p>{props.name}</p>
            <p>{props.company}</p>
        </div>
        <div className='mx-2 flex justify-center mt-5'>
            <button className="px-[18%] mx-1 py-2 bg-red-500 font-medium text-white hover:bg-red-600 hover:font-bold"
                onClick={ () => {
                    props.toggleModalDelete();
                } } 
                >Cancel</button>
            <button className="px-[18%] mx-1 py-2 bg-green-500 font-medium text-white hover:bg-green-600 hover:font-bold"
                onClick={ () => {
                    props.deletePerson(props.personId);
                    props.onHide();
                    }}
                >Confirm</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
