import React, { useState } from "react";

export default function useForm(initialState) {
  const [state, setState] = useState(initialState);
  function updateState(event) {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  return { state, updateState };
}
