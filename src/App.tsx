import { useEffect, useState } from 'react';
import './css/App.scss';
import InputNote from './components/InputNote';
import Note from './components/Note';
import { Box, Stack, Button } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddIcon from '@mui/icons-material/Add';
import Search from './components/Search';

interface NoteContent {
  title: string;
  content: string;
  tags: string[];
}

function App() {
  const [listNote, setListNote] = useState([] as NoteContent[])
  const [globalTagList, setGlobalTagList] = useState([] as string[])
  const [currentNoteIndex, setIndex] = useState(-2)
  const [searchVisible, setSearchVisible] = useState(false)


  const addNote = (note: NoteContent) => {
    listNote.push(note);
    setListNote(listNote);
    setIndex(listNote.length - 1);
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
          onClick={() => setIndex(-2)}
          className="sidebar-btn">
          <Stack spacing={2} direction="row">
            <AddIcon />
            <p>Add</p>
          </Stack>
        </Button>
        {listNote.map((note: NoteContent, index: number) => {
          return (
            <Button
              className="sidebar-btn"
              onClick={() => setIndex(index)}
              key={index}>
              <Stack spacing={2} direction="row">
                <NoteAltIcon />
                <p>{note.title}</p>
              </Stack>
            </Button>
          )
        })}
      </Box>
      <Box sx={{ padding: "10rem", marginLeft: "250px" }}>
        {currentNoteIndex === -2 ?
          <InputNote
            addNote={addNote}
            previousTags={globalTagList}
            addGlobalTag={addTag}
          /> :
          <Note
            note={listNote[currentNoteIndex]}
            index={currentNoteIndex}
          />
        }
      </Box>
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
