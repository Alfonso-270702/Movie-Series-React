import React from "react";
import { useQuery, gql } from "@apollo/client";
import FilmCard from "../components/FilmCard";
import { Spinner } from "react-bootstrap";

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

  if (loading)
    return (
      <div className="container d-flex justify-content-center mt-4">
        <Spinner
          style={{ width: "300px", height: "300px" }}
          animation="border"
        />
        ;
      </div>
    );
  if (error) return <h1>ERROR</h1>;
  return (
    <>
      <h1 className="text-center mt-4">Series List</h1>
      <div className="d-flex flex-wrap container">
        {data.serie.map((serie) => (
          <FilmCard
            key={serie._id}
            film={serie}
            type={"Series"}
            action={true}
          />
        ))}
      </div>
    </>
  );
}

export default Series;
