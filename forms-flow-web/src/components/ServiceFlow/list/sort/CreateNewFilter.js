import React, { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import "../../ServiceFlow.scss";
import { saveFilters } from "../../../../apiManager/services/bpmTaskServices";

const useStyles = makeStyles({
  list: {
    width: 380,
  },
  fullList: {
    width: "auto",
  },
});

export default function CreateNewFilterDrawer() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [showUndefinedVariable, setShowUndefinedVariable] = useState(false);
  const [inputVisibility, setInputVisibility] = useState({});
  const [definitionKeyId, setDefinitionKeyId] = useState("");
  const [candidateGroup, setCandidateGroup] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [includeAssignedTasks, setIncludeAssignedTasks] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, name: "", label: "", add: true, delete: false },
  ]);
  const [newRow, setNewRow] = useState([]);
  const [permissions, setPermissions] = useState("");
  const [identifierId, setIdentifierId] = useState("");
  const [selectUserGroupIcon, setSelectUserGroupIcon] = useState("");
  const [specificUserGroup, setSpecificUserGroup] = useState("");
  const userName = useSelector((state) => state.user?.userDetail?.name);

  //Function for collecting the input data
  const handleSubmit = () => {
    const data = {
      name: filterName,
      criteria: {
        processDefinitionKey: definitionKeyId,
        candidateGroup: candidateGroup,
        assignee: taskName,
        includeAssignedTasks: false,
      },
      variables: [
        ...rows.map((row) => ({
          name: row.name,
          label: row.label,
        })),
      ],
      users: [userName],
      roles: [selectUserGroupIcon],
      identifierId: identifierId,
    };
    saveFilters(data)
      .then(() => {
        toggleDrawer(false);
        // Clearing the input fields after submission
        setFilterName("");
        setShowUndefinedVariable("");
        setInputVisibility("");
        setDefinitionKeyId("");
        setCandidateGroup("");
        setTaskName("");
        setIncludeAssignedTasks("");
        setPermissions("");
        setIdentifierId("");
        setSelectUserGroupIcon("");
        setSpecificUserGroup("");
        setRows([{ id: 1, name: "", label: "", add: true, delete: false }]);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  // Function for setting visibility of input feild in criteria part
  const handleSpanClick = (spanId) => {
    setInputVisibility((prevVisibility) => ({
      ...prevVisibility,
      [spanId]: !prevVisibility[spanId],
    }));
  };

  //Function for taking values form checkbox from permission part
  const handleRadioChange = (e) => {
    setPermissions(e.target.value);
    setSpecificUserGroup("");
    setSelectUserGroupIcon("");
    setIdentifierId("");
  };

  //Function For checking  UndefinedVaribaleCheckbox is checked or not
  const UndefinedVaribaleCheckboxChange = (e) => {
    setShowUndefinedVariable(e.target.checked);
  };

  //Function For checking  includeAssignedTasksCheckbox is checked or not
  const includeAssignedTasksCheckboxChange = (e) => {
    setIncludeAssignedTasks(e.target.checked);
  };

  //Function to checking which icon is selected
  const handleClickUserGroupIcon = (icon) => {
    setSelectUserGroupIcon(icon);
  };

  //function for taking the value from the radio button Specific User/ Group
  const handleSpecificUserGroup = (e) => {
    if (e.target.value === "Specific User/ Group") {
      setSpecificUserGroup(e.target.value);
    } else {
      setSpecificUserGroup("");
      setSelectUserGroupIcon("");
      setIdentifierId("");
    }
  };

  // Function for taking the values from the name input field
  const handleVariableNameChange = (value, index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].name = value;
      return updatedRows;
    });
  };

  // Function for taking the values from the label input field
  const handleLabelNameChange = (value, index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].label = value;
      return updatedRows;
    });
  };

  //Function for adding rows for new inputs
  const handleAddRow = () => {
    setRows((prevRows) => [{ id: 1, ...newRow, delete: true }, ...prevRows]);
    setNewRow({ name: "", label: "", delete: true });
  };

  //Function for delecting a row
  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const list = (anchor) => (
    <div
      style={{ marginTop: "45px" }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        <div className="newFilterTaskContainer-header noPadding d-flex align-items-center justify-content-between">
          <h5 style={{ fontWeight: "bold", fontSize: "16px" }}>
            Create new filter
          </h5>
          <span
            style={{ cursor: "pointer", fontSize: "14px" }}
            onClick={() => toggleDrawer()}
          >
            Close
          </span>
        </div>
      </List>
      <List>
        <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>Filter Name</h5>
        <input
          type="text"
          placeholder="Enter your text here"
          className="filterNameTextfeild"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </List>
      <Divider />
      <List>
        <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>
          Criteria <i className="fa fa-info-circle"></i>{" "}
        </h5>
        <h5 style={{ fontSize: "18px" }}>Definition Key</h5>
        <span
          style={{
            textDecoration: "underline",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => handleSpanClick(1)}
          className="px-1 py-1"
        >
          <i className="fa fa-plus-circle" style={{ marginRight: "6px" }} />
          Add Value
        </span>
        {inputVisibility[1] && (
          <input
            type="text"
            className="Criteria-addValueInputBox"
            value={definitionKeyId}
            onChange={(e) => setDefinitionKeyId(e.target.value)}
          />
        )}
        <h5>Candidate Group</h5>
        <span
          style={{
            textDecoration: "underline",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => handleSpanClick(2)}
          className="px-1 py-1"
        >
          <i className="fa fa-plus-circle" style={{ marginRight: "6px" }} />
          Add Value
        </span>
        {inputVisibility[2] && (
          <input
            type="text"
            className="Criteria-addValueInputBox"
            value={candidateGroup}
            onChange={(e) => setCandidateGroup(e.target.value)}
          />
        )}
        <h5>Asignee</h5>
        <span
          style={{
            textDecoration: "underline",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => handleSpanClick(3)}
          className="px-1 py-1"
        >
          <i className="fa fa-plus-circle" style={{ marginRight: "6px" }} />
          Add Value
        </span>
        {inputVisibility[3] && (
          <input
            type="text"
            className="Criteria-addValueInputBox"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        )}

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <input
            type="checkbox"
            id="assignedTask-checkbox"
            checked={includeAssignedTasks}
            onChange={includeAssignedTasksCheckboxChange}
            style={{ marginRight: "6px" }}
          />
          <h5 style={{ fontSize: "18px", marginBottom: "3px" }}>
            Include Assigned Task
          </h5>
        </div>
        <Divider />
        <List>
          <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>
            Variable <i className="fa fa-info-circle"></i>
          </h5>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="my-checkbox"
              checked={showUndefinedVariable}
              onChange={UndefinedVaribaleCheckboxChange}
              style={{ marginRight: "6px" }}
            />
            <h5 style={{ fontSize: "18px", marginBottom: "3px" }}>
              Show undefined variables
            </h5>
          </div>

          <div>
            {rows.map((row, index) => (
              <div key={row.id} className="row-container">
                <div className="input-container">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name of variable"
                    className="varibleInputboxes"
                    value={row.name}
                    onChange={(e) =>
                      handleVariableNameChange(e.target.value, index)
                    }
                  />
                </div>
                <div className="input-container">
                  <label>Label</label>
                  <input
                    type="text"
                    placeholder="Readable name"
                    className="varibleInputboxes"
                    value={row.label}
                    onChange={(e) =>
                      handleLabelNameChange(e.target.value, index)
                    }
                  />
                </div>
                {row.delete ? (
                  <i
                    className="fa fa-minus-circle"
                    onClick={() => handleRemoveRow(row.id)}
                  ></i>
                ) : (
                  <></>
                )}

                {row.add ? (
                  <button className="btn btn-primary" onClick={handleAddRow}>
                    Add
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </List>
        <Divider />
        <div className="child-container-two">
          <h5 style={{ fontWeight: "bold" }}>
            Permission <i className="fa fa-info-circle"></i>
          </h5>
          <input
            style={{ marginRight: "4px" }}
            type="radio"
            id="my-radio"
            name="my-radio"
            value={"Accessible for all users"}
            checked={permissions === "Accessible for all users"}
            onChange={handleRadioChange}
          />
          <label style={{ marginRight: "3px", fontSize: "18px" }}>
            Accessible for all users
          </label>{" "}
          <br />
          <input
            style={{ marginRight: "4px" }}
            type="radio"
            id="my-radio"
            name="my-radio"
            value={"Private (Only You)"}
            checked={permissions === "Private (Only You)"}
            onChange={handleRadioChange}
          />
          <label style={{ fontSize: "18px" }}>Private (Only You)</label>
          <br />
          <input
            style={{ marginRight: "4px" }}
            type="radio"
            id="my-radio"
            name="my-radio"
            value={"Specific User/ Group"}
            checked={specificUserGroup === "Specific User/ Group"}
            onChange={handleSpecificUserGroup}
          />
          <label style={{ fontSize: "18px" }}>Specific User/ Group</label>{" "}
          <br />
          {specificUserGroup === "Specific User/ Group" ? (
            <div className="inside-child-container-two d-flex">
              <div className="user-group-divisions d-flex">
                <div style={{ fontSize: "14px" }}>
                  User
                  <i
                    className={`fa fa-user ${
                      selectUserGroupIcon === "user" ? "highlight" : ""
                    }`}
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => handleClickUserGroupIcon("user")}
                  />
                </div>
                <div style={{ fontSize: "14px" }}>
                  Group
                  <i
                    className={`fa fa-users ${
                      selectUserGroupIcon === "group" ? "highlight" : ""
                    }`}
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => handleClickUserGroupIcon("group")}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "16px" }}>Identifier</label>
                <input
                  type="text"
                  placeholder="Enter role ID"
                  style={{ width: "100%", height: "35px" }}
                  value={identifierId}
                  onChange={(e) => setIdentifierId(e.target.value)}
                />
              </div>
            </div>
          ) : null}
        </div>
      </List>
      <Divider />
      <List>
        <div className="newFilterTaskContainer-footer d-flex align-items-center justify-content-end">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => toggleDrawer(false)}
          >
            Cancel
          </span>
          <button
            className="btn btn-primary ml-3 submitButton"
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Filter
          </button>
        </div>
      </List>
    </div>
  );
  return (
    <div>
      <React.Fragment key="left">
        <Button
          onClick={() => toggleDrawer(true)}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          Create new filter
        </Button>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => toggleDrawer(false)}
          PaperProps={{
            style: {
              padding: "2%",
              overflowY: "auto",
              overflowX: "hidden",
              zIndex: "1500",
              backdropFilter: " none !important",
            },
          }}
          sx={{
            width: 100,
          }}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}