import React from 'react'
import { Typography, Paper } from '@mui/material'
import '../css/Note.scss'

export default function Note(props: any) {
  return (
    <div className="note-content" >
      <p className="note-content__id">Note tag: #{props.note.ID}</p>
      <Typography variant="h1" className="note-content__title">
        {props.note.title}
      </Typography>
      {props.note.tags.map((tag: string, index: number) => {
        return (
          <Paper
            className="global-tag-btn"
            key={index}
          >
            {tag}
          </Paper>
        )
      })}
      <p className="note-content__content">{props.note.content}</p>
      {props.note.links.map((ID: string, index: number) => {
        return (
          <Paper
            className="link-btn"
            key={ID}
            onClick={() => props.setIndex(ID)}
          >
            {props.listNote[ID].title}
          </Paper>
        )
      })}
    </div>
  )
}
