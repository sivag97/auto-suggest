import React from "react";
import starWarsNames from "starwars-names";

const allItems = starWarsNames.all.map(s => ({ name: s, id: s.toLowerCase() }));

export function getItems(inputValue) {
  return inputValue
    ? allItems.filter(({ name }) =>
        name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : allItems;
}

export function getStringItems(filter) {
  return getItems(filter).map(({ name }) => name);
}

export function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  );
}
