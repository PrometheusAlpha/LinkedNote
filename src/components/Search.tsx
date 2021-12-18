import React, { useState } from 'react';
import { Box, Button, InputBase, Stack, Divider } from '@mui/material';
import Fuse from 'fuse.js';
import "../css/Search.scss";
import SearchIcon from '@mui/icons-material/Search';
import NoteIcon from '@mui/icons-material/Note';

export default function Search(props: any) {
  const [searchResult, setSearchResult] = useState([] as any[]);

  const fullScreen = {
    inset: "0",
    position: "absolute",
    display: "flex",
  } as React.CSSProperties;
  const fullScreenOpaque = {
    inset: "0",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: "2rem",
  } as React.CSSProperties;

  const options = {
    shouldSort: true,
    keys: ['title', 'content', 'tags'],
  };

  const searchEngine = new Fuse(props.listNote, options);

  const searchResultClick = (index: number) => {
    props.setIndex(index);
    props.setSearchVisible(false);
  }

  const search = (e: any) => {
    setSearchResult(searchEngine.search((e.target as HTMLInputElement).value));
  }

  return (
    <>
      <Box style={fullScreenOpaque}>
        <Box style={fullScreen} onClick={() => props.setSearchVisible(false)}>
        </Box>
        <Stack className="search">
          <Stack direction="row" style={{ alignItems: "center" }} className="search__input">
            <SearchIcon className="search__input__icon" />
            <InputBase placeholder='Search... ' onChange={search} />
          </Stack>
          <Divider />
          <Stack className="search-result">
            {searchResult.map((note: any, index: number) => {
              return (
                <Button
                  variant="outlined"
                  style={{ cursor: "pointer" }}
                  onClick={() => searchResultClick(note.refIndex)}
                  className="search-result__btn"
                >
                  <NoteIcon />
                  {note.item.title}
                </Button>
              )
            })}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
