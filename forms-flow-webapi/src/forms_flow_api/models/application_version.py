"""This manages Application Version Data."""
from .base_model import BaseModel
from .db import db


class ApplicationVersion(BaseModel, db.Model):
    """ApplicationVersion Model for storing application version related details."""

    __tablename__ = 'FAI_APPLICATION_AUDIT'

    application_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    application_name = db.Column(db.String(100), nullable=False)
    application_status = db.Column(db.String(10), nullable=False)
    mapper_id = db.Column(db.ForeignKey('FORM_PROCESS_MAPPER.mapper_id'), nullable=False)
    created_by = db.Column(db.String(20), nullable=False)
    created_on = db.Column(db.Date(), nullable=False)
    modified_by = db.Column(db.String(20), nullable=False)
    modified_on = db.Column(db.Date(), nullable=False)
    submission_id = db.Column(db.String(30), nullable=False)
    process_instance_id = db.Column(db.String(30), nullable=False)
    revision_no = db.Column(db.Integer, nullable=False)

    FORM_PROCESS_MAPPER = db.relationship(
        'Application',
        primaryjoin='ApplicationVersion.mapper_id == Application.mapper_id',
        backref='FAI_APPLICATION_AUDIT')
