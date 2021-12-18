import React from 'react'
import { Typography, Paper } from '@mui/material'
import '../css/Note.scss'

export default function Note(props: any) {
  return (
    <div className="note-content" >
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
    </div>
  )
}
