"""This exposes form bundling service."""

from typing import Set

from formsflow_api_utils.utils import DESIGNER_GROUP
from formsflow_api_utils.utils.user_context import UserContext, user_context

from formsflow_api.models import FormBundling, FormProcessMapper
from formsflow_api.schemas import FormProcessMapperSchema


class FormBundlingService:  # pylint:disable=too-few-public-methods
    """This class manages form bundling service."""

    @staticmethod
    @user_context
    def get_forms_bundle(bundle_id: int, **kwargs):
        """Get forms inside a bundle."""
        parent_form_ids: Set[str] = []
        user: UserContext = kwargs["user"]
        form_bundles = FormBundling.find_by_form_process_mapper_id(bundle_id)
        for form_bundle in form_bundles:
            parent_form_ids.append(form_bundle.parent_form_id)
        if DESIGNER_GROUP in user.roles:
            forms = FormProcessMapper.find_forms_by_parent_from_ids(parent_form_ids)
        else:
            forms = FormProcessMapper.find_forms_by_active_parent_from_ids(
                parent_form_ids
            )
        mapper_schema = FormProcessMapperSchema()
        return mapper_schema.dump(forms, many=True)
