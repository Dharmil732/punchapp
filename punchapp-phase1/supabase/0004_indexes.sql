create index if not exists tasks_store_status_due on tasks(store_id, status, due_at);
create index if not exists task_assignees_user on task_assignees(user_id, assigned_at);
create index if not exists task_assignees_task on task_assignees(task_id);
