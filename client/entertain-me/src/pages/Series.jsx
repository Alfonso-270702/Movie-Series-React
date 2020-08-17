import React from "react";
import { useQuery, gql } from "@apollo/client";
import FilmCard from "../components/FilmCard";

const GET_SERIES = gql`
  query GetSeries {
    serie {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

function Series() {
  const { data, error, loading } = useQuery(GET_SERIES);

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>ERROR</h1>;
  return (
    <>
      <div className="d-flex flex-wrap container">
        {data.serie.map((serie) => (
          <FilmCard key={serie._id} film={serie} type={"Series"} />
        ))}
      </div>
    </>
  );
}

export default Series;
