import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import FilledButton from "./Button";
import Input from "./Input";

interface Props {
  category: string;
  keyword?: string;
}

function MovieSearch(props: Props) {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (keyword.trim().length > 0) {
        navigate(`/${props.category}/search/${keyword}`);
        setKeyword("");
      }
    },
    [keyword, props.category, navigate]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    []
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={handleInputChange}
      />
      <FilledButton onClick={handleSubmit}>Search</FilledButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  gap: 0.8rem;
  text-align: center;

  input {
    color: #fff;
    height: 3.15rem;
    background: rgba(0, 0, 0, 0.5);
    border: rgba(160, 156, 156, 0.5);
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    max-width: 12rem;
  }

  @media screen and (max-width: 380px) {
    flex-direction: column;

    input {
      max-width: 100%;
      align-items: center;
      justify-items: center;
      place-items: center;
      text-align: center;
    }
  }
`;

export default MovieSearch;
