import React, { Component } from 'react';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton.js'
import AddModal from './AddModal.js'

function ButtonBar(props) {
  return (
    <div>
      <IconButton icon = {faFileDownload} func = {props.exportCSV}/>
      <AddModal icon = {faFileDownload} handleSubmit = {props.handleSubmit}/>
    </div>
  )
}

export default ButtonBar;