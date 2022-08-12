"""authorization

Revision ID: ad651909dfa1
Revises: 696557aef580
Create Date: 2022-08-12 15:36:01.672592

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ad651909dfa1'
down_revision = '696557aef580'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authorization',
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.Column('modified', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.String(), nullable=False),
    sa.Column('modified_by', sa.String(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False, comment='Authorization ID'),
    sa.Column('tenant', sa.String(), nullable=True, comment='Tenant key'),
    sa.Column('auth_type', postgresql.ENUM('DASHBOARD', 'FORM', 'FILTER', name='authtype'), nullable=False, comment='Auth Type'),
    sa.Column('resource_id', sa.String(), nullable=False, comment='Resource identifier'),
    sa.Column('resource_description', sa.String(), nullable=True, comment='Resource description'),
    sa.Column('roles', postgresql.ARRAY(sa.String()), nullable=True, comment='Applicable roles'),
    sa.Column('user_name', sa.String(), nullable=True, comment='Applicable user'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_authorization_auth_type'), 'authorization', ['auth_type'], unique=False)
    op.create_index(op.f('ix_authorization_resource_id'), 'authorization', ['resource_id'], unique=False)
    op.drop_column('application', 'form_url')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('application', sa.Column('form_url', sa.VARCHAR(length=500), autoincrement=False, nullable=True))
    op.drop_index(op.f('ix_authorization_resource_id'), table_name='authorization')
    op.drop_index(op.f('ix_authorization_auth_type'), table_name='authorization')
    op.drop_table('authorization')
    # ### end Alembic commands ###
