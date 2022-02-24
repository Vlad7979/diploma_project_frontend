import React, {Component} from "react";
import AuthService from "../services/auth.service";
import {Button, Image, Table} from "react-bootstrap";
import block from "./images/block.png"
import unlock from "./images/unlock.png"
import UserService from "../services/user.service";
import CreditService from "../services/credit.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {username: ""},
            currentUser: {username: ""},
            content: []
        };
    }

    componentDidMount() {
        const user = AuthService.getUser();
        const currentUser = AuthService.getCurrentUser();
        CreditService.getByUser(AuthService.getUserId()).then(res => {
            this.setState({content: res.data})
        })
        this.setState({user: user, currentUser: currentUser})
    }

    render() {
        const {user, currentUser} = this.state;

        return (
            <div className="container">
                <div>
                    <br/>
                    <header className="jumbotron">
                        <h1>
                            Профиль <strong>{user.username}</strong>
                        </h1>
                        <h3>Почта: <strong>{user.email}</strong></h3>
                    </header>
                    <br/>
                    {currentUser && (
                        <div>
                            <Image src={block} width="50px" onClick={() => {
                                UserService.block(AuthService.getUserId())
                                this.props.history.push("/admin");
                                window.location.reload();
                            }}/>
                            <Image src={unlock} width="50px" onClick={() => {
                                UserService.unlock(AuthService.getUserId())
                                this.props.history.push("/admin");
                                window.location.reload();
                            }}/>
                        </div>
                    )}
                    <br/>

                    <h1>Ваши микрозаймы:</h1>
                    <br/>
                    <Table striped bordered hover variant="light">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата получения кредита</th>
                            <th>Дата, когда необходимо погасить</th>
                            <th>Количество</th>
                            <th>Статус</th>
                            <th>Процент</th>
                            <th>Оставшийся долг</th>
                            <th>Оплатить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.content.map(r => {
                            return (
                                <tr>
                                    <th>{r.id}</th>
                                    <th>{r.dateRequested.toString()}</th>
                                    <th>{r.dateRepaid.toString()}</th>
                                    <th>{r.amount}</th>
                                    <th>{r.status}</th>
                                    <th>{r.percent}</th>
                                    <th>{r.mainDebt}</th>
                                    <th><Button onClick={() => {
                                        localStorage.setItem('creditId', r.id)
                                        this.props.history.push("/payment");
                                        window.location.reload();
                                    }}>Оплата</Button></th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
