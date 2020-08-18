import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FAV_FILM } from "../config/graphql";
import FilmCard from "../components/FilmCard";

function Favourites() {
  const { data } = useQuery(GET_FAV_FILM);
  return (
    <>
      <h1 className="text-center">List Favourites Film or Series</h1>
      <div className="d-flex flex-wrap container">
        {data?.favFilms.map((film, idx) => (
          <FilmCard key={idx} film={film} action={false} />
        ))}
      </div>
    </>
  );
}

export default Favourites;
