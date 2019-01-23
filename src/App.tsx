import React from "react";
import { usePeople } from "./hooks";

function SuperAdmin() {
  const [people, addPerson, markAsComplete] = usePeople();
  function getInputValue(e: any) {
    if (e) e.preventDefault();
    const [input] = e.currentTarget.children;
    addPerson(input.value);
  }
  const styles = {
    display: "grid",
    gridGap: "1rem",
    padding: "2rem",
    border: "1px solid",
    cursor: "pointer"
  };
  return (
    <div style={{ padding: "0 2rem" }}>
      <section>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridGap: "1rem",
            gridAutoColumns: "max-content"
          }}
        >
          {/* {people.map(p => (
              <div onClick={() => markAsComplete(p.id)} style={styles}>
                <h1>{p.name}</h1>
                <h2>{p.score}</h2>
                <code style={{ color: "darkblue", background: "lightblue", padding: "1rem", maxWidth: "5rem" }}>
                  {JSON.stringify(p, null, 2)}
                </code>
              </div>
            ))} */}
          {people.length > 1 && (
            <>
              {people.length > 2 && (
                <div
                  onClick={() => markAsComplete(people[people.length - 1].id)}
                  style={styles}
                >
                  <h1>{people[people.length - 1].name}</h1>
                  <h2>{people[people.length - 1].score}</h2>
                  <code
                    style={{
                      color: "darkblue",
                      background: "lightblue",
                      padding: "1rem",
                      maxWidth: "5rem"
                    }}
                  >
                    {JSON.stringify(people[people.length - 1], null, 2)}
                  </code>
                </div>
              )}
              <div style={{ border: "1px solid blue" }}>
                <div
                  onClick={() => markAsComplete(people[0].id)}
                  style={styles}
                >
                  <h1>{people[0].name}</h1>
                  <h2>{people[0].score}</h2>
                  <code
                    style={{
                      color: "darkblue",
                      background: "lightblue",
                      padding: "1rem",
                      maxWidth: "5rem"
                    }}
                  >
                    {JSON.stringify(people[0], null, 2)}
                  </code>
                </div>
              </div>

              <div onClick={() => markAsComplete(people[1].id)} style={styles}>
                <h1>{people[1].name}</h1>
                <h2>{people[1].score}</h2>
                <code
                  style={{
                    color: "darkblue",
                    background: "lightblue",
                    padding: "1rem",
                    maxWidth: "5rem"
                  }}
                >
                  {JSON.stringify(people[1], null, 2)}
                </code>
              </div>
            </>
          )}
        </div>
        <form onSubmit={getInputValue}>
          <input type="text" />
        </form>
      </section>
    </div>
  );
}

export default SuperAdmin;
