"""add user and post models

Revision ID: 0683cac4c111
Revises: ff617af98336
Create Date: 2025-02-07 16:13:35.012740

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '0683cac4c111'
down_revision: Union[str, None] = 'ff617af98336'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_comments_id', table_name='comments')
    op.drop_table('comments')
    op.drop_table('post_categories')
    op.drop_index('ix_categories_id', table_name='categories')
    op.drop_index('ix_categories_slug', table_name='categories')
    op.drop_table('categories')
    op.drop_index('ix_subscribers_id', table_name='subscribers')
    op.drop_table('subscribers')
    op.drop_table('post_tags')
    op.drop_index('ix_tags_id', table_name='tags')
    op.drop_table('tags')
    op.alter_column('posts', 'title',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('posts', 'content',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=True)
    op.alter_column('posts', 'author_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('posts', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_index('ix_posts_slug', table_name='posts')
    op.drop_column('posts', 'status')
    op.drop_column('posts', 'updated_at')
    op.drop_column('posts', 'excerpt')
    op.drop_column('posts', 'slug')
    op.drop_column('posts', 'published_at')
    op.drop_column('posts', 'is_featured')
    op.drop_column('posts', 'featured_image_url')
    op.drop_column('posts', 'view_count')
    op.add_column('users', sa.Column('is_active', sa.Boolean(), nullable=True))
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'password_hash',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'bio',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.alter_column('users', 'is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.alter_column('users', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_constraint('users_email_key', 'users', type_='unique')
    op.drop_constraint('users_username_key', 'users', type_='unique')
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.drop_column('users', 'updated_at')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.create_unique_constraint('users_username_key', 'users', ['username'])
    op.create_unique_constraint('users_email_key', 'users', ['email'])
    op.alter_column('users', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('users', 'is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.alter_column('users', 'bio',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('users', 'password_hash',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('users', 'is_active')
    op.add_column('posts', sa.Column('view_count', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('featured_image_url', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('posts', sa.Column('is_featured', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('published_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('posts', sa.Column('slug', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('excerpt', sa.TEXT(), autoincrement=False, nullable=True))
    op.add_column('posts', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('posts', sa.Column('status', postgresql.ENUM('draft', 'published', 'archived', name='poststatus'), autoincrement=False, nullable=False))
    op.create_index('ix_posts_slug', 'posts', ['slug'], unique=True)
    op.alter_column('posts', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('posts', 'author_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('posts', 'content',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=False)
    op.alter_column('posts', 'title',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.create_table('tags',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('tags_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='tags_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_tags_id', 'tags', ['id'], unique=False)
    op.create_table('post_tags',
    sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='post_tags_post_id_fkey'),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name='post_tags_tag_id_fkey'),
    sa.PrimaryKeyConstraint('post_id', 'tag_id', name='post_tags_pkey')
    )
    op.create_table('subscribers',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('subscribed_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='subscribers_pkey'),
    sa.UniqueConstraint('email', name='subscribers_email_key')
    )
    op.create_index('ix_subscribers_id', 'subscribers', ['id'], unique=False)
    op.create_table('categories',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('categories_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('slug', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('parent_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['categories.id'], name='categories_parent_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='categories_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_categories_slug', 'categories', ['slug'], unique=True)
    op.create_index('ix_categories_id', 'categories', ['id'], unique=False)
    op.create_table('post_categories',
    sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('category_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name='post_categories_category_id_fkey'),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='post_categories_post_id_fkey'),
    sa.PrimaryKeyConstraint('post_id', 'category_id', name='post_categories_pkey')
    )
    op.create_table('comments',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('parent_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('content', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('is_approved', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['comments.id'], name='comments_parent_id_fkey'),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='comments_post_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='comments_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='comments_pkey')
    )
    op.create_index('ix_comments_id', 'comments', ['id'], unique=False)
    # ### end Alembic commands ###
