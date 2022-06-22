import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  indexForms,
  selectRoot,
  selectError,
  Errors,
  FormGrid,
  deleteForm,
} from "react-formio";
import Loading from "../../containers/Loading";
import {
  FORM_ACCESS,
  MULTITENANCY_ENABLED,
  PageSizes,
  STAFF_DESIGNER,
  SUBMISSION_ACCESS,
} from "../../constants/constants";
import "../Form/List.scss";
import {
  setFormFailureErrorData,
  setBPMFormLimit,
  setBPMFormListLoading,
  setBPMFormListPage,
  setBPMFormListSort,
  setFormDeleteStatus,
  setMaintainBPMFormPagination,
} from "../../actions/formActions";
import Confirm from "../../containers/Confirm";
import {
  fetchBPMFormList,
  fetchFormByAlias,
} from "../../apiManager/services/bpmFormServices";
import {
  designerColumns,
  getOperations,
  userColumns,
} from "./constants/formListConstants";
import FileService from "../../services/FileService";
import {
  setFormCheckList,
  setFormUploadList,
  updateFormUploadCounter,
} from "../../actions/checkListActions";
import FileModal from "./FileUpload/fileUploadModal";
import { useTranslation, Translation } from "react-i18next";
import { addHiddenApplicationComponent } from "../../constants/applicationComponent";
import LoadingOverlay from "react-loading-overlay";
import {
  getFormProcesses,
  getApplicationCount,
  resetFormProcessData,
} from "../../apiManager/services/processServices";
import { unPublishForm } from "../../apiManager/services/processServices";
import { setIsApplicationCountLoading } from "../../actions/processActions";
import { setBpmFormSearch } from "../../actions/formActions";
import { checkAndAddTenantKey } from "../../helper/helper";
import { formCreate } from "../../apiManager/services/FormServices";

const List = React.memo((props) => {
  const { t } = useTranslation();
  const [showFormUploadModal, setShowFormUploadModal] = useState(false);
  const dispatch = useDispatch();
  const uploadFormNode = useRef();
  const {
    forms,
    onAction,
    getForms,
    getFormsInit,
    errors,
    userRoles,
    formId,
    onNo,
    onYes,
    tenants,
    path,
  } = props;

  const isBPMFormListLoading = useSelector((state) => state.bpmForms.isActive);
  const bpmForms = useSelector((state) => state.bpmForms);

  // View submissions feature will be deprecated in the future releases.

  // const showViewSubmissions = useSelector((state) => state.user.showViewSubmissions);
  //const operations = getOperations(userRoles, showViewSubmissions);

  const operations = getOperations(userRoles, false);

  const formCheckList = useSelector((state) => state.formCheckList.formList);
  const isDesigner = userRoles.includes(STAFF_DESIGNER);
  const columns = isDesigner ? designerColumns : userColumns;
  const paginatedForms = isDesigner ? forms.forms : bpmForms.forms;
  const searchFormLoading = useSelector(
    (state) => state.formCheckList.searchFormLoading
  );
  const isApplicationCountLoading = useSelector(
    (state) => state.process.isApplicationCountLoading
  );
  const applicationCountResponse = useSelector(
    (state) => state.process.applicationCountResponse
  );
  const formProcessData = useSelector((state) => state.process.formProcessList);
  const applicationCount = useSelector(
    (state) => state.process.applicationCount
  );
  const bpmFormLoading = useSelector((state) => state.bpmForms.bpmFormLoading);
  const tenantKey = tenants?.tenantId;
  const redirectUrl = MULTITENANCY_ENABLED ? `/tenant/${tenantKey}/` : "/";
  const getFormsList = (page, query) => {
    if (page) {
      dispatch(setBPMFormListPage(page));
    }
    if (query) {
      dispatch(setBPMFormListSort(query.sort || ""));
    }
  };
  const [previousForms, setPreviousForms] = useState({});
  const onPageSizeChanged = (pageSize) => {
    if (isDesigner) {
      dispatch(indexForms("forms", 1, { limit: pageSize }));
    } else {
      dispatch(setBPMFormLimit(pageSize));
    }
  };
  useEffect(() => {
    if (forms.forms.length > 0) {
      setPreviousForms(forms);
    }
  }, [forms]);

  useEffect(() => {
    dispatch(setFormCheckList([]));
  }, [dispatch]);

  useEffect(() => {
    if (isDesigner) {
      getFormsInit(1);
    } else {
      dispatch(setBPMFormListLoading(true));
      dispatch(fetchBPMFormList());
    }
  }, [getFormsInit, dispatch, isDesigner]);

  const downloadForms = () => {
    FileService.downloadFile({ forms: formCheckList }, () => {
      toast.success(
        `${formCheckList.length} ${
          formCheckList.length === 1 ? t("Form") : t("Forms")
        } ${t("Downloaded Successfully")}`
      );
      dispatch(setFormCheckList([]));
    });
  };

  const uploadClick = (e) => {
    dispatch(setFormUploadList([]));
    e.preventDefault();
    uploadFormNode.current?.click();
    return false;
  };

  const resetForms = () => {
    isDesigner
      ? dispatch(
          indexForms("forms", 1, {
            query: { ...forms.query, title__regex: "" },
          })
        )
      : dispatch(setBpmFormSearch(""));
  };

  const uploadFileContents = async (fileContent) => {
    try {
      if (fileContent.forms && Array.isArray(fileContent.forms)) {
        await Promise.all(
          fileContent.forms.map(async (formData) => {
            return new Promise((resolve, reject) => {
              formData = addHiddenApplicationComponent(formData);
              let tenantDetails = {};
              if (MULTITENANCY_ENABLED && tenantKey) {
                tenantDetails = { tenantKey };
                formData.path = checkAndAddTenantKey(formData.path, tenantKey);
                formData.name = checkAndAddTenantKey(formData.name, tenantKey);
              }
              const newFormData = {
                ...formData,
                tags: ["common"],
                ...tenantDetails,
              };
              newFormData.access = FORM_ACCESS;
              newFormData.submissionAccess = SUBMISSION_ACCESS;
              formCreate(newFormData,(err)=>{
                if (err) {
                  // get the form Id of the form if exists already in the server
                  dispatch(
                    fetchFormByAlias(
                      newFormData.path,
                      async (err, formObj) => {
                        if (!err) {
                          newFormData._id = formObj._id;
                          newFormData.access = formObj.access;
                          newFormData.submissionAccess =
                            formObj.submissionAccess;
                          // newFormData.tags = formObj.tags;
                          formCreate(newFormData,(err)=>{
                            if (!err) {
                              dispatch(updateFormUploadCounter());
                              resolve();
                            } else {
                              dispatch(setFormFailureErrorData("form",err));
                              toast.error("Error in Json file structure");
                              setShowFormUploadModal(false);
                              reject();
                            }
                          });
                        } else {
                          toast.error("Error in Json file structure");
                          setShowFormUploadModal(false);
                          reject();
                        }
                      }
                    )
                  );
                } else {
                  dispatch(updateFormUploadCounter());
                  resolve();
                }
              });
            });
          })
        );
      } else {
        setShowFormUploadModal(false);
        return toast.error(t("Error in JSON file structure"));
      }
    } catch (err) {
      setShowFormUploadModal(false);
      return toast.error("Error in Json file structure");
    }
  };

  const fileUploaded = async (evt) => {
    FileService.uploadFile(evt, async (fileContent) => {
      dispatch(setFormUploadList(fileContent?.forms || []));
      setShowFormUploadModal(true);
      await uploadFileContents(fileContent);
      dispatch(indexForms("forms", 1, forms.query));
    });
  };

  return (
    <>
      <FileModal
        modalOpen={showFormUploadModal}
        onClose={() => setShowFormUploadModal(false)}
      />
      {(forms.isActive || isBPMFormListLoading) && !searchFormLoading ? (
        <div data-testid="Form-list-component-loader">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <Confirm
            modalOpen={props.modalOpen}
            message={
              formProcessData.id && applicationCount
                ? applicationCountResponse
                  ? `${applicationCount} ${
                      applicationCount > 1
                        ? `${t("  Applications are submitted against")}`
                        : `${t("  Application is submitted against")}`
                    } "${props.formName}". ${t(
                      "Are you sure you wish to delete the form?"
                    )}`
                  : `  ${t("Are you sure you wish to delete the form")} "${
                      props.formName
                    }"?`
                : `${t("Are you sure you wish to delete the form ")} "${
                    props.formName
                  }"?`
            }
            onNo={() => onNo()}
            onYes={() => {
              onYes(formId, forms, formProcessData, path, formCheckList);
            }}
          />
          <div className="flex-container">
            {/*<img src="/form.svg" width="30" height="30" alt="form" />*/}
            <div className="flex-item-left">
              <div style={{ display: "flex" }}>
                <h3 className="task-head" style={{ marginTop: "3px" }}>
                  <i className="fa fa-wpforms" aria-hidden="true" />
                </h3>
                <h3 className="task-head">
                  {" "}
                  <span className="forms-text" style={{ marginLeft: "1px" }}>
                    {t("Forms")}
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex-item-right">
              {isDesigner && (
                <Link
                  to={`${redirectUrl}formflow/create`}
                  className="btn btn-primary btn-left btn-sm"
                >
                  <i className="fa fa-plus fa-lg" />{" "}
                  <Translation>{(t) => t("Create Form")}</Translation>
                </Link>
              )}
              {isDesigner && (
                <>
                  <Button
                    className="btn btn-primary btn-sm form-btn pull-right btn-left"
                    onClick={uploadClick}
                    title={t("Upload json form only")}
                  >
                    <i className="fa fa-upload fa-lg" aria-hidden="true" />{" "}
                    {t("Upload Form")}{" "}
                  </Button>
                  <input
                    type="file"
                    className="d-none"
                    multiple={false}
                    accept=".json,application/json"
                    onChange={fileUploaded}
                    ref={uploadFormNode}
                  />
                </>
              )}
              {isDesigner && (
                <>
                  <button
                    className="btn btn-outline-primary pull-right btn-left "
                    onClick={downloadForms}
                    disabled={formCheckList.length === 0}
                  >
                    <i className="fa fa-download fa-lg" aria-hidden="true" />{" "}
                    {t("Download Form")}{" "}
                  </button>
                </>
              )}
            </div>
          </div>
          <section className="custom-grid grid-forms">
            <Errors errors={errors} />
            {
              <LoadingOverlay
                active={
                  searchFormLoading ||
                  isApplicationCountLoading ||
                  bpmFormLoading
                }
                spinner
                text={t("Loading...")}
              >
                {searchFormLoading || paginatedForms.length ? (
                  <FormGrid
                    columns={columns}
                    forms={
                      isDesigner
                        ? forms.forms.length
                          ? forms
                          : previousForms
                        : bpmForms
                    }
                    onAction={(form, action) => {
                      onAction(form, action, redirectUrl);
                    }}
                    pageSizes={PageSizes}
                    getForms={isDesigner ? getForms : getFormsList}
                    operations={operations}
                    onPageSizeChanged={onPageSizeChanged}
                  />
                ) : (
                  <span>
                    <div
                      className="container"
                      style={{
                        maxWidth: "900px",
                        margin: "auto",
                        height: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h3>{t("No forms found")}</h3>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={resetForms}
                      >
                        {t("Click here to go back")}
                      </Button>
                    </div>
                  </span>
                )}
              </LoadingOverlay>
            }
          </section>
        </div>
      )}
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    forms: selectRoot("forms", state),
    errors: selectError("forms", state),
    userRoles: selectRoot("user", state).roles || [],
    modalOpen: selectRoot("formDelete", state).formDelete.modalOpen,
    formId: selectRoot("formDelete", state).formDelete.formId,
    formName: selectRoot("formDelete", state).formDelete.formName,
    isFormWorkflowSaved: selectRoot("formDelete", state).isFormWorkflowSaved,
    tenants: selectRoot("tenants", state),
    path: selectRoot("formDelete", state).formDelete.path,
  };
};

const getInitForms = (page = 1, query) => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPage = state.forms.pagination.page;
    const maintainPagination = state.bpmForms.maintainPagination;
    dispatch(
      indexForms("forms", maintainPagination ? currentPage : page, query)
    );
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getForms: (page, query) => {
      dispatch(indexForms("forms", page, query));
    },
    getFormsInit: (page, query) => {
      dispatch(getInitForms(page, query));
    },
    onAction: async (form, action, redirectUrl) => {
      switch (action) {
        case "insert":
          dispatch(push(`${redirectUrl}form/${form._id}`));
          break;
        case "submission":
          dispatch(push(`${redirectUrl}form/${form._id}/submission`));
          break;
        // case "edit":
        //   dispatch(push(`/form/${form._id}/edit`));
        //   break;
        case "delete":
          dispatch(setIsApplicationCountLoading(true));
          dispatch(
            getFormProcesses(form._id, (err, data) => {
              const formDetails = {
                modalOpen: true,
                formId: form._id,
                formName: form.title,
                path: form.path,
              };
              if (data) {
                dispatch(
                  // eslint-disable-next-line no-unused-vars
                  getApplicationCount(data.id, (err, res) => {
                    dispatch(setIsApplicationCountLoading(false));
                    dispatch(setFormDeleteStatus(formDetails));
                  })
                );
              } else {
                dispatch(setIsApplicationCountLoading(false));
                dispatch(setFormDeleteStatus(formDetails));
              }
            })
          );

          break;
        case "viewForm":
          dispatch(resetFormProcessData());
          dispatch(setMaintainBPMFormPagination(true));
          dispatch(push(`${redirectUrl}formflow/${form._id}/view-edit`));
          break;
        default:
      }
    },
    onYes: (formId, forms, formData, path, formCheckList) => {
      dispatch(
        deleteForm("form", formId, (err) => {
          if (!err) {
            toast.success(
              <Translation>{(t) => t("Form deleted successfully")}</Translation>
            );
            dispatch(indexForms("forms", 1, forms.query));
            if (formData.id) {
              dispatch(unPublishForm(formData.id));
              const newFormCheckList = formCheckList.filter(
                (i) => i.path !== path
              );
              dispatch(setFormCheckList(newFormCheckList));
            }
          } else {
            toast.error(
              <Translation>
                {(t) => t("Form delete unsuccessfull")}
              </Translation>
            );
          }
          const formDetails = {
            modalOpen: false,
            formId: "",
            formName: "",
          };
          dispatch(setFormDeleteStatus(formDetails));
        })
      );
    },
    onNo: () => {
      const formDetails = { modalOpen: false, formId: "", formName: "" };
      dispatch(setFormDeleteStatus(formDetails));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
