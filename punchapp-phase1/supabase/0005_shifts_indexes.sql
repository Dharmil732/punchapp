create index if not exists shifts_user_time on shifts(user_id, start_at);
create index if not exists shift_requests_shift on shift_requests(shift_id, status);
