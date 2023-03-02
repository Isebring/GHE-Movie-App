import { useParams } from "react-router";
import PageHeader from "../components/PageHeader";

import { useState } from "react";
import styled from "styled-components";
import { category as cate } from "../api/tmdbApi";
import FilledButton from "../components/Button";
import MovieGrid from "../components/MovieGrid";

function Catalog() {
  const { category = "" } = useParams();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Attach event listener to the window to detect scrolling
  window.addEventListener("scroll", handleScroll);
  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV series"}
      </PageHeader>
      <MovieGrid category={category} />
      <BackToTopWrapper>
        <FilledButton onClick={handleBackToTop}>Back to Top</FilledButton>
      </BackToTopWrapper>
    </>
  );
}

const BackToTopWrapper = styled.div`
  position: fixed;
  bottom: 2.5rem;
  right: 2rem;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export default Catalog;
