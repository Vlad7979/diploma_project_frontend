import React, {Component} from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import CardService from "../services/card.service";
import AuthService from "../services/auth.service";
import CreditService from "../services/credit.service";
import PaymentService from "../services/payment.service";

export default class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            content: [],
            mainDebt: 0
        };
    }

    componentDidMount() {
        CardService.getAllByUser(AuthService.getUserId()).then(res => {
            this.setState({cards: res.data})
        })
        PaymentService.getByCreditId(localStorage.getItem('creditId')).then(res => {
            this.setState({content: res.data})
        })
        CreditService.getMainDebt(localStorage.getItem('creditId')).then(res => {
            this.setState({mainDebt: res.data})
        })
    }

    handleAmountChange() {

    }

    render() {
        return (
            <Form>
                <br/>
                <h1>Проведенные оплаты по данному микрозайму</h1>
                <br/>
                <Table striped bordered hover variant="light">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата оплаты</th>
                        <th>Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.content.map(r => {
                        return (
                            <tr>
                                <th>{r.id}</th>
                                <th>{r.receivedDate}</th>
                                <th>{r.amount}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <br/>
                <h3><i>Сумма, которую осталось выплатить по данному микрозайму: {this.state.mainDebt}</i></h3>
                <br/>
                <br/>
                <h1>Оплатить микрозайм</h1>
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
                    <h5>Введите сумму</h5>
                    <Form.Control placeholder={this.state.mainDebt} id="amount" onChange={this.handleAmountChange}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="button" onClick={() => {
                    let body = {
                        creditId: localStorage.getItem('creditId'),
                        amount: document.getElementById("amount").value
                    }
                    PaymentService.create(body)
                    this.props.history.push("/profile");
                    window.location.reload();
                }}>
                    Оплатить
                </Button>
            </Form>
        );
    }
}
