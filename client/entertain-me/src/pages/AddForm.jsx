import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const ADD_MOVIES = gql`
  mutation AddMovie($insertMovie: newMovie) {
    addMovie(movie: $insertMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const ADD_SERIE = gql`
  mutation AddSerie($insertSerie: newSeries) {
    addSerie(series: $insertSerie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function AddFrom() {
  const [addMovie] = useMutation(ADD_MOVIES);
  const [addSerie] = useMutation(ADD_SERIE);

  const history = useHistory();

  const [form, setForm] = useState({
    title: "",
    overview: "",
    popularity: "",
    poster_path: "",
    tags: [],
  });

  const [type, setType] = useState("Movie");

  const category = [
    "action",
    "comedy",
    "horror",
    "thriller",
    "romance",
    "drama",
    "sci-fi",
    "mystery",
    "martial arts",
    "carton",
    "anime",
    "fantasy"
  ];

  function onChangeForm(event) {
    let { name, value } = event.target;

    if (name === "popularity") {
      value = Number(value);
    }
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleTags(event) {
    let newTag = form.tags;
    if (event.target.checked) {
      console.log(event.target.value);
      newTag.push(event.target.value);
      setForm({
        ...form,
        tags: newTag,
      });
    } else {
      let unCheckTag = newTag.filter((tag) => event.target.value !== tag);
      setForm({
        ...form,
        tags: unCheckTag,
      });
    }
  }

  function typeHandle(event) {
    setType(event.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    if (type === "Movie") {
      addMovie({
        variables: {
          insertMovie: form,
        },
        refetchQueries: ["GetMovies"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Add Movie",
      });
      history.push("/");
    } else if (type === "Series") {
      addSerie({
        variables: {
          insertSerie: form,
        },
        refetchQueries: ["GetSeries"],
      });
      Swal.fire({
        icon: "success",
        title: "Success Add Series",
      });
      history.push("/series");
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Add Movies or Series</h1>
      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Overview</Form.Label>
          <Form.Control
            type="text"
            name="overview"
            placeholder="Overview"
            value={form.overview}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" value={type} onChange={typeHandle}>
            <option>Movie</option>
            <option>Series</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Popularity</Form.Label>
          <Form.Control
            type="number"
            name="popularity"
            placeholder="Popularity"
            value={form.popularity}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Poster Path</Form.Label>
          <Form.Control
            type="text"
            name="poster_path"
            placeholder="Poster Path"
            value={form.poster_path}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <br />
          {category &&
            category.map((tag, index) => (
              <Form.Check
                inline
                key={index}
                label={tag}
                onChange={handleTags}
                value={tag}
              />
            ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddFrom;
