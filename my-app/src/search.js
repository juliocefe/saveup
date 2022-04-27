import React from "react";
import { directive } from "@babel/types";

import "./styles/search.css";

const Search = () => {
  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          name=""
          value={this.name}
          className=""
          placeholder="Search some products"
        />
        <ul className="list">
          <li>Jabon</li>
          <li>Jamón</li>
          <li>Jarabe</li>
          <li>Jaiba</li>
          <li>Jicama 2x1</li>
          <li>Jengibre</li>
          <li>Jabon</li>
          <li>Jamón</li>
        </ul>
      </div>
      <button className="btn btn-success">+</button>
    </div>
  );
};

export default Search;
