import { Client } from "./Client";
import { ExplorerIcon } from "./ExplorerIcon";

export const Room = props => {
    return (
        <div className="room-group">
            <div className="room">
                <ExplorerIcon image="file.png" alt="file icon" />
                <div className="roomname">&nbsp;{props.room}</div>
            </div>
            {props.RoomValue.map(client => <Client client={client} key={client} />)}
        </div>
    )
};
