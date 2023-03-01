import { useParams } from "react-router";
import PageHeader from "../components/PageHeader";

import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/MovieGrid";

function Catalog() {
  const { category = "" } = useParams();

  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV series"}
      </PageHeader>
      <MovieGrid category={category} />
    </>
  );
}

export default Catalog;
