import { useParams } from "react-router-dom";


export default function Person() {
  const { personid } = useParams();

  return (
    <h1>test {personid}</h1>
  )
}
