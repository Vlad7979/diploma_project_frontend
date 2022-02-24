import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import CardService from "../services/card.service";
import AuthService from "../services/auth.service";

export default class AddCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumber: "",
            fullName: "",
            cvc: "",
            message: ""
        };
    }

    handleNumberChange = event => {
        this.setState({cardNumber: event.target.value});
    }

    handleCvcChange = event => {
        this.setState({cvc: event.target.value});
    }

    handleFullNameChange = event => {
        this.setState({fullName: event.target.value});
    }

    componentDidMount() {

    }

    render() {
        return (
            <Form>
                <br/>
                <h1>Добавить карточку</h1>
                <br/>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{ width: '25rem' }}>
                    <h5>Введите номер карты</h5>
                    <Form.Control placeholder="1234567812345678" id="number" onChange={this.handleNumberChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{ width: '25rem' }}>
                    <h5>Введите полное имя владельца карты</h5>
                    <Form.Control placeholder="IVAN IVANOV" id="fullName" onChange={this.handleFullNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{ width: '25rem' }}>
                    <h5>Введите CVC</h5>
                    <Form.Control placeholder="123" id="cvc" onChange={this.handleCvcChange}/>
                </Form.Group>
                {this.state.message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}
                <br/>

                <Button variant="primary" type="button" onClick={() => {
                    if (this.state.cardNumber.length === 16 && this.state.cvc.length === 3) {
                        let body = {
                            number: document.getElementById("number").value,
                            fullName: document.getElementById("fullName").value,
                            cvc: document.getElementById("cvc").value,
                            userId: AuthService.getUserId()
                        }
                        CardService.create(body)
                        this.props.history.push("/get-credit");
                        window.location.reload();
                    } else {
                        this.setState({message: "Вы ввели неправильные данные. Номер карты должен состоять из 16 цифр. CVC-код должен состоять из 3 цифр"})
                    }
                }}>
                    Добавить
                </Button>
            </Form>
        );
    }
}
