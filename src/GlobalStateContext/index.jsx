import React, { createContext, useReducer } from 'react';

const initialState = {
    rooms: {},
    user: null,
    isLoggedIn: false,
    settings: {
        theme: 'light',
        language: 'en',
    },
};

const GlobalAppContext = createContext(initialState);

const appReducer = (state, action) => {
    switch (action.type) {
        case 'updateRooms':
            return {
                ...state,
                rooms: action.payload
            };
        default:
            return state;
    }
};

let state, dispatch;

const GlobalStateProvider = ({ children }) => {
    [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <GlobalAppContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalAppContext.Provider>
    );
};
class State {
    constructor(useContext) {
        this.data = useContext.state;
        this.dispatch = useContext.dispatch;
    }
    updateRooms(rooms) {
        this.dispatch({ type: 'updateRooms', payload: rooms });
    }
}
export { GlobalAppContext, GlobalStateProvider, State };