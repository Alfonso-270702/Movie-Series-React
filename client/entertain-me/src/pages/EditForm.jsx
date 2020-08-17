import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const EDIT_MOVIE = gql`
  mutation EditMovie($id: String, $movie: editMovie) {
    editMovie(id: $id, movie: $movie) {
      msg
    }
  }
`;

const EDIT_SERIE = gql`
  mutation EditSerie($id: String, $series: editSeries) {
    editSeries(id: $id, series: $series) {
      msg
    }
  }
`;

function EditForm() {
  const location = useLocation();
  const {
    id,
    title,
    overview,
    poster_path,
    popularity,
    tags,
    type,
  } = location.state;

  const history = useHistory();

  const [form, setForm] = useState({
    title: title,
    overview: overview,
    popularity: popularity,
    poster_path: poster_path,
    tags: tags,
  });

  const [typeEdit, setTypeEdit] = useState(type);

  const [editMovie] = useMutation(EDIT_MOVIE);
  const [editSeries] = useMutation(EDIT_SERIE);

  const category = [
    "action",
    "comedy",
    "horror",
    "thriller",
    "romance",
    "drama",
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
    if (event.target.checked) {
      let temp = JSON.parse(JSON.stringify(form.tags));
      temp.push(event.target.value);
      setForm({
        ...form,
        tags: temp,
      });
    } else {
      let temp = JSON.parse(JSON.stringify(form.tags));
      temp = temp.filter((tag) => tag !== event.target.value);
      setForm({
        ...form,
        tags: temp,
      });
    }
  }

  function typeHandle(event) {
    setTypeEdit(event.target.value);
  }

  function checkStatus(event) {
    event.preventDefault();
    submitForm();
  }

  function submitForm() {
    if (type === "Movie") {
      editMovie({
        variables: {
          id,
          movie: form,
        },
        refetchQueries: ["GetMovies"],
      });

      history.push("/");
    } else if (type === "Series") {
      editSeries({
        variables: {
          id,
          series: form,
        },
        refetchQueries: ["GetSeries"],
      });

      history.push("/series");
    }
  }

  return (
    <div className="container">
      <Form onSubmit={checkStatus}>
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
          <Form.Control as="select" value={typeEdit} onChange={typeHandle}>
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
          {category &&
            category.map((tag, index) => (
              <Form.Check
                key={index}
                label={tag}
                onChange={handleTags}
                value={tag}
                checked={form.tags.includes(tag)}
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

export default EditForm;
