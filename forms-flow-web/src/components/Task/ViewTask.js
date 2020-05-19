import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectError, getSubmission, getForm } from 'react-formio';

import Details from './Details'
import { BPM_USER_DETAILS } from '../../apiManager/constants/apiConstants'
import { getUserToken } from '../../apiManager/services/bpmServices'
import { getTaskDetail, getTaskSubmissionDetails } from '../../apiManager/services/taskServices'
import Loading from '../../containers/Loading'
import {setLoader, setTaskSubmissionDetail} from "../../actions/taskActions";
import View from '../Form/Item/Submission/Item/View';

class ViewTask extends Component {

  render() {
        const { detail } = this.props;
        if (this.props.isLoading) {
            return (
                <Loading />
            );
        }
        return (
            <div className="container">
                <div className="main-header">
                    <Link to="/task">
                        <img src="/back.svg" alt="back" />
                    </Link>
                    <span className="ml-3">
                        <img src="/clipboard.svg" alt="Task" />
                    </span>
                    <h3>
                        <span className="task-head-details">Tasks /</span> {`${detail.name}`}
                    </h3>
                </div>
                <br />
                <Tabs id="task-details" defaultActiveKey="details">
                    <Tab eventKey="details" title="Details" id="details">
                        <Details />
                    </Tab>
                    <Tab eventKey="form" title="Form" id="form">
                        <View page="task-detail"/>
                    </Tab>
                    <Tab eventKey="history" title="History" disabled>
                        <h1>History</h1>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission,
        form: state.form.form,
        detail: state.tasks.taskDetail,
        isLoading: state.tasks.isLoading,
        options: {
            readOnly: true,
        },
        errors: [
            selectError('submission', state),
            selectError('form', state)
        ],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTask: dispatch(
            getUserToken(BPM_USER_DETAILS, (err, res) => {
                let id = window.location.pathname.split("/")[2]
                if (!err) {
                    dispatch(setLoader(true));
                    dispatch(getTaskDetail(id,(err,res)=>{
                        if(!err){
                            dispatch(getTaskSubmissionDetails(res.processInstanceId, (err,res)=>{
                                if(!err){
                                    if(res.submission_id && res.form_id){
                                        dispatch(getForm('form', res.form_id))
                                        dispatch(getSubmission('submission', res.submission_id, res.form_id));
                                    }
                                dispatch(setTaskSubmissionDetail(res));
                            }
                          }))
                      }
                  }))
                }
            })
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask)
