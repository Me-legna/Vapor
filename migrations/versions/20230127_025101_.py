"""game tables and relationships

Revision ID: b38168c841b2
Revises:
Create Date: 2023-01-27 02:51:01.201083

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'b38168c841b2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('systems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('developer_alias', sa.String(length=40), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('developer_alias'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('developer_id', sa.Integer(), nullable=False),
    sa.Column('release_date', sa.Date(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('about', sa.Text(), nullable=False),
    sa.Column('rating', sa.Enum('E', 'T', 'M', name='esrb_ratings'), nullable=False),
    sa.ForeignKeyConstraint(['developer_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('game_genres',
    sa.Column('games', sa.Integer(), nullable=False),
    sa.Column('genres', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['games'], ['games.id'], ),
    sa.ForeignKeyConstraint(['genres'], ['genres.id'], ),
    sa.PrimaryKeyConstraint('games', 'genres')
    )
    op.create_table('game_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('is_preview', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('library',
    sa.Column('games', sa.Integer(), nullable=False),
    sa.Column('users', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['games'], ['games.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.PrimaryKeyConstraint('games', 'users')
    )
    op.create_table('system_availability',
    sa.Column('games', sa.Integer(), nullable=False),
    sa.Column('systems', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['games'], ['games.id'], ),
    sa.ForeignKeyConstraint(['systems'], ['systems.id'], ),
    sa.PrimaryKeyConstraint('games', 'systems')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE genres SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE systems SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE games SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE game_genres SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE game_images SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE library SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE system_availability SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('system_availability')
    op.drop_table('library')
    op.drop_table('game_images')
    op.drop_table('game_genres')
    op.drop_table('games')
    op.drop_table('users')
    op.drop_table('systems')
    op.drop_table('genres')
    # ### end Alembic commands ###
