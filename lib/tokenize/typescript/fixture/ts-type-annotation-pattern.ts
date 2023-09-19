interface Props {
    name: string;
}

function Profile({name}: Props) {
    return (
        <div>
            {name}
        </div>
    );
}