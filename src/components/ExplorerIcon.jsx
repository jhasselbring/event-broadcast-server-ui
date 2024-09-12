export const ExplorerIcon = props => {
    let size = '20px';
    return (
        <>
            <img src={require(`../files/${props.image}`)} alt={props.alt} style={{ width: size, height: size, marginTop: '2px' }} />
        </>
    );
};
