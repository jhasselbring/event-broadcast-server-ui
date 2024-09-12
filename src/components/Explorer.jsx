import React, { useEffect, useRef, useContext } from 'react';
import { GlobalAppContext, State } from '../GlobalStateContext';
import { Namespace } from "./Namespace";

export const Explorer = props => {
    let state = new State(useContext(GlobalAppContext));
    const ws = useRef(null);

    const connectWebSocket = () => {
        ws.current = new WebSocket('wss://broadcast.toolbox.plus/admin/rooms');

        ws.current.onmessage = (event) => {
            state.updateRooms(JSON.parse(event.data));
        };
        ws.current.onclose = () => {
            console.log('WebSocket closed');
            // Reconnect after a delay
            setTimeout(() => {
                console.log('Reconnecting...');
                connectWebSocket();
            }, 3000); // 3 seconds delay before reconnecting
        };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log('Using useEffect');
        connectWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <>
            {Object.keys(state.data.rooms).map((namespace) => (
                <Namespace namespaceValue={state.data.rooms[namespace]} key={namespace} namespace={namespace} />
            ))}
        </>
    )
}

export default Explorer;