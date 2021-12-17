import Button from '@mui/material/Button';
import "../css/InputNote.scss";
import { Input, TextareaAutosize, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';


export default function InputNote(props: any) {

  const [tags, setTags] = useState([] as string[]);

  const addContentToNote = () => {
    const title = (document.querySelector('#input-title') as HTMLInputElement).value;
    const content = (document.querySelector('#input-content') as HTMLInputElement).value;
    if (title === "" || content === "") {
      return;
    }
    props.addNote({ title: title, content: content });
  }

  const addTag = (e: any) => {
    if (e.key !== "Enter") { return; }
    const tag = (document.querySelector('#input-tag') as HTMLInputElement).value;
    if (tag === "") {
      return;
    }
    setTags([...tags, tag]);
    props.addGlobalTag(tag);
    (document.querySelector('#input-tag') as HTMLInputElement).value = "";
  }

  const addTagFromGlobal = (tag: string) => {
    if (tags.includes(tag)) { return; }
    setTags([...tags, tag]);
  }

  return (
    <>
      <Input
        placeholder="Title"
        className="note-input"
        id="input-title"
        autoComplete='off'
      />
      <TextareaAutosize
        placeholder="New idea starts here..."
        className="note-input"
        minRows={12}
        id="input-content"
        autoComplete='off'
      />
      {props.previousTags.map((tag: string, index: number) => {
        return (
          <Paper
            className="global-tag-btn"
            key={index}
            onClick={() => addTagFromGlobal(tag)}
          >
            {tag}
          </Paper>
        )
      })}
      <br />
      <Input
        placeholder="Tags... (press Enter to add)"
        className="note-input"
        id="input-tag"
        autoComplete='off'
        onKeyDown={addTag}
      />
      <br />
      {tags.map((tag: string, index: number) => {
        return (
          <Paper
            className="tags-btn"
            key={index}
          >
            {tag}
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Paper>
        )
      })}
      <br />
      <Button
        variant="contained"
        onClick={addContentToNote}
        style={{ marginTop: "2rem" }}
      >
        <AddIcon />
        Add
      </Button>
    </>
  )
}
