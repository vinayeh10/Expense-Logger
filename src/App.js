import React, { Component } from 'react'
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import './App.css';

import axios from 'axios';
import BulUpdateModal from './components/bulk-update-modal/bulk-update-modal';
import ConfirmationModal from './components/confirmation-modal/confirmation-modal';


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


  render() {
    const { expense, date, category, note } = this.state;
    return (
      <div>
        <Container fluid className="container custom-align-container">
          <Header as="h2">Expense Logger!</Header>
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
            {/* <Button color="blue" type="button" onClick={this.bulkUpdateModalhandler}>
              Bulk log expense
            </Button> */}
            <Button compact={true} size="large" floated="right" color="blue" type="submit">
              Submit
            </Button>
            <Button compact={true} size="large" floated="right" color="blue" type="button" onClick={this.resetForm}>
              Reset
            </Button>
          </Form>
        </Container>

        <ConfirmationModal props={{
          state: this.state,
          resetForm: this.resetForm
        }} />
      
        {/* <BulUpdateModal props={{
          state: this.state,
          handleBulkUpdateSubmit: this.handleBulkUpdateSubmit
        }} /> */}
      </div>
    );
  }
}