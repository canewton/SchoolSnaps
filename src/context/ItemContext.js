export class ItemContext {
  static reducer = (state, action) => {
    switch (action.type) {
      case "add":
        //add a new element to the state array
        return [...state, action.payload];
      case "edit":
        //look at the classes one by one and determine if it should be editd by action.payload
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return Object.assign(item, action.payload);
          } else {
            return item;
          }
        });
      case "delete":
        //if the inputted item's id is found, remove that item from the array
        return state.filter((item) => item.id !== action.payload.id);
    }
  };

  static add = (dispatch) => {
    //take the folowing parameters when this function is called
    return (item, callback) => {
      //tell the classes reducer that add class has been called and give it the following props
      dispatch({ type: "add", payload: item });
      //if a callback exists, call it
      if (callback) {
        callback();
      }
    };
  };

  static edit = (dispatch) => {
    //take the folowing parameters when this function is called
    return (item, callback) => {
      //tell the classes reducer that add class has been called and give it the following props
      dispatch({ type: "edit", payload: item });
      //if a callback exists, call it
      if (callback) {
        callback();
      }
    };
  };

  static delete = (dispatch) => {
    //take the folowing parameters when this function is called
    return (item, callback) => {
      //tell the classes reducer that add class has been called and give it the following props
      dispatch({ type: "delete", payload: item });
      //if a callback exists, call it
      if (callback) {
        callback();
      }
    };
  };
}
