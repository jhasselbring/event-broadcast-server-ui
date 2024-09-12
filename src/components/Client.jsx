import { ExplorerIcon } from "./ExplorerIcon";

export const Client = props => {
    return (
        <div className="client-group">
            <div className="client">
                <ExplorerIcon image="user.png" alt="user icon" />
                <div className="clientname">&nbsp;{props.client}</div>
            </div>
        </div>
    )
};
