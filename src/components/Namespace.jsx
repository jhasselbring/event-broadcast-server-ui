import React, { useEffect, useRef, useContext } from 'react';
import { GlobalAppContext, State } from '../GlobalStateContext';
import { Room } from "./Room";
import { ExplorerIcon } from "./ExplorerIcon";

export const Namespace = props => {
    let state = new State(useContext(GlobalAppContext));
    return (
        <div className="namespace-group">
            <div className="namespace">
                <ExplorerIcon image="folder.png" alt="folder icon" />
                <div className="namespacename">&nbsp;{props.namespace}</div>
            </div>
            {Object.keys(props.namespaceValue).map((room) => (
                <Room RoomValue={state.data.rooms[props.namespace][room]} key={room} room={room} />
            ))}
        </div>
    )
};
