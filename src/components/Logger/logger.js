import React, { Component } from "react";
import { Button, Form, Container, Header, Modal } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import axios from "axios";
import ConfirmationModal from "../confirmation-modal/confirmation-modal";
import Logo from "../../assets/logo.png";
import $ from "jquery";
import { ProgressSpinner } from "primereact/progressspinner";

export default class Logger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: "",
      date: "",
      category: "",
      note: "",
      modalOpen: false,
      bulkModalOpen: false,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    this.setState({
        ...this.state,
        isLoading: true
    });
    const url =
      "https://sheet.best/api/sheets/583a431c-e1cf-4478-935d-edffd8e05a04";
    e.preventDefault();

    axios.post(url, this.state).then((response) => {
      if (response && response.data && response.data.length) {
        this.setState({
          expense: "",
          date: "",
          category: "",
          note: "",
          modalOpen: true,
          bulkModalOpen: false,
          isLoading: false,
        });
      } else {
        this.setState({
            expense: "",
            date: "",
            category: "",
            note: "",
            modalOpen: false,
            bulkModalOpen: false,
            isLoading: false,
          });
      }
    }).catch((err) => {
        this.setState({
            expense: "",
            date: "",
            category: "",
            note: "",
            modalOpen: false,
            bulkModalOpen: false,
            isLoading: false,
          });
    });
  };

  resetForm = () => {
    this.setState({
      expense: "",
      date: "",
      category: "",
      note: "",
      modalOpen: false,
      bulkModalOpen: false,
      isLoading: false
    });
  };

  bulkUpdateModalhandler = () => {
    this.setState({
      ...this.state,
      bulkModalOpen: true,
    });
  };

  handleBulkUpdateSubmit = () => {
    console.log("done from modal");
  };

  render() {
    const { expense, date, category, note } = this.state;
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ margin: "30px", textAlign: "center" }}>
            <h5>Logging expense please wait...</h5>
            <ProgressSpinner
              style={{ width: "100%", height: "50px" }}
              strokeWidth="8"
              fill="#EEEEEE"
              animationDuration=".5s"
            />
          </div>
        ) : (
          <div>
            <Container fluid className="container custom-align-container">
              <Header as="h3">Log Expense</Header>
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
            />
          </div>
        )}
      </div>
    );
  }
}
