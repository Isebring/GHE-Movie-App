import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
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
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieSearch;
