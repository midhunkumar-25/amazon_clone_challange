export const initialState = {
    basket: [],
    homeProducts:[],
    user: null,
    address:[],
  };

// Selector
export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => parseFloat((item.price.slice(1)).replace(",","")) + amount, 0);
  //basket?.reduce((amount, item) => {console.log(item.price.slice(1)); return item.price.slice(1) + amount}, 0);
  
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "ADD_ADDRESS":
        return {
            ...state,
            address: action.item,
          };
      case "CLEAR_ADDRESS":
        return {
            ...state,
            address: null,
          };
      case "ADD_TO_BASKET":
        return {
            ...state,
            basket: [...state.basket, action.item],
          };
      case "ADD_TO_HOME":
        return {
            ...state,
            homeProducts: [...state.homeProducts, action.item],
          };
      case "CLEAR_HOME":
        return {
            ...state,
            homeProducts: [],
          };
      case "ADD_USER":
        return {
            ...state,
            user: action.item,
          };
      case "EMPTY_BASKET":
        return {
            ...state,
            basket: [],
          };
      case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          )
        }
  
        return {
          ...state,
          basket: newBasket
        }
      default:
          return state;
      }
  }
  export default reducer;
