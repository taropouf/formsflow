"""This manages Application submission Data."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import and_, func, or_
from sqlalchemy.sql.expression import text

from formsflow_api.utils import FILTER_MAPS, validate_sort_order_and_order_by

from .audit_mixin import AuditDateTimeMixin, AuditUserMixin
from .base_model import BaseModel
from .db import db
from .form_process_mapper import FormProcessMapper


class Application(
    AuditDateTimeMixin, AuditUserMixin, BaseModel, db.Model
):  # pylint: disable=too-many-public-methods
    """This class manages application against each form."""

    id = db.Column(db.Integer, primary_key=True)
    application_name = db.Column(db.String(100), nullable=False)
    application_status = db.Column(db.String(100), nullable=False)
    form_process_mapper_id = db.Column(
        db.Integer, db.ForeignKey("form_process_mapper.id"), nullable=False
    )
    form_url = db.Column(db.String(500), nullable=True)
    process_instance_id = db.Column(db.String(100), nullable=True)
    process_key = db.Column(db.String(50), nullable=True)
    process_name = db.Column(db.String(100), nullable=True)

    @classmethod
    def create_from_dict(cls, application_info: dict) -> Application:
        """Create new application."""
        if application_info:
            application = Application()
            application.application_name = application_info["application_name"]
            application.created_by = application_info["created_by"]
            application.application_status = application_info["application_status"]
            application.form_process_mapper_id = application_info[
                "form_process_mapper_id"
            ]
            application.form_url = application_info["form_url"]
            application.process_key = application_info["process_key"]
            application.process_name = application_info["process_name"]
            application.save()
            return application
        return None

    def update(self, mapper_info: dict):
        """Update application."""
        self.update_from_dict(
            [
                "application_name",
                "application_status",
                "form_url",
                "form_process_mapper_id",
                "process_instance_id",
                "modified_by",
            ],
            mapper_info,
        )
        self.commit()

    @classmethod
    def find_by_id(cls, application_id: int) -> Application:
        """Find application that matches the provided id."""
        return cls.query.filter_by(id=application_id).first()

    @classmethod
    def find_all_application_status(cls):
        """Find all application status"""
        return cls.query.distinct(Application.application_status).all()

    @classmethod
    def find_by_ids(cls, application_ids) -> Application:
        """Find application that matches the provided id."""
        return cls.query.filter(cls.id.in_(application_ids)).order_by(
            Application.id.desc()
        )

    @classmethod
    def find_all(
        cls,
        page_no: int,
        limit: int,
        order_by: str,
        sort_order: str,
        **filters,
    ) -> Application:
        """Fetch all application."""
        query = Application.filter_conditions(**filters)
        order_by, sort_order = validate_sort_order_and_order_by(order_by, sort_order)
        if order_by and sort_order:
            query = query.order_by(text(f"Application.{order_by} {sort_order}"))
        total_count = query.count()
        pagination = query.paginate(page_no, limit)
        return pagination.items, total_count
        # if page_no == 0:
        #     result = cls.query.order_by(Application.id.desc()).all()
        # else:
        #     result = (
        #         cls.query.order_by(Application.id.desc())
        #         .paginate(page_no, limit, False)
        #         .items
        #     )
        # return result

    @classmethod
    def filter_conditions(cls, **filters):
        """This method creates dynamic filter conditions based on the input param"""
        filter_conditions = []
        for key, value in filters.items():
            if value:
                filter_map = FILTER_MAPS[key]
                condition = Application.create_filter_condition(
                    model=Application,
                    column_name=filter_map["field"],
                    operator=filter_map["operator"],
                    value=value,
                )
                filter_conditions.append(condition)
        query = cls.query.filter(*filter_conditions) if filter_conditions else cls.query
        return query

    @classmethod
    def find_all_by_user(  # pylint: disable=too-many-arguments
        cls,
        user_id: str,
        page_no: int,
        limit: int,
        order_by: str,
        sort_order: str,
        **filters,
    ) -> Application:
        """Fetch applications list based on searching parameters for Non-reviewer"""
        query = Application.filter_conditions(**filters)
        query = query.filter(Application.created_by == user_id)
        order_by, sort_order = validate_sort_order_and_order_by(order_by, sort_order)
        if order_by and sort_order:
            query = query.order_by(text(f"Application.{order_by} {sort_order}"))

        total_count = query.count()
        pagination = query.paginate(page_no, limit)
        return pagination.items, total_count

    @classmethod
    def find_id_by_user(cls, application_id: int, user_id: str) -> Application:
        """Find application that matches the provided id."""
        return cls.query.filter(
            and_(Application.id == application_id, Application.created_by == user_id)
        ).one_or_none()

    @classmethod
    def find_all_by_user_count(cls, user_id: str) -> Application:
        """Fetch all application."""
        return cls.query.filter(Application.created_by == user_id).count()

    @classmethod
    def find_by_form_id(cls, form_id, page_no: int, limit: int):
        """Fetch all application by form_id."""
        if page_no == 0:
            result = cls.query.filter(
                Application.form_url.like("%" + form_id + "%")
            ).order_by(Application.id.desc())
        else:
            result = (
                cls.query.filter(Application.form_url.like("%" + form_id + "%"))
                .order_by(Application.id.desc())
                .paginate(page_no, limit, False)
                .items
            )
        return result

    @classmethod
    def find_by_form_names(  # pylint: disable=too-many-arguments
        cls,
        form_names: str,
        page_no: int,
        limit: int,
        order_by: str,
        sort_order: str,
        **filters,
    ):
        """Fetch applications list based on searching parameters for Reviewer"""
        query = Application.filter_conditions(**filters)
        query = query.filter(Application.application_name.in_(form_names))
        order_by, sort_order = validate_sort_order_and_order_by(order_by, sort_order)
        if order_by and sort_order:
            query = query.order_by(text(f"Application.{order_by} {sort_order}"))
        total_count = query.count()
        pagination = query.paginate(page_no, limit)
        return pagination.items, total_count

    @classmethod
    def find_applications_by_process_key(  # pylint: disable=too-many-arguments
        cls,
        page_no: int,
        limit: int,
        order_by: str,
        sort_order: str,
        process_key: str,
        **filters,
    ):
        """Fetch applications list based on searching parameters for Reviewer"""
        print("entering...", process_key)
        query = Application.filter_conditions(**filters)
        query = query.join(
            FormProcessMapper,
            Application.form_process_mapper_id == FormProcessMapper.id,
        ).filter(FormProcessMapper.process_key.in_(process_key))
        order_by, sort_order = validate_sort_order_and_order_by(order_by, sort_order)
        if order_by and sort_order:
            query = query.order_by(text(f"Application.{order_by} {sort_order}"))
        total_count = query.count()
        pagination = query.paginate(page_no, limit)
        return pagination.items, total_count

    @classmethod
    def find_auth_application_by_process_key(  # pylint: disable=too-many-arguments
        cls,
        process_key: str,
        application_id: int,
    ):
        """Fetch applications list based on searching parameters for Reviewer"""
        print("entering...", process_key, application_id)
        query = (
            cls.query.filter(Application.id == application_id)
            .join(
                FormProcessMapper,
                Application.form_process_mapper_id == FormProcessMapper.id,
            )
            .filter(FormProcessMapper.process_key.in_(process_key))
            .first()
        )
        return query

    @classmethod
    def find_id_by_form_names(cls, application_id: int, form_names):
        """Fetch applications by id."""
        return cls.query.filter(
            and_(
                Application.application_name.in_(form_names),
                Application.id == application_id,
            )
        ).one_or_none()

    @classmethod
    def find_by_form_id_user(cls, form_id, user_id: str, page_no: int, limit: int):
        """Fetch applications by form_id."""
        if page_no == 0:
            result = (
                cls.query.filter(Application.form_url.like("%" + form_id + "%"))
                .filter(Application.created_by == user_id)
                .order_by(Application.id.desc())
            )
        else:
            result = (
                cls.query.filter(Application.form_url.like("%" + form_id + "%"))
                .filter(Application.created_by == user_id)
                .order_by(Application.id.desc())
                .paginate(page_no, limit, False)
                .items
            )
        return result

    @classmethod
    def find_by_form_ids(cls, form_ids, page_no: int, limit: int):
        """Fetch application based on multiple form ids."""
        if page_no == 0:
            result = cls.query.filter(
                or_(
                    Application.form_url.like("%" + form_id + "%")
                    for form_id in form_ids
                )
            ).order_by(Application.id.desc())
        else:
            result = (
                cls.query.filter(
                    or_(
                        Application.form_url.like("%" + form_id + "%")
                        for form_id in form_ids
                    )
                )
                .order_by(Application.id.desc())
                .paginate(page_no, limit, False)
                .items
            )
        return result

    @classmethod
    def find_all_by_form_id_count(cls, form_id):
        """Fetch all application."""
        return cls.query.filter(Application.form_url.like("%" + form_id + "%")).count()

    @classmethod
    def find_all_by_form_id_user_count(cls, form_id, user_id: str):
        """Fetch all application."""
        return (
            cls.query.filter(Application.form_url.like("%" + form_id + "%"))
            .filter(Application.created_by == user_id)
            .count()
        )

    @classmethod
    def find_aggregated_applications(cls, from_date: str, to_date: str):
        """Fetch aggregated applications ordered by created date."""
        result_proxy = (
            db.session.query(
                Application.form_process_mapper_id,
                FormProcessMapper.form_name,
                func.count(Application.form_process_mapper_id).label("count"),
            )
            .join(
                FormProcessMapper,
                FormProcessMapper.id == Application.form_process_mapper_id,
            )
            .filter(
                and_(
                    Application.created >= from_date,
                    Application.created <= to_date,
                )
            )
            .group_by(Application.form_process_mapper_id, FormProcessMapper.form_name)
        )

        return [dict(row) for row in result_proxy]

    @classmethod
    def find_aggregated_applications_modified(
        cls, from_date: datetime, to_date: datetime
    ):
        """Fetch aggregated applications ordered by created date."""
        result_proxy = (
            db.session.query(
                Application.form_process_mapper_id,
                FormProcessMapper.form_name,
                func.count(Application.form_process_mapper_id).label("count"),
            )
            .join(
                FormProcessMapper,
                FormProcessMapper.id == Application.form_process_mapper_id,
            )
            .filter(
                and_(
                    Application.modified >= from_date,
                    Application.modified <= to_date,
                )
            )
            .group_by(Application.form_process_mapper_id, FormProcessMapper.form_name)
        )

        return [dict(row) for row in result_proxy]

    @classmethod
    def find_aggregated_application_status(
        cls, mapper_id: int, from_date: str, to_date: str
    ):
        """Fetch aggregated application status corresponding
        to mapper_id ordered by created date."""
        result_proxy = (
            db.session.query(
                Application.application_status,
                Application.application_name,
                func.count(Application.application_name).label("count"),
            )
            .join(
                FormProcessMapper,
                FormProcessMapper.id == Application.form_process_mapper_id,
            )
            .filter(
                and_(
                    Application.created >= from_date,
                    Application.created <= to_date,
                    Application.form_process_mapper_id == mapper_id,
                )
            )
            .group_by(Application.application_status, Application.application_name)
        )

        return result_proxy

    @classmethod
    def find_aggregated_application_status_modified(
        cls, mapper_id: int, from_date: str, to_date: str
    ):
        """Fetch aggregated application status corresponding
        to mapper_id ordered by modified date.."""
        result_proxy = (
            db.session.query(
                Application.application_name,
                Application.application_status,
                func.count(Application.application_name).label("count"),
            )
            .join(
                FormProcessMapper,
                FormProcessMapper.id == Application.form_process_mapper_id,
            )
            .filter(
                and_(
                    Application.modified >= from_date,
                    Application.modified <= to_date,
                    Application.form_process_mapper_id == mapper_id,
                )
            )
            .group_by(Application.application_name, Application.application_status)
        )

        return result_proxy

    @classmethod
    def get_total_application_corresponding_to_mapper_id(
        cls, form_process_mapper_id: int
    ):
        """This method resturns the total applications corresponding to a form_process_mapper"""
        result_proxy = (
            db.session.query(func.count(Application.id).label("count"))
            .join(
                FormProcessMapper,
                FormProcessMapper.id == Application.form_process_mapper_id,
            )
            .filter(FormProcessMapper.id == form_process_mapper_id)
        )
        # It always returns a list of one element with count denoting total number of applications
        return [dict(row) for row in result_proxy][0]["count"]
