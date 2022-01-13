import React, { Component, useState } from 'react';
import '../App.css'
import IconButton from './IconButton.js'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditModal from './EditModal.js'

function ItemList(props) {
    var items = props.items;
      return (
        <table className="item-list">
            <tbody>
            <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Edit</th>
            </tr>
          {items.map((item) => (
              <tr key={item.id} className="item">
                  <td style={{fontWeight: 'bold'}}>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>
                      <IconButton icon = {faTrashAlt} id = {item.id} func = {props.deleteItem}/>
                      <EditModal  item = {item} handleSubmit = {props.handleSubmit} />
                      <IconButton icon = {faPlus} id = {item.id} func = {props.plusOne}/>
                      <IconButton icon = {faMinus} id = {item.id} func = {props.minusOne}/>

                  </td>
              </tr>
          ))}
          </tbody>
      </table>
      )
}

export default ItemList;