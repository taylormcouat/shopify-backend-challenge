import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonBar from './components/ButtonBar';
import ItemList from './components/ItemList';
import Header from './components/Header';
import React, { Component, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  useEffect(() => {
    fetch('http://localhost:5000/items')
    .then(response => response.json())
    .then(data => {
      console.log("what");
      setItems(data);
    })
  }, [])

  const [items, setItems] = useState([]);
      function plusOne(id) {
          var index = items.findIndex((item) => item.id === id);
          var item = items[index];
          item.qty++;
          Service.updateItem(item);
          setItems([...items.slice(0, index), item, ...items.slice(index +1)]);
      }
      
      function minusOne(id) {
          var index = items.findIndex((item) => item.id === id);
          var item = items[index];
          if (item.qty < 1) {
              if (window.confirm("Confirm deletion of item")) {
                Service.removeItem(item);
                setItems([...items.slice(0, index), ...items.slice(index +1)]);
              }
          } else {
              item.qty--;
              Service.updateItem(item);
              setItems([...items.slice(0, index), item, ...items.slice(index +1)]);
          }
      }
  
      function deleteItem(id) {
          var index = items.findIndex((item) => item.id === id);
          var item = items[index];
          if (window.confirm("Confirm deletion of " + items[index].name + ".")) {
            Service.removeItem(item);
            setItems([...items.slice(0, index), ...items.slice(index +1)]);
          }
      }

      function editItem(id, name, description, qty) {
          var index = items.findIndex((item) => item.id === id);
          var item = items[index];
          item.name = name;
          item.description = description;
          item.qty = qty;
          Service.updateItem(item);
          setItems([...items.slice(0, index), item, ...items.slice(index +1)]);
      }

      function addNewItem(name, description, qty) {
        var id = uuidv4();
        var data = {id: id, name: name, description: description, qty: qty};
        Service.addItem(data);
        setItems([...items, {id: id, name: name, description: description, qty: qty}]);
      }

      function exportCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name, Description, Quantity" + "\r\n";
        items.forEach(function(item) {
          csvContent += item.name + "," + item.description + "," + item.qty + "\r\n";
        });
        console.log(csvContent);
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inventory_data.csv");
        document.body.appendChild(link);
        link.click();
      }

      var Service = {};
      Service.origin = 'http://localhost:5000'

      Service.getItems = function() {
        return new Promise(function(resolve, reject) {
            var x = new XMLHttpRequest();
    
            x.onload = function () {
                if (x.status == 200) {
                    resolve(JSON.parse(x.responseText));
                } else {
                    reject(new Error(x.responseText));
                }
            }
    
            x.onerror = function() {
                reject(new Error("Error"));
            }
            x.open('get', Service.origin + "/items");
            x.send();
        });
    }

    Service.addItem = function(data) {
      return new Promise(function(resolve, reject) {
        var x = new XMLHttpRequest();
        x.onload = function() {
            if (x.status == 200) {
                resolve(x.responseText);
            } else {
                reject(x.responseText);
            }
        }
        x.onerror = function() {
            reject(new Error("Error"));
        }
        x.open("POST", Service.origin + "/items");
        x.setRequestHeader("Content-type", "application/json");
        x.send(JSON.stringify(data));
    })
    }

    Service.updateItem = function(data) {
      return new Promise(function(resolve, reject) {
        var x = new XMLHttpRequest();
        x.onload = function() {
            if (x.status == 200) {
                resolve(x.responseText);
            } else {
                reject(new Error(x.responseText));
            }
        }
        x.onerror = function() {
            reject(new Error("Error"));
        }
        x.open("PUT", Service.origin + "/items");
        x.setRequestHeader("Content-type", "application/json");
        x.send(JSON.stringify(data));
    })
    }

    Service.removeItem = function(data){
      return new Promise(function(resolve, reject) {
        var x = new XMLHttpRequest();
        x.onload = function() {
            if (x.status == 200) {
                resolve(x.responseText);
            } else {
                reject(new Error(x.responseText));
            }
        }
        x.onerror = function() {
            reject(new Error("Error"));
        }
        x.open("DELETE", Service.origin + "/items");
        x.setRequestHeader("Content-type", "application/json");
        x.send(JSON.stringify(data));
    })
    }
  
  return (
    <div className="app">
      <Header />
      <ButtonBar handleSubmit = {addNewItem} exportCSV = {exportCSV}/>
      <ItemList items = {items} plusOne = {plusOne} minusOne = {minusOne} deleteItem = {deleteItem} handleSubmit = {editItem}/>
    </div>
  );
}

export default App;