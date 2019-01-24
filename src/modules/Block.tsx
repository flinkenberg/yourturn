import React, { useState } from "react";
import BlockStyles from "../styles/Block.module.css";
import { Person } from "../people";

export interface BlockProps {
  index: number;
  person: Person;
  markAsComplete: (id: number) => void;
  markAsAbsent?: (id: number) => void;
}

function Block(props: BlockProps) {
  const initialState = {
    isInfoOpen: false
  };
  const [state, setState] = useState(initialState);
  const { index, person, markAsComplete, markAsAbsent } = props;
  function toggleInfo() {
    setState({ isInfoOpen: !state.isInfoOpen });
  }
  return (
    <div
      className={`${BlockStyles.block_single} ${
        index === 0
          ? BlockStyles.block_single_one
          : BlockStyles.block_single_two
      }`}
    >
      {/* {index === 0 && <button onClick={toggleInfo}>i</button>} */}
      {state.isInfoOpen ? (
        <div>
          <h3>Last:</h3>
          <p>{person.last}</p>
        </div>
      ) : (
        <>
          {index === 1 && <h3>Then:</h3>}
          {index === 0 && <h3>Next:</h3>}
          <div onClick={() => markAsComplete(person.id)}>{person.name}</div>
          {index === 0 && (
            <div className={BlockStyles.block_single_coffee_counter}>
              ☕{` x ${person.score}`}
            </div>
          )}
          {markAsAbsent && (
            <button onClick={() => markAsAbsent(person.id)}>X</button>
          )}
        </>
      )}
    </div>
  );
}

export default Block;
