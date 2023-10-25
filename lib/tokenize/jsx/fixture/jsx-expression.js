function NoParens(props) {
    return (
        <dl>
            {props.items.map((item) =>
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            )}
        </dl>
    );
}

function Parens(props) {
    return (
        <dl>
            {props.items.map((item) => (
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}