import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'


const ConfirmationModal = ({props}) => {
    const {modalOpen} = props.state;
    const resetForm = props.resetForm;
    return (
      <Modal
        open={modalOpen}
        size="small"
        closeOnEscape={true}
        closeOnRootNodeClick={true}
      >
        <Header content="Expense" />
        <Modal.Content>
          <h3>Expense successfully added to your google sheet</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            type="button"
            icon="checkmark"
            labelPosition="right"
            onClick={resetForm}
            content="Ok"
          />
        </Modal.Actions>
      </Modal>
    );
}

export default ConfirmationModal