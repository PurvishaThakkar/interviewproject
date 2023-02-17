import React from "react";
import "./styles.css";
import axios from "axios";
import { findDOMNode } from "react-dom";
export default function App() {
  const [data, setData] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      )
      .then((obj: any) => {
        setData(obj.data);
      });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        name="search"
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          console.log(input);
          if (data && Object.keys(data).length) {
            const find = Object.keys(data).filter((item) => item == input);
            console.log(find);

            if (find.length) {
              setFilter(find.toString());
            } else {
              setFilter("NO DATA");
            }
          }
        }}
      >
        search
      </button>
      <br />
      <br />
      {filter === "NO DATA" && (
        <div>
          <h3>NO DATA FOUND!</h3>
        </div>
      )}
      {data && Object.keys(data).length && (
        <table style={{ border: "1px" }}>
          {/* <th>
            <tr>
              <td>curr code</td>
              <td>curr name</td>
            </tr>
          </th> */}

          {filter !== "NO DATA" && input !== "" ? (
            <div>
              {Object.keys(data).map((item, key) => {
                return (
                  <tr>
                    <td>{item == filter ? item : ""}</td>
                    <td>{item == filter ? data[item] : ""}</td>
                  </tr>
                );
              })}
            </div>
          ) : (
            filter !== "NO DATA" && (
              <div>
                {Object.keys(data).map((item, key) => {
                  return (
                    <tr>
                      <td>{item}</td>
                      <td>{data[item]}</td>
                    </tr>
                  );
                })}
              </div>
            )
          )}

          {/* {Object.keys(data).map((item, key) => {
            return (
              <tr>
                <td>{item}</td>
                <td>{data[item]}</td>
              </tr>
            );
          })} */}
        </table>
      )}
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
