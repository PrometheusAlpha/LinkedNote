import { useEffect, useState } from 'react';
import './css/App.scss';
import InputNote from './components/InputNote';
import Note from './components/Note';
import { Box, Stack, Button } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddIcon from '@mui/icons-material/Add';
import Search from './components/Search';
import SearchIcon from '@mui/icons-material/Search';

interface NoteContent {
  ID: string;
  title: string;
  content: string;
  tags: string[];
  links: string[];
}

function App() {
  const [listNote, setListNote] = useState({} as { [key: string]: NoteContent });
  const [globalTagList, setGlobalTagList] = useState([] as string[])
  const [currentNoteIndex, setIndex] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)

  const addNote = (note: NoteContent) => {
    listNote[note.ID] = note;
    setListNote(listNote);
    setIndex(note.ID);
  }

  const addTag = (tag: string): void => {
    globalTagList.push(tag);
    setGlobalTagList(globalTagList);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === "b" && e.ctrlKey) {
      setSearchVisible(!searchVisible);
    }
    if (e.key === "Escape") {
      setSearchVisible(false);
    }
  });

  return (
    <Box style={{ display: 'flex' }}>
      <Box style={{ width: "250px", height: "100vh", background: "#023E8A", position: "fixed" }}>
        <Button
          onClick={() => setIndex("")}
          className="sidebar-btn">
          <Stack spacing={2} direction="row">
            <AddIcon />
            <p>Add</p>
          </Stack>
        </Button>
        {Object.keys(listNote).map((key: string) => {
          return (
            <Button
              className={"sidebar-btn" + (listNote[key].ID === currentNoteIndex ? ' sidebar-btn-active' : '')}
              onClick={() => setIndex(listNote[key].ID)}
              key={key}>
              <Stack spacing={2} direction="row">
                <NoteAltIcon />
                <p>{listNote[key].title}</p>
              </Stack>
            </Button>
          )
        })}
      </Box>
      <Box sx={{ padding: "10rem", marginLeft: "250px" }}>
        {currentNoteIndex === "" ?
          <InputNote
            addNote={addNote}
            previousTags={globalTagList}
            addGlobalTag={addTag}
            listID={Object.keys(listNote)}
          /> :
          <Note
            listNote={listNote}
            note={listNote[currentNoteIndex]}
            index={currentNoteIndex}
            setIndex={setIndex}
          />
        }
      </Box>
      <Stack
        className="search-btn"
        direction="row"
        spacing={8}
        onClick={() => setSearchVisible(true)}>
        <p className="search-btn__text">
          <SearchIcon />
          Search...
        </p>
        <Button
          variant="outlined"
          style={{}}
          disabled={true}
          className='search-btn__key'>
          Ctrl+B
        </Button>
      </Stack>
      {searchVisible &&
        <Search
          listNote={listNote}
          setIndex={setIndex}
          setSearchVisible={setSearchVisible}
        />}
    </Box>
  );
}

export default App;
