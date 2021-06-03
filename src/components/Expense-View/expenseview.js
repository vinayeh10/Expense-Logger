import React, { Component } from "react";
import { Button } from "primereact/button";
import {
  DataTable,
  paginatorLeft,
  paginatorRight,
  Column,
} from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";

import axios from "axios";
import { Tooltip } from "primereact/tooltip";
import { BrowserRouter as Router } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default class ExpenseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      isLoading: true,
    };

    console.log(this.props, props);

    this.exportCSV = this.exportCSV.bind(this);
    this.exportPdf = this.exportPdf.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.navigateToExpenseLogger = this.navigateToExpenseLogger.bind(this);

    this.cols = [
      { field: "expense", header: "Expense" },
      { field: "date", header: "Date" },
      { field: "category", header: "Category" },
      { field: "note", header: "Note" },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  componentDidMount() {
    const url =
      "https://sheet.best/api/sheets/583a431c-e1cf-4478-935d-edffd8e05a04";
    axios
      .get(url)
      .then((result) => {
        if (result && result.data && result.data.length) {
          this.setState({
            ...this.state,
            expenses: result.data,
            isLoading: false,
          });
        } else {
          this.setState({
            ...this.state,
            expenses: [],
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          expenses: [],
          isLoading: false,
        });
      });
  }

  expenseTemplate(rowData) {
    return formatter.format(rowData.expense);
  }

  exportCSV(selectionOnly) {
    this.dt.exportCSV({ selectionOnly });
  }

  exportPdf() {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.state.expenses);
        doc.save("Expenses.pdf");
      });
    });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.state.expenses);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "Expenses");
    });
  }

  saveAsExcelFile(buffer, fileName) {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  navigateToExpenseLogger() {
    this.props.history.push("/expenselogger");
  }

  render() {
    const header = (
      <div className="p-d-flex p-ai-center export-buttons">
        <Button
          type="button"
          icon="pi pi-file-excel"
          className="p-button-success p-mr-2"
          tooltip="XLS"
          onClick={this.exportExcel}
          disabled={!this.state.expenses.length}
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          className="p-button-warning p-mr-2"
          tooltip="PDF"
          onClick={this.exportPdf}
          disabled={!this.state.expenses.length}
        />
        <Button
          style={{ float: "right" }}
          label="Log Expense"
          className="p-button-outlined p-button-secondary"
          onClick={this.navigateToExpenseLogger}
        />
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ margin: "30px", textAlign: "center" }}>
            <h5>Please wait loading expenses...</h5>
            <ProgressSpinner
              style={{ width: "100%", height: "50px" }}
              strokeWidth="8"
              fill="#EEEEEE"
              animationDuration=".5s"
            />
          </div>
        ) : (
          <div>
            <h3> My Expenses </h3>
            <DataTable
              dataKey="id"
              defaultSortOrder={1}
              sortField="date"
              emptyMessage="No Expenses found please log expense"
              alwaysShowPaginator={false}
              value={this.state.expenses}
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              rows={10}
              rowsPerPageOptions={[10, 20, 50]}
              paginatorLeft={paginatorLeft}
              paginatorRight={paginatorRight}
              exportCSV={true}
              header={header}
            >
              <Column
                field="expense"
                body={this.expenseTemplate}
                header="Expense"
              ></Column>
              <Column field="date" header="Date"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="note" header="Note"></Column>
            </DataTable>
          </div>
        )}
      </div>
    );
  }
}
