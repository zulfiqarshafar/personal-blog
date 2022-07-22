import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  // Bisa dimasukkan reducer
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== "") {
      navigate({
        pathname: "/search",
        search: createSearchParams({
          q: searchTerm,
        }).toString(),
      });
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        m: 1,
        width: "100%",
      }}
      onSubmit={handleSubmit}
    >
      <FormControl
        sx={{
          width: "100%",
        }}
        variant="outlined"
      >
        <OutlinedInput
          size="small"
          placeholder="Search post"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit} edge="end" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default Search;
