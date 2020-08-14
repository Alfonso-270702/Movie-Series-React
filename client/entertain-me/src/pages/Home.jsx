import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import MovieCard from "../components/MovieCard";
import { Button } from "react-bootstrap";
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const ADD_MOVIES = gql`
  mutation AddMovies($insertMovie: newMovie) {
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

function Home() {
  const { data, error, loading, refetch } = useQuery(GET_MOVIES);
  const [addMovie, { data: newMovieData }] = useMutation(ADD_MOVIES);
  const [form, setForm] = useState({
    title: "",
    overview: "",
    popularity: "",
    poster_path: "",
    tags: "",
  });

  function onChangeForm(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }
  function submitForm(event) {
    event.preventDefault();
    addMovie({
      variables: {
        inputMovie: form,
      },
    });
    refetch();
  }

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>ERROR</h1>;
  return (
    <>
      <h1>Hello world</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChangeForm}
        />
        <input
          type="text"
          name="overview"
          placeholder="Overview"
          value={form.overview}
          onChange={onChangeForm}
        />
        <input
          type="text"
          name="popularity"
          placeholder="Popularity"
          value={form.popularity}
          onChange={onChangeForm}
        />
        <input
          type="text"
          name="poster_path"
          placeholder="Poster Path"
          value={form.poster_path}
          onChange={onChangeForm}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={form.tags}
          onChange={onChangeForm}
        />
        <Button type="submit"> Add movie</Button>
      </form>
      <div className="d-flex flex-wrap container">
        {data.movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Home;
