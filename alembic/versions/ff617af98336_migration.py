"""migration

Revision ID: ff617af98336
Revises: 
Create Date: 2025-02-07 10:05:17.603534

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ff617af98336'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post_categories', sa.Column('id', sa.Integer(), nullable=False))
    op.add_column('post_tags', sa.Column('id', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post_tags', 'id')
    op.drop_column('post_categories', 'id')
    # ### end Alembic commands ###
