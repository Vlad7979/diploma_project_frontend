import React, {Component} from "react";
import UserService from "../services/user.service";
import {Table} from "react-bootstrap";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            id: 0,
            username: "",
            email: ""
        };
    }

    componentDidMount() {
        UserService.getAllUsers().then(res => {
            this.setState({content: res.data})
            // let list = []
            // this.state.content.map(item => {
            //   list.push(item.name)
            // })
            // this.setState({names: list})
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <header className="jumbotron">
                    <h1>ADMIN BOARD</h1>

                </header>
                <br/>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>BLOCKED</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.content.map(r => {
                        return (
                            <tr onClick={() => {
                                localStorage.setItem("user", JSON.stringify(r))
                                this.props.history.push("/profile")
                                window.location.reload()
                            }}>
                                <th>{r.id}</th>
                                <th>{r.username}</th>
                                <th>{r.email}</th>
                                <th>{r.blocked.toString()}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
