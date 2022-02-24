import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import CardService from "../services/card.service";
import AuthService from "../services/auth.service";
import CreditService from "../services/credit.service";

export default class GetCredit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        CardService.getAllByUser(AuthService.getUserId()).then(res => {
            this.setState({cards: res.data})
        })
    }

    handleAmountChange() {

    }

    render() {
        return (
            <Form>
                <br/>
                <h1>Взять микрозайм</h1>
                <br/>
                <Form.Group as={Col} controlId="formGridState" style={{ width: '25rem' }}>
                    <h5>Выберите карточку</h5>
                    <Form.Select defaultValue="Choose..." id="card">
                        {this.state.cards.map(res => (
                            <option>{res.number.toString().substr(0,4) + "-****-" + res.number.toString().substr(-4)}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <a href="/add-card">Добавить карточку</a>
                <br/>
                <br/>
                <Form.Group as={Col} controlId="formGridState" style={{ width: '25rem' }}>
                    <h5>Выберите процент</h5>
                    <Form.Select defaultValue="2% (на одну неделю)" id="percent">
                            <option value="2">2% (на одну неделю)</option>
                            <option value="5">5% (на один месяц)</option>
                            <option value="10">10% (на пол года)</option>
                    </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group as={Col} controlId="formGridState" style={{ width: '25rem' }}>
                    <h5>Введите сумму</h5>
                    <Form.Control placeholder="100$" id="amount" onChange={this.handleAmountChange}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="button" onClick={() => {
                    let body = {
                        userId: AuthService.getUserId(),
                        amount: document.getElementById("amount").value,
                        percent: document.getElementById("percent").value
                    }
                    CreditService.create(body)
                    this.props.history.push("/profile");
                    window.location.reload();
                }}>
                    Подтвердить
                </Button>
            </Form>
        );
    }
}
