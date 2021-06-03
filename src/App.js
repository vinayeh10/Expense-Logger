import React, { Component } from 'react'
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios';
import BulUpdateModal from './components/bulk-update-modal/bulk-update-modal';
import Logo from './assets/logo.png';
import Logger from './components/Logger/logger';
import ExpenseView from './components/Expense-View/expenseview';


export default class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       expense: '',
       date: '',
       category: '',
       note: '',
       modalOpen: false,
       bulkModalOpen: false
    }
    console.log(this.props, props)
  }

  changeHandler = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  submitHandler = e => {
    const url = 'https://sheet.best/api/sheets/583a431c-e1cf-4478-935d-edffd8e05a04';
    e.preventDefault();
    console.log(this.state);
    const arr = [{...this.state}, {
      expense: "200",
      date: "12/12/2021",
      category: "bill",
      note: "",
    }]

    axios.post(url, arr)
    .then(response => {
      console.log(response);
      this.setState({
        expense: "",
        date: "",
        category: "",
        note: "",
        modalOpen: true,
        bulkModalOpen: false
      });
    })
  }

  resetForm = () => {
    this.setState({
      expense: '',
      date: '',
      category: '',
      note: '',
      modalOpen: false,
      bulkModalOpen: false
    });
  }

  bulkUpdateModalhandler = () => {
    this.setState({
      ...this.state,
      bulkModalOpen: true
    });
  }

  handleBulkUpdateSubmit = () => {
    console.log('done from modal');
  }

  handleMenuClick() {
    document.body.classList.toggle("menu-active");
  }


  render() {
    return (
      <Router>
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Expense Logger" />
          </div>
          <div className="push-left">
            <button
              onClick={this.handleMenuClick}
              id="menu-toggler"
              data-class="menu-active"
              className="hamburger"
            >
              <span className="hamburger-line hamburger-line-top"></span>
              <span className="hamburger-line hamburger-line-middle"></span>
              <span className="hamburger-line hamburger-line-bottom"></span>
            </button>
            <ul id="primary-menu" className="menu nav-menu">
              <li className="menu-item current-menu-item" onClick={this.handleMenuClick}>
                <Link
                  activeClassName="nav-item-active"
                  className="nav__link"
                  exact
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="menu-item dropdown" onClick={this.handleMenuClick}>
                <Link
                  activeClassName="nav-item-active"
                  className="nav__link"
                  to="/expenselogger"
                >
                  Log Expense
                </Link>
              </li>
              <li className="menu-item dropdown" onClick={this.handleMenuClick}>
                <Link
                  activeClassName="nav-item-active"
                  className="nav__link"
                  to="/bulkupdate"
                >
                  Bulk Logger
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="main-app-container">
          <Switch>
            <Route path="/bulkupdate">
              <BulUpdateModal />
            </Route>
            <Route path="/expenselogger">
              <Logger />
            </Route>
            <Route path="/" component={props => <ExpenseView {...props} />} >
            </Route>
          </Switch>
          {/* <Container fluid className="container custom-align-container">
            <Form className="ui large form" onSubmit={this.submitHandler}>
              <Form.Field required>
                <label>Expense</label>
                <input
                  required
                  type="number"
                  value={expense}
                  placeholder="Enter your expense"
                  name="expense"
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field required>
                <label>Month</label>
                <input
                  required
                  type="date"
                  placeholder="Enter expense date"
                  value={date}
                  name="date"
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <label>Category</label>
                <input
                  placeholder="Enter expense category (optional)"
                  name="category"
                  value={category}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <label>Note</label>
                <textarea
                  rows="2"
                  placeholder="Enter Note (optional)"
                  name="note"
                  value={note}
                  onChange={this.changeHandler}
                ></textarea>
              </Form.Field>
              <Button
                compact={true}
                size="large"
                floated="right"
                color="blue"
                type="submit"
              >
                Log Expense
              </Button>
              <Button
                compact={true}
                size="large"
                floated="right"
                color="blue"
                type="button"
                onClick={this.resetForm}
              >
                Reset
              </Button>
            </Form>
          </Container>

          <ConfirmationModal
            props={{
              state: this.state,
              resetForm: this.resetForm,
            }}
          /> */}
        </div>
      </Router>
    );
  }
}