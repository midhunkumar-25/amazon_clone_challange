import React, { createContext, useContext, useReducer,useEffect } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => { 

  /*,()=>{
    const localData= localStorage.getItem("user")
    return localData ?  {
      basket: [],
      homeProducts:[],
      user: JSON.parse(localData)
    } : initialState
  });
  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user)) 
  }, [user])*/
  return(

  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);