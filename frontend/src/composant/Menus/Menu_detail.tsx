/** @format */

import { useParams } from "react-router-dom";

export default function MenuDetail() {
  const { id } = useParams();

  return <p>id: {id}</p>;
}
