import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
function App() {
  const [people, updatePeople] = useState([]);
  const [searchString, updateSearchString] = useState("");
  const [searchData, updateSearchData] = useState([]);
  async function callApi() {
    try {
      const peopleData = await API.get("mainappapi", "/people");
      console.log("peopleData:", peopleData);
      updatePeople(peopleData.people);

      // const coinData = await API.get("mainappapi", "/coins");
      // console.log("coinData:", coinData);
    } catch (err) {
      console.log({ err });
    }
  }
  // useEffect(() => {
  //   callApi();
  // }, []);
  async function search() {
    try {
      const searchData = await API.post("mainappapi", "/jobs", {
        body: { search: searchString }
      });
      console.log("searchData:", searchData);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className="App">
      <h1>Hello world</h1>
      <input onChange={e => updateSearchString(e.target.value)} />
      <button onClick={search}>Search</button>
      {searchData.map((j, i) => (
        <div>
          <h2>{j.title}</h2>
          <p>{j.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
// export default withAuthenticator(App);
