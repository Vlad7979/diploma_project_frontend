import React, {Component} from "react";
import {Button} from "react-bootstrap";
import AuthService from "../services/auth.service";

export default class InfoRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumber: ""
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <br/>
                <h3>Далее мы хотим получить немного информации о Вас!</h3>
                <br/>
                <Button onClick={() => {
                    AuthService.login(localStorage.getItem('username'), localStorage.getItem('password')).then(() => {
                        this.props.history.push("/second-registration");
                        window.location.reload();
                    })
                }}>Подтвердить</Button>
            </div>
        );
    }
}
