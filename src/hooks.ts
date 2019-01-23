import { useState } from "react";

export interface Person {
  id: number;
  name: string;
  score: number;
  gen: number;
  last: number;
}

export type UsePeople = [
  Person[],
  (name: string) => void,
  (id: number) => void
];

export function usePeople(): UsePeople {
  const initialState: { people: Person[] } = {
    people: []
  };
  const [state, setState] = useState(initialState);
  function sortPeople(people: Person[]) {
    return people.sort((a: Person, b: Person) => {
      if (a.gen < b.gen) return -1;
      if (a.gen > b.gen) return 1;
      if (a.gen === b.gen && a.id < b.id) return -1;
      if (a.gen === b.gen && a.id > b.id) return 1;
      return 0;
    });
  }
  function markAsComplete(id: number) {
    const newPeople = state.people.map((p: Person) => {
      if (p.id === id) {
        p.gen++;
        p.last = Date.now();
        p.score++;
      }
      return p;
    });
    setState({
      ...state,
      people: sortPeople(newPeople)
    });
  }
  function addPerson(name: string) {
    if (state.people.find(p => p.name === name)) return;
    const newPerson = {
      id: Date.now(),
      name,
      score: 0,
      last: 0,
      gen: state.people.reduce(
        (prev: number, b: Person) => Math.max(prev, b.gen),
        1
      )
    };
    setState({
      ...state,
      people: sortPeople([...state.people, newPerson])
    });
  }
  return [state.people, addPerson, markAsComplete] as UsePeople;
}
