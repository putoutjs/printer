const React = require('react');
const {useState} = React;

module.exports = FormLoginContainer;

function FormLoginContainer(props) {
    const [loading, setLoading] = useState(false);
    
    function onClick() {
        setLoading(true);
    }
    
    return (
        <FormLogin
            onClick={onClick}
            loading={loading}
        />
    );
}
