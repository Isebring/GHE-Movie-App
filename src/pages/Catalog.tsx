import { useParams } from "react-router";
import PageHeader from "../components/PageHeader";

import { category as cate } from "../api/tmdbApi";

function Catalog() {
  const { category } = useParams();

  console.log(category);

  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV series"}
      </PageHeader>
    </>
  );
}

export default Catalog;
