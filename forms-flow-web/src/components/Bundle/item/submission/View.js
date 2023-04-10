import React, { useEffect, useState } from "react";
import BundleSubmissionView from "./BundleSubmissionView";
import { 
  setBundleSelectedForms,
} from "../../../../actions/bundleActions";
import { setFormFailureErrorData } from "../../../../actions/formActions";
import { getFormProcesses } from "../../../../apiManager/services/processServices";
import { executeRule } from "../../../../apiManager/services/bundleServices";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Errors } from "react-formio/lib/components";
import Loading from "../../../../containers/Loading";

const BundleView = ({ bundleIdProp }) => {
  const { bundleId } = useParams();
  const dispatch = useDispatch();
  const bundleData = useSelector((state) => state.process.formProcessList);
  const selectedForms = useSelector((state) => state.bundle.selectedForms);
  const bundleSubmission = useSelector(
    (state) => state.bundle.bundleSubmission
  );
  const { error } = useSelector((state) => state.form);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getFormProcesses(bundleIdProp || bundleId, (err, data) => {
        if (err) {
          dispatch(setFormFailureErrorData("form", err));
          setLoading(false);
        } else {
          executeRule(bundleSubmission || {}, data.id)
            .then((res) => {
              dispatch(setBundleSelectedForms(res.data));
            })
            .catch((err) => {
              dispatch(setFormFailureErrorData("form", err));
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
    );
    return () => {
      dispatch(setBundleSelectedForms([]));
    };
  }, [bundleId, dispatch, bundleIdProp]);
 
  if (loading) {
    return (
      <div data-testid="loading-view-component">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="d-flex align-items-center">
        <h3 className="px-3 py-2 text-bold">{bundleData.formName}</h3>
      </div>
      <div>
        {!selectedForms.length ? <Errors errors={error} /> : ""}
        {selectedForms.length ? <BundleSubmissionView readOnly={true} /> : ""}
      </div>
    </>
  );
};

export default BundleView;
