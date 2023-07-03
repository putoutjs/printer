class FormLoginContainer extends React.Component {
    constructor() {
        super();
        this.submit = this._submit.bind(this);
    }
    
    submit(event) {
        event.preventDefault();
    }
}

class Hi extends Hello {
    render() {}
}