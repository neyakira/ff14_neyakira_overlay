import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}


let searchParams = parse_query_string(window.location.search.substr(1));
let onlyme = searchParams["onlyme"] == 1 ? true : false;
let noHeal = searchParams["noheal"] == 1 ? true : false;
let test = searchParams["test"] == 1 ? true : false;

ReactDOM.render(
  <App opt={{onlyMe:onlyme,noHeal:noHeal,test:test}}/>,
  document.getElementById('root')
);
