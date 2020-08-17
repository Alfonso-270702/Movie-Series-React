import React from "react";
import { Card, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: String) {
    removeMovie(id: $id) {
      msg
    }
  }
`;

const REMOVE_SERIE = gql`
  mutation RemoveSerie($id: String) {
    removeSeries(id: $id) {
      msg
    }
  }
`;

function FilmCard(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.film;
  const { type } = props;
  const history = useHistory();
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [removeSeries] = useMutation(REMOVE_SERIE);

  function remove(id) {
    if (type === "Movie") {
      removeMovie({
        variables: {
          id,
        },
        refetchQueries: ["GetMovies"],
      });
    } else if (type === "Series") {
      removeSeries({
        variables: {
          id,
        },
        refetchQueries: ["GetSeries"],
      });
    }
  }

  function editPage(id) {
    history.push(`/edit-form/${id}`, {
      id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
      type,
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
          <Card.Title>{title}</Card.Title>
          <Card.Text>{overview}</Card.Text>
          <Card.Text>{tags.join(", ")}</Card.Text>
          <Card.Footer>
            <small className="text-muted">{popularity}</small>
          </Card.Footer>
          <Button className="mr-1" onClick={() => editPage(_id)}>
            Edit
          </Button>
          <Button className="mr-1" onClick={() => remove(_id)}>
            Delete
          </Button>
          <Button className="mr-1">Fav</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default FilmCard;
