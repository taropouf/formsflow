"""This exposes process service."""

import json

from flask import current_app
from formsflow_api_utils.exceptions import BusinessException
from formsflow_api_utils.utils.user_context import UserContext, user_context

from formsflow_api.constants import BusinessErrorCode
from formsflow_api.models import Process
from formsflow_api.schemas import ProcessDataSchema, ProcessListRequestSchema

processSchema = ProcessDataSchema()


class ProcessService:  # pylint: disable=too-few-public-methods
    """This class manages process service."""

    @classmethod
    def get_all_process(cls, request_args):  # pylint:disable=too-many-locals
        """Get all process list."""
        dict_data = ProcessListRequestSchema().load(request_args) or {}
        page_no = dict_data.get("page_no")
        limit = dict_data.get("limit")
        sort_by = dict_data.get("sort_by", "id")
        process_id = dict_data.get("process_id")
        process_name = dict_data.get("name")
        status = dict_data.get("status").upper() if dict_data.get("status") else None
        process_type = (
            dict_data.get("process_data_type").upper()
            if dict_data.get("process_data_type")
            else None
        )
        created_by = dict_data.get("created_by")
        created_from_date = dict_data.get("created_from_date")
        created_to_date = dict_data.get("created_to_date")
        modified_from_date = dict_data.get("modified_from_date")
        modified_to_date = dict_data.get("modified_to_date")
        sort_order = dict_data.get("sort_order", "desc")
        process, count = Process.find_all_process(
            created_from=created_from_date,
            created_to=created_to_date,
            modified_from=modified_from_date,
            modified_to=modified_to_date,
            sort_by=sort_by,
            sort_order=sort_order,
            created_by=created_by,
            id=process_id,
            process_name=process_name,
            process_status=status,
            process_type=process_type,
            page_no=page_no,
            limit=limit,
        )
        return processSchema.dump(process, many=True), count

    @classmethod
    @user_context
    def create_process(cls, payload, **kwargs):
        """Save process data."""
        user: UserContext = kwargs["user"]
        tenant_key = user.tenant_key
        current_app.logger.debug("Save process data..")
        process_data = (
            json.dumps(payload["processData"])
            if payload["processType"] == "LOWCODE"
            else payload["processData"]
        )
        data = processSchema.load(payload)
        process = Process(
            name=data["name"],
            process_type=data["process_type"],
            status=data["status"],
            tenant=tenant_key,
            process_data=process_data,
            form_process_mapper_id=data.get("formProcessMapperId"),
            created_by=user.user_name,
        )
        if process:
            process.save()
            process_data = processSchema.dump(process)
            return process_data
        raise BusinessException(BusinessErrorCode.PROCESS_ID_NOT_FOUND)

    @classmethod
    def get_process_by_id(cls, process_id):
        """Get process by id."""
        current_app.logger.debug(f"Get process data for process id: {process_id}")
        process = Process.find_process_by_id(process_id)
        if process:
            return processSchema.dump(process)
        raise BusinessException(BusinessErrorCode.PROCESS_ID_NOT_FOUND)

    @classmethod
    @user_context
    def update_process(cls, process_id, payload, **kwargs):
        """Update process data."""
        current_app.logger.debug(f"Update process data for process id: {process_id}")
        user: UserContext = kwargs["user"]
        tenant_key = user.tenant_key
        process = Process.find_process_by_id(process_id)
        if process:
            if tenant_key is not None and process.tenant != tenant_key:
                raise BusinessException(BusinessErrorCode.PERMISSION_DENIED)
            process_data = payload.get("processData")
            data = processSchema.load(payload)
            data["modified_by"] = user.user_name
            if process_data is not None:
                data["process_data"] = (
                    json.dumps(process_data)
                    if process.process_type.value == "LOWCODE"
                    else process_data
                )
            process.update(data)
            return processSchema.dump(process)
        raise BusinessException(BusinessErrorCode.PROCESS_ID_NOT_FOUND)

    @classmethod
    def delete_process(cls, process_id):
        """Delete process."""
        current_app.logger.debug(f"Delete process data for process id: {process_id}")
        process = Process.find_process_by_id(process_id)
        if process:
            process.delete()
            return {"message": "Process deleted."}
        raise BusinessException(BusinessErrorCode.PROCESS_ID_NOT_FOUND)
