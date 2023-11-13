"""Added default filter

Revision ID: 91f9cd061108
Revises: e8459a47ec29
Create Date: 2023-11-13 12:21:47.163682

"""
from alembic import op
import sqlalchemy as sa
from formsflow_api.models import Filter

# revision identifiers, used by Alembic.
revision = '91f9cd061108'
down_revision = 'e8459a47ec29'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # Add 'All tasks' filter as default if no other filters available.
    conn = op.get_bind()
    filter_entry = conn.execute(sa.text("SELECT * FROM Filter")).fetchone()

    if not filter_entry:
        filter_obj = Filter()
        filter_obj.name = "All Tasks"
        filter_obj.variables = [{"name": "applicationId", "label": "Application Id"},{"name": "formName", "label": "Form Name"}]
        filter_obj.status = 'active'
        filter_obj.created_by = 'system'
        filter_obj.creted = 'now()'
        filter_obj.criteria = {}
        filter_obj.users = {}
        filter_obj.roles = {}
        filter_obj.task_visible_attributes = {
                "applicationId": True,
                "dueDate": True,
                "priority": True,
                "assignee": True,
                "taskTitle": True,
                "createdDate": True,
                "groups": True,
                "followupDate": True,
            }
        filter_obj.save()  
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
