import React from "react";
import { Card, Button } from "react-bootstrap";

function MovieCard(props) {
  const { _id, titile, overview, poster_path, popularity, tags } = props.movie;
  console.log(props.movie);
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
        </Card.Body>
      </Card>
    </>
  );
}

export default MovieCard;
