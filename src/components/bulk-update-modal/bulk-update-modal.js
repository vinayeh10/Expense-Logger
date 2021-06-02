import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'


const BulUpdateModal = ({props}) => {
    const {bulkModalOpen} = props.state;
    const handleBulkUpdateSubmit = props.handleBulkUpdateSubmit
    return (
      <Modal key='2'
        open={bulkModalOpen}
        size="small"
        closeOnEscape={true}
        closeOnRootNodeClick={true}
      >
        <Header content="Expense" />
        <Modal.Content>
          <h3>Bulk update Modal</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            type="button"
            icon="checkmark"
            labelPosition="right"
            onClick={handleBulkUpdateSubmit}
            content="Submit"
          />
        </Modal.Actions>
      </Modal>
    );
}

export default BulUpdateModal