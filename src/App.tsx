import React, { useState } from "react";
import { usePeople, Person } from "./people";
import AppStyles from "./styles/App.module.css";
import AbsentStyles from "./styles/Absent.module.css";
import Block from "./modules/Block";

function App() {
  const initialState: number[] = [];
  const [people, addPerson, markAsComplete] = usePeople();
  const [absent, setAbsent] = useState(initialState);
  function getInputValue(e: any) {
    if (e) e.preventDefault();
    const [input] = e.currentTarget.children;
    addPerson(input.value);
  }
  function addAbsent(id: number) {
    if (!absent.includes(id)) setAbsent([...absent, id]);
  }
  function removeAbsent(id: number) {
    if (absent.includes(id))
      setAbsent([...absent.filter((idd: number) => id !== idd)]);
  }
  return (
    <div>
      <div className={AppStyles.app_wrap}>
        {people
          .filter((p: Person, i: number) => !absent.includes(p.id))
          .map((p: Person, i: number) => {
            if (i === 0) {
              return (
                <Block
                  index={i}
                  person={p}
                  markAsComplete={markAsComplete}
                  markAsAbsent={
                    absent.length < people.length - 1 ? addAbsent : undefined
                  }
                />
              );
            } else if (i === 1) {
              return (
                <Block index={i} person={p} markAsComplete={markAsComplete} />
              );
            } else return null;
          })}
        <div />
      </div>
      <div className={AbsentStyles.absent_wrap}>
        {absent.map((id: number) => {
          const person = people.find(p => p.id === id);
          return (
            <div
              onClick={() => removeAbsent(id)}
              className={AbsentStyles.absent_single}
            >
              {person ? person.name : null}
            </div>
          );
        })}
      </div>
      <form onSubmit={getInputValue}>
        <input type="text" />
      </form>
    </div>
  );
}

export default App;
