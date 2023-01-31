import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { Translation, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const FileModal = React.memo(({ modalOpen = false, onClose, forms }) => {
  const formUploadList = useSelector(
    (state) => state.formCheckList.formUploadFormList
  );
  const formUploadCounter = useSelector(
    (state) => state.formCheckList.formUploadCounter
  );
  const formUploadFailureCounter = useSelector(
    (state) => state.formCheckList.formUploadFailureCounter
  );
  const [formsUploaded, setFormsUploaded] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (formUploadList.length) {
      const uploadloded = (formUploadCounter / formUploadList.length) * 100;
      setFormsUploaded(uploadloded);
      uploadloded === 100 ? toast.success(t("Form Sucessfully uploaded")) : '';
    }
  }, [formUploadCounter, formUploadList]);
  return (
    <>
      <Modal show={modalOpen} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>
            <b>
              <Translation>{(t) => t("File Upload Status")}</Translation>
            </b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingBottom: "7px", color: "#450ccb", fontWeight: "bold" }}>
            {`${formUploadCounter} of ${formUploadList.length} ${formUploadList.length > 1
              ? t("forms uploaded")
              : t("form uploaded")
              }
            `}
            {formUploadList.length !== formUploadCounter + formUploadFailureCounter ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              ""
            )}
            {formUploadFailureCounter !== 0 && <span className="fileupload-fail">
              {
                formUploadFailureCounter !== 0 ? `Failed to upload ${formUploadFailureCounter} ${formUploadFailureCounter > 1 ? "forms...!" : "form...!"}` : ''
              }
            </span>}
          </div>
          {formUploadList.length ? (
            <div className="progress" style={{ height: "5px", marginTop: "11px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={formsUploaded}
                aria-label="upload-status"
                aria-valuemax={`${formsUploaded}`}
                style={{ width: `${formsUploaded === 100 ? "100%" : `${formsUploaded}%`}`, backgroundColor: `${formsUploaded === 100 ? "#00FF00" : ""}` }}
              ></div>
            </div>
          ) : (
            <div>
              <Translation>{(t) => t("No forms found")}</Translation>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>

          <Button style={{ width: "20%" }} type="button" className="btn btn-default" onClick={onClose}>
            <Translation>{(t) => t("Close")}</Translation>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default FileModal;
