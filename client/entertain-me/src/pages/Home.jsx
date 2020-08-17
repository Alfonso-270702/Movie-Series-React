import React from "react";
import { useQuery, gql } from "@apollo/client";
import FilmCard from "../components/FilmCard";

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

function Home() {
  const { data, error, loading } = useQuery(GET_MOVIES);

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>ERROR</h1>;
  return (
    <>
      <div className="d-flex flex-wrap container">
        {data.movies.map((movie) => (
          <FilmCard key={movie._id} film={movie} type={"Movie"} />
        ))}
      </div>
    </>
  );
}

export default Home;
