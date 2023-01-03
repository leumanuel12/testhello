import { Button } from 'react-bootstrap';
import EditPerson from './EditPerson';

function ShowPerson(props) {
  return (
        <tr>
          <td>{props.id}</td>
          <td>{props.name}</td>
          <td>{props.company}</td>
          <td> <EditPerson id={props.id} name={props.name} company={props.company} updatePerson={props.updatePerson}/></td>
        </tr>
  );
}


export default ShowPerson;