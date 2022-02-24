import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import PersonalDataService from "../services/personal-data.service";
import AddressService from "../services/address.service";
import WorkService from "../services/work.service";
import BorrowerService from "../services/borrower.service";
import AuthService from "../services/auth.service";

export default class SecondRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            birthday: "",
            city: "",
            street: "",
            houseNumber: 0,
            salary: 0,
            industry: "",
            education: "",
            personalDataId: 0,
            addressId: 0,
            workId: 0
        };
    }

    componentDidMount() {

    }

    handleFirstNameChange = event => {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange = event => {
        this.setState({lastName: event.target.value});
    }

    handleBirthdayChange = event => {
        this.setState({birthday: event.target.value});
    }

    handleCityChange = event => {
        this.setState({city: event.target.value});
    }

    handleStreetChange = event => {
        this.setState({street: event.target.value});
    }

    handleHouseNumberChange = event => {
        this.setState({houseNumber: event.target.value});
    }

    handleSalaryChange = event => {
        this.setState({salary: event.target.value});
    }

    handleIndustryChange = event => {
        this.setState({industry: event.target.value});
    }

    handleEducationChange = event => {
        this.setState({education: event.target.value});
    }

    render() {
        return (
            <Form>
                <br/>
                <h1>Ваша информация</h1>
                <br/>
                <br/>
                <h3>Персональные данные</h3>
                <br/>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите ваше имя</h5>
                    <Form.Control placeholder="Ivan" id="firstName" onChange={this.handleFirstNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите вашу фамилию</h5>
                    <Form.Control placeholder="Ivanov" id="lastName" onChange={this.handleLastNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '33rem'}}>
                    <h5>Введите вашу дату рождения в формате: <strong>****-**-**</strong></h5>
                    <Form.Control placeholder="0000-00-00" id="birthday" onChange={this.handleBirthdayChange}/>
                </Form.Group>
                <br/>
                <br/>
                <h3>Данные о месте проживания</h3>
                <br/>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите город проживания: </h5>
                    <Form.Control placeholder="123" id="city" onChange={this.handleCityChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите улицу: </h5>
                    <Form.Control placeholder="Volkova" id="street" onChange={this.handleStreetChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите номер дома: </h5>
                    <Form.Control placeholder="10" id="houseNumber" onChange={this.handleHouseNumberChange}/>
                </Form.Group>
                <br/>
                <br/>
                <h3>Данные о работе</h3>
                <br/>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Введите вашу зарплату: </h5>
                    <Form.Control placeholder="100" id="salary" onChange={this.handleSalaryChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Выберите вашу специальность: </h5>
                    <Form.Select defaultValue="IT" id="industry" onChange={this.handleIndustryChange}>
                        <option>IT</option>
                        <option>BOOKKEEPING</option>
                        <option>FEC</option>
                        <option>SERVICE</option>
                        <option>ARMY</option>
                        <option>SECURITY</option>
                        <option>ART</option>
                        <option>MED</option>
                        <option>SCIENCE</option>
                        <option>GOV_SERVICE</option>
                        <option>SALES</option>
                        <option>PRODUCTION</option>
                        <option>BUILDING</option>
                        <option>TRANSPORT</option>
                        <option>OTHER</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1" style={{width: '20rem'}}>
                    <h5>Укажите ваше образование: </h5>
                    <Form.Select defaultValue="HIGHER" id="education" onChange={this.handleEducationChange}>
                        <option>LOWER_SECONDARY</option>
                        <option>SECONDARY</option>
                        <option>INCOMPLETE_HIGHER</option>
                        <option>HIGHER</option>
                        <option>OTHER</option>
                    </Form.Select>
                </Form.Group>
                <br/>
                <Button variant="primary" type="button" onClick={() => {
                    let personalDataRequest = {
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        birthday: document.getElementById("birthday").value
                    }
                    PersonalDataService.create(JSON.parse(JSON.stringify(personalDataRequest))).then(res => {
                        this.setState({personalDataId: JSON.parse(JSON.stringify(res.data)).id})
                    })
                    let addressRequest = {
                        city: document.getElementById("city").value,
                        street: document.getElementById("street").value,
                        houseNumber: document.getElementById("houseNumber").value
                    }
                    AddressService.create(JSON.parse(JSON.stringify(addressRequest))).then(res => {
                        this.setState({addressId: JSON.parse(JSON.stringify(res.data)).id})
                    })
                    let workRequest = {
                        salary: document.getElementById("salary").value,
                        industry: document.getElementById("industry").value,
                        education: document.getElementById("education").value
                    }
                    WorkService.create(JSON.parse(JSON.stringify(workRequest))).then(res => {
                        this.setState({workId: JSON.parse(JSON.stringify(res.data)).id})
                    })
                    let createBorrowerRequest = {
                        userId: AuthService.getUserId(),
                        personalDataId: this.state.personalDataId,
                        workId: this.state.workId,
                        addressId: this.state.addressId
                    }
                    BorrowerService.create(JSON.parse(JSON.stringify(createBorrowerRequest)))
                    this.props.history.push("/profile");
                    window.location.reload();
                }}>
                    Submit
                </Button>
            </Form>
        );
    }
}
