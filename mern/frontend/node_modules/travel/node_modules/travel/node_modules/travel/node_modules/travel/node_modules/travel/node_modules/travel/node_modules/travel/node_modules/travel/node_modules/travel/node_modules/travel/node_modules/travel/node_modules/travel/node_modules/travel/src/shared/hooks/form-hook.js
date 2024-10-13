import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          //if name is set to undefined
          continue; //skip this property don't check isValid on name
        }
        if (inputId === action.inputId) {
          //checking if the input we are currently looking at is the input which is getting updated here in current action, if so I will take information from dispatched action on whether it is valid or not
          formIsValid = formIsValid && action.isValid; //if the input change for given input is valid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid; //stored value
        } //taking the previous value of formIsValid and combining it with new value,   this ensures if one false validity is there overall form validity becomes false
      }
      return {
        ...state,
        inputs: {
          ...state.inputs, //input=current input state
          [action.inputId]: { value: action.value, isValid: action.isValid }, //overriding input state for input we are updating with action
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        //no need to copy just override
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity, //stores whether entire form is valid
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA", //any identifier is possible
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
