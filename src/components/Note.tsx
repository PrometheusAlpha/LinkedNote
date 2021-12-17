import React from 'react'
import { Typography } from '@mui/material'
import '../css/Note.scss'

export default function Note(props: any) {
  return (
    <div className="note-content" >
      <Typography variant="h1" className="note-content__title">
        {props.note.title}
      </Typography>
      <p className="note-content__content">{props.note.content}</p>
    </div>
  )
}
