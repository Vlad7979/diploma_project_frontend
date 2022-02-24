import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import AuthService from "../services/auth.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: AuthService.getUser()
        };
    }

    componentDidMount() {

    }

    render() {
        const {user} = this.state;

        return (
            <Card style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title>Оформить микрозайм</Card.Title>
                    <Card.Text>
                        Здесь вы можете перейти и оформить микрозайм с удобными для Вас сроками и процентом.
                    </Card.Text>

                    {user ? (
                        <Button size="lg" variant="primary" href="/get-credit" >Оформить</Button>
                    ) : (
                        <h4>Пожалуйста, войдите в учетную запись либо зарегистрируйтесь</h4>
                        )}
                </Card.Body>
            </Card>
        );
    }
}
