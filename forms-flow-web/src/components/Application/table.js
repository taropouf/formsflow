import React from "react";
import { Link } from "react-router-dom";
import startCase from "lodash/startCase";
import { textFilter , selectFilter } from "react-bootstrap-table2-filter";
import {getLocalDateTime} from "../../apiManager/services/formatterService";
import {AWAITING_ACKNOWLEDGEMENT} from "../../constants/applicationConstants";
import { Trans,useTranslation } from "react-i18next";

let statusFilter,
    idFilter,
    nameFilter,
    modifiedDateFilter;

export const defaultSortedBy = [
  {
    dataField: "name",
    order: "asc", // or desc
  },
];

const getApplicationStatusOptions = (rows) => {
  const statusArray =  rows.map(row=>row.applicationStatus)
  const uniqueStatusArray = [...new Set(statusArray)];
  const selectOptions = uniqueStatusArray.map(option => {
    return {value:option,label:option}
  })
  return selectOptions;
}

const linkApplication = (cell, row) => {
  return (
    <Link to={`/application/${row.id}`} title={cell}>
      {cell}
    </Link>
  );
}


const linkSubmission = (cell,row) => {
  const url = row.isClientEdit ? `/form/${row.formId}/submission/${row.submissionId}/edit`:`/form/${row.formId}/submission/${row.submissionId}`;
  const buttonText = row.isClientEdit ? (row.applicationStatus===AWAITING_ACKNOWLEDGEMENT?'Acknowledge':'Edit') : <Trans>{("view")}</Trans>
  const icon=row.isClientEdit? 'fa fa-edit' : 'fa fa-eye';
  return (
  <div onClick={()=> window.open(url, "_blank")}>
        <span className="btn btn-primary btn-sm form-btn"><span><i
          className={icon}/>&nbsp;</span>{buttonText}</span>
  </div>
  );
}
  

function timeFormatter(cell) {
  const localdate = getLocalDateTime(cell) ;
  return <label title={cell}>{localdate}</label>;
}

const nameFormatter = (cell) => {
  const name= startCase(cell);
  return <label className="text-truncate w-100" title={name}>{startCase(name)}</label>;
}

export const columns_history = [
  {
    dataField: "applicationname",
    text: <Trans>{("application_name")}</Trans>,
    sort: true,
  },
  {
    dataField: "applicationstatus",
    text: <Trans>{("application_status")}</Trans>,
    sort: true,
  },
];

export const columns  = (rows) => [
  {
    dataField: "id",
    text: <Trans>{("application_id")}</Trans>,
    formatter: linkApplication,
    sort: true,
    filter: textFilter({
      placeholder: "\uf002 Application ID", // custom the input placeholder
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
      className: "icon-search",
      getFilter: (filter) => {
      idFilter = filter;
      },
    }),
  },
  {
    dataField: "applicationName",
    text: <Trans>{("application_name")}</Trans>,
    sort: true,
    formatter: nameFormatter,
    filter: textFilter({
      placeholder: "\uf002 Application Name", // custom the input placeholder
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
      className: "icon-search",
      getFilter: (filter) => {
        nameFilter = filter;
      },
    }),
  },
  {
    dataField: "applicationStatus",
    text: <Trans>{("application_status")}</Trans>,
    sort: true,
    filter: selectFilter({
      options: getApplicationStatusOptions(rows),
      placeholder: "All",
	    defaultValue: 'All',
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
      getFilter: (filter) => {
        statusFilter = filter;
      },
    }),
  },
  {
    dataField: "formUrl",
    text: <Trans>{("link_to_form_submission")}</Trans>,
    formatter: linkSubmission,
  },

  {
    dataField: "modified",
    text:<Trans>{("last_modified")}</Trans>,
    formatter: timeFormatter,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "15%" };
    },
    filter: textFilter({
      placeholder: "\uf002 Last Modified", // custom the input placeholder
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
      className: "icon-search",
      getFilter: (filter) => {
        modifiedDateFilter = filter;
      },
    }),
  }

];

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    <Trans>{("showing")}</Trans> {from} <Trans>{("to")}</Trans> {to} <Trans>{("of")}</Trans> {size} <Trans>{("results")}</Trans>
  </span>
);

export const getoptions = (count) => {
  return {
    expandRowBgColor: "rgb(173,216,230)",
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    paginationSize: 7, // the pagination bar size.
    prePageText: "<<",
    nextPageText: ">>",
    showTotal: true,
    Total: count,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPage: 5,
  };
};
export const clearFilter = () => {
    statusFilter("");
    idFilter("");
    nameFilter("");
    modifiedDateFilter("");
};
