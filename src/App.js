import "./styles.css";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import data from "./data.json";
import { useEffect, useState } from "react";

const mock = new MockAdapter(axios);

mock.onGet("/programs").reply(200, data);

export default function App() {
  const [programs, setPrograms] = useState();

  useEffect(() => {
    try {
      (async () => {
        await axios
          .get("/programs")
          .then(({ data }) => {
            const { programs } = data;
            const newPrograms = programs.filter((p) => {
              console.log(Object.values(p)[0]);
              return Object.values(p)[0] !== "";
            });
            setPrograms(newPrograms);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } catch (error) {}
  }, []);

  console.log(Array.isArray(programs));
  console.log(programs);

  return (
    <div className="App">
      {programs &&
        programs.map((p, idx) => {
          console.log(p);
          return <p key={p.title + idx}>{p.title}</p>;
        })}
    </div>
  );
}

/*

*/
