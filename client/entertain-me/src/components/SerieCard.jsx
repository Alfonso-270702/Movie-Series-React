import React from "react";
import { Card, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const REMOVE_SERIE = gql`
  mutation RemoveSerie($id: String) {
    removeSeries(id: $id) {
      msg
    }
  }
`;

function SerieCard(props) {
  const { _id, titile, overview, poster_path, popularity, tags } = props.serie;
  const [removeSeries] = useMutation(REMOVE_SERIE);

  function remove(id) {
    removeSeries({
      variables: {
        id,
      },
      refetchQueries: ["GetSeries"],
    });
  }

  return (
    <>
      <Card style={{ width: "18rem" }} className="m-3">
        <Card.Img
          variant="top"
          src={poster_path}
          style={{ width: "286px", height: "500px" }}
        />
        <Card.Body>
          <Card.Title>{titile}</Card.Title>
          <Card.Text>{overview}</Card.Text>
          <Card.Text>{tags.join(", ")}</Card.Text>
          <Card.Footer>
            <small className="text-muted">{popularity}</small>
          </Card.Footer>
          <Button className="mr-1">Edit</Button>
          <Button className="mr-1" onClick={() => remove(_id)}>
            Delete
          </Button>
          <Button className="mr-1">Fav</Button>
        </Card.Body>
      </Card>
    </>
  );
}
export default SerieCard;
