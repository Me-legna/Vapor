"""add in_store column to support delete game feature while keeping games in user library

Revision ID: 82bed5b27d88
Revises: 373c222f4f28
Create Date: 2023-02-20 18:13:19.484079

"""
from email.policy import default
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '82bed5b27d88'
down_revision = '373c222f4f28'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('games', sa.Column('is_in_store', sa.Boolean(), nullable=False))

    if environment == "production":
        op.execute(f"ALTER TABLE games SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('games', 'is_in_store')
    # ### end Alembic commands ###
