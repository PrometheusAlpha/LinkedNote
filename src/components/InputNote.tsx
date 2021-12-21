import Button from '@mui/material/Button';
import "../css/InputNote.scss";
import { Input, TextareaAutosize, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';

function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export default function InputNote(props: any) {

  const [tags, setTags] = useState([] as string[]);
  const [links, setLinks] = useState([] as string[]);

  const addContentToNote = () => {
    const title = (document.querySelector('#input-title') as HTMLInputElement).value;
    const content = (document.querySelector('#input-content') as HTMLInputElement).value;
    if (title === "" || content === "") {
      return;
    }
    props.addNote({ ID: makeid(8), title: title, content: content, tags: tags, links: links });
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

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  }

  const removeLink = (link: string) => {
    links.filter(value => value !== link);
    setLinks(links);
  }

  const addLink = (e: any) => {
    if (e.key !== "Enter") { return; }
    const link = (document.querySelector('#input-link') as HTMLInputElement).value;
    if (link === "" || !(props.listID.includes(link))) {
      console.log(props.listID)
      return;
    }
    setLinks([...links, link]);
    (document.querySelector('#input-link') as HTMLInputElement).value = "";
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
        // minRows={3}
        id="input-content"
        style={{ maxWidth: "60ch", minHeight: "3rem" }}
        autoComplete='off'
      />
      <br />
      {props.previousTags.map((tag: string, index: number) => {
        return (
          <Paper
            className="global-tag-btn"
            key={index}
            onClick={() => addTagFromGlobal(tag)}
            style={{ cursor: "pointer" }}
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
            <IconButton onClick={() => removeTag(tag)}>
              <ClearIcon />
            </IconButton>
          </Paper>
        )
      })}
      <br />
      <Input
        placeholder="Link tag... (press Enter to add)"
        className="note-input"
        id="input-link"
        autoComplete='off'
        onKeyDown={addLink}
      />
      <br />
      {links.map((ID: string, index: number) => {
        return (
          <Paper
            className="tags-btn"
            key={ID}
          >
            {ID}
            <IconButton onClick={() => removeLink(ID)}>
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
