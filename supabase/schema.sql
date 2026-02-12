-- =====================================================
-- FLORIR - Autoestima Atraves de Habitos
-- Database Schema for Supabase (PostgreSQL)
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================================================
-- PROFILES
-- =====================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  bio text,
  is_admin boolean default false,
  is_public_profile boolean default true,
  show_habits_publicly boolean default false,
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- =====================================================
-- SCHEDULES
-- =====================================================
create table if not exists public.schedules (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week between 0 and 6),
  wake_time time not null default '07:00',
  sleep_time time not null default '23:00',
  work_start time,
  work_end time,
  created_at timestamptz default now(),
  unique(user_id, day_of_week)
);

alter table public.schedules enable row level security;

create policy "Users can view own schedules"
  on public.schedules for select
  using (auth.uid() = user_id);

create policy "Users can insert own schedules"
  on public.schedules for insert
  with check (auth.uid() = user_id);

create policy "Users can update own schedules"
  on public.schedules for update
  using (auth.uid() = user_id);

create policy "Users can delete own schedules"
  on public.schedules for delete
  using (auth.uid() = user_id);

-- =====================================================
-- FIXED COMMITMENTS
-- =====================================================
create table if not exists public.fixed_commitments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz default now()
);

alter table public.fixed_commitments enable row level security;

create policy "Users can view own commitments"
  on public.fixed_commitments for select
  using (auth.uid() = user_id);

create policy "Users can insert own commitments"
  on public.fixed_commitments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own commitments"
  on public.fixed_commitments for update
  using (auth.uid() = user_id);

create policy "Users can delete own commitments"
  on public.fixed_commitments for delete
  using (auth.uid() = user_id);

-- =====================================================
-- HABIT CATEGORIES
-- =====================================================
create table if not exists public.habit_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null default '',
  icon text not null default 'Heart',
  color text not null default '#ec4899',
  created_at timestamptz default now()
);

alter table public.habit_categories enable row level security;

create policy "Categories are viewable by everyone"
  on public.habit_categories for select
  using (true);

create policy "Only admins can insert categories"
  on public.habit_categories for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can update categories"
  on public.habit_categories for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- HABIT TEMPLATES
-- =====================================================
create table if not exists public.habit_templates (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.habit_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  scientific_benefit text not null default '',
  recommended_duration_minutes integer not null default 15,
  recommended_frequency_per_week integer not null default 3,
  best_time_of_day time not null default '08:00',
  best_time_reason text not null default '',
  scientific_source text not null default '',
  icon text not null default 'Star',
  difficulty text not null default 'easy' check (difficulty in ('easy', 'medium', 'hard')),
  esteem_impact text not null default 'medium' check (esteem_impact in ('low', 'medium', 'high')),
  created_at timestamptz default now()
);

alter table public.habit_templates enable row level security;

create policy "Templates are viewable by everyone"
  on public.habit_templates for select
  using (true);

create policy "Only admins can manage templates"
  on public.habit_templates for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can update templates"
  on public.habit_templates for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- USER HABITS
-- =====================================================
create table if not exists public.user_habits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  template_id uuid references public.habit_templates(id) on delete set null,
  custom_name text,
  custom_description text,
  duration_minutes integer not null default 15,
  frequency_per_week integer not null default 3,
  preferred_time time not null default '08:00',
  preferred_days integer[] not null default '{1,2,3,4,5}',
  is_active boolean default true,
  color text not null default '#ec4899',
  icon text not null default 'Star',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_habits enable row level security;

create policy "Users can view own habits"
  on public.user_habits for select
  using (auth.uid() = user_id);

create policy "Users can view public habits"
  on public.user_habits for select
  using (
    exists (
      select 1 from public.profiles
      where id = user_id and show_habits_publicly = true
    )
  );

create policy "Users can insert own habits"
  on public.user_habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update own habits"
  on public.user_habits for update
  using (auth.uid() = user_id);

create policy "Users can delete own habits"
  on public.user_habits for delete
  using (auth.uid() = user_id);

-- =====================================================
-- HABIT LOGS
-- =====================================================
create table if not exists public.habit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_habit_id uuid references public.user_habits(id) on delete cascade not null,
  date date not null default current_date,
  status text not null default 'completed' check (status in ('completed', 'partial', 'skipped')),
  notes text,
  duration_minutes integer,
  created_at timestamptz default now(),
  unique(user_habit_id, date)
);

alter table public.habit_logs enable row level security;

create policy "Users can view own logs"
  on public.habit_logs for select
  using (
    exists (
      select 1 from public.user_habits where id = user_habit_id and user_id = auth.uid()
    )
  );

create policy "Users can insert own logs"
  on public.habit_logs for insert
  with check (
    exists (
      select 1 from public.user_habits where id = user_habit_id and user_id = auth.uid()
    )
  );

create policy "Users can update own logs"
  on public.habit_logs for update
  using (
    exists (
      select 1 from public.user_habits where id = user_habit_id and user_id = auth.uid()
    )
  );

create policy "Users can delete own logs"
  on public.habit_logs for delete
  using (
    exists (
      select 1 from public.user_habits where id = user_habit_id and user_id = auth.uid()
    )
  );

-- =====================================================
-- BADGES
-- =====================================================
create table if not exists public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null default '',
  icon text not null default 'Award',
  type text not null default 'special' check (type in ('founder', 'sponsor', 'streak', 'challenge', 'milestone', 'special')),
  criteria_type text,
  criteria_value integer,
  color text not null default '#ec4899',
  rarity text not null default 'common' check (rarity in ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz default now()
);

alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select
  using (true);

create policy "Only admins can manage badges"
  on public.badges for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can update badges"
  on public.badges for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- USER BADGES
-- =====================================================
create table if not exists public.user_badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "User badges are viewable by everyone"
  on public.user_badges for select
  using (true);

create policy "System can insert user badges"
  on public.user_badges for insert
  with check (auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =====================================================
-- CHALLENGES
-- =====================================================
create table if not exists public.challenges (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null default '',
  scientific_benefit text not null default '',
  start_date date not null,
  end_date date not null,
  duration_days integer not null,
  challenge_type text not null default 'consecutive_days',
  criteria jsonb not null default '{}',
  badge_id uuid references public.badges(id) on delete set null,
  is_active boolean default true,
  created_by uuid references public.profiles(id) on delete set null,
  icon text not null default 'Trophy',
  color text not null default '#a855f7',
  created_at timestamptz default now()
);

alter table public.challenges enable row level security;

create policy "Challenges are viewable by everyone"
  on public.challenges for select
  using (true);

create policy "Only admins can manage challenges"
  on public.challenges for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can update challenges"
  on public.challenges for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- USER CHALLENGES
-- =====================================================
create table if not exists public.user_challenges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  challenge_id uuid references public.challenges(id) on delete cascade not null,
  joined_at timestamptz default now(),
  status text not null default 'active' check (status in ('active', 'completed', 'failed', 'abandoned')),
  progress integer not null default 0,
  completed_at timestamptz,
  unique(user_id, challenge_id)
);

alter table public.user_challenges enable row level security;

create policy "Users can view own challenges"
  on public.user_challenges for select
  using (auth.uid() = user_id);

create policy "Users can view all challenge participants count"
  on public.user_challenges for select
  using (true);

create policy "Users can join challenges"
  on public.user_challenges for insert
  with check (auth.uid() = user_id);

create policy "Users can update own challenge progress"
  on public.user_challenges for update
  using (auth.uid() = user_id);

-- =====================================================
-- SOCIAL POSTS
-- =====================================================
create table if not exists public.social_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  post_type text not null default 'reflection' check (post_type in ('achievement', 'reflection', 'motivation', 'milestone')),
  related_habit_id uuid references public.user_habits(id) on delete set null,
  related_challenge_id uuid references public.challenges(id) on delete set null,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamptz default now()
);

alter table public.social_posts enable row level security;

create policy "Posts are viewable by everyone"
  on public.social_posts for select
  using (true);

create policy "Users can create posts"
  on public.social_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own posts"
  on public.social_posts for update
  using (auth.uid() = user_id);

create policy "Users can delete own posts"
  on public.social_posts for delete
  using (auth.uid() = user_id);

-- =====================================================
-- POST LIKES
-- =====================================================
create table if not exists public.post_likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.social_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy "Likes are viewable by everyone"
  on public.post_likes for select
  using (true);

create policy "Users can like posts"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

create policy "Users can unlike posts"
  on public.post_likes for delete
  using (auth.uid() = user_id);

-- =====================================================
-- POST COMMENTS
-- =====================================================
create table if not exists public.post_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.social_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.post_comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.post_comments for select
  using (true);

create policy "Users can comment"
  on public.post_comments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.post_comments for delete
  using (auth.uid() = user_id);

-- =====================================================
-- DONATION GOALS
-- =====================================================
create table if not exists public.donation_goals (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null default '',
  target_amount numeric(10,2) not null default 0,
  current_amount numeric(10,2) not null default 0,
  is_active boolean default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.donation_goals enable row level security;

create policy "Goals are viewable by everyone"
  on public.donation_goals for select
  using (true);

create policy "Only admins can manage goals"
  on public.donation_goals for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can update goals"
  on public.donation_goals for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- DONATIONS
-- =====================================================
create table if not exists public.donations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  goal_id uuid references public.donation_goals(id) on delete set null,
  amount numeric(10,2) not null,
  message text,
  is_anonymous boolean default false,
  created_at timestamptz default now()
);

alter table public.donations enable row level security;

create policy "Non-anonymous donations are viewable"
  on public.donations for select
  using (is_anonymous = false or auth.uid() = user_id);

create policy "Users can donate"
  on public.donations for insert
  with check (auth.uid() = user_id);

-- =====================================================
-- MOTIVATIONAL MESSAGES
-- =====================================================
create table if not exists public.motivational_messages (
  id uuid default uuid_generate_v4() primary key,
  message text not null,
  author text,
  category text not null default 'general' check (category in ('missed_habit', 'streak', 'general', 'scientific')),
  scientific_source text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.motivational_messages enable row level security;

create policy "Messages are viewable by everyone"
  on public.motivational_messages for select
  using (true);

create policy "Only admins can manage messages"
  on public.motivational_messages for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- ADMIN LOGS
-- =====================================================
create table if not exists public.admin_logs (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references public.profiles(id) on delete set null not null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz default now()
);

alter table public.admin_logs enable row level security;

create policy "Only admins can view logs"
  on public.admin_logs for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Only admins can insert logs"
  on public.admin_logs for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );

  -- Award co-founder badge
  insert into public.user_badges (user_id, badge_id)
  select new.id, id from public.badges where type = 'founder' limit 1;

  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update likes count
create or replace function public.update_likes_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.social_posts set likes_count = likes_count + 1 where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.social_posts set likes_count = likes_count - 1 where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

drop trigger if exists on_like_change on public.post_likes;
create trigger on_like_change
  after insert or delete on public.post_likes
  for each row execute function public.update_likes_count();

-- Function to update comments count
create or replace function public.update_comments_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.social_posts set comments_count = comments_count + 1 where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.social_posts set comments_count = comments_count - 1 where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

drop trigger if exists on_comment_change on public.post_comments;
create trigger on_comment_change
  after insert or delete on public.post_comments
  for each row execute function public.update_comments_count();

-- Function to update donation goal amount
create or replace function public.update_donation_amount()
returns trigger as $$
begin
  update public.donation_goals
  set current_amount = current_amount + new.amount,
      updated_at = now()
  where id = new.goal_id;

  -- Award sponsor badge
  insert into public.user_badges (user_id, badge_id)
  select new.user_id, id from public.badges where type = 'sponsor' limit 1
  on conflict (user_id, badge_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_donation_created on public.donations;
create trigger on_donation_created
  after insert on public.donations
  for each row execute function public.update_donation_amount();

-- =====================================================
-- SEED DATA: Default Badges
-- =====================================================
insert into public.badges (name, description, icon, type, color, rarity) values
  ('Co-Fundadora', 'Voce faz parte da historia! Como uma das primeiras a se cadastrar, voce ajudou a construir esta comunidade.', 'Crown', 'founder', '#f59e0b', 'legendary'),
  ('Patrocinadora', 'Obrigada pelo seu apoio! Sua doacao ajuda a manter este projeto vivo e gratuito para todas.', 'Heart', 'sponsor', '#ec4899', 'epic'),
  ('7 Dias de Forca', 'Completou um habito por 7 dias consecutivos. Voce esta criando uma nova versao de si mesma!', 'Flame', 'streak', '#f97316', 'common'),
  ('21 Dias de Transformacao', 'Completou um habito por 21 dias consecutivos. A ciencia mostra que voce esta formando um novo padrao neural!', 'Zap', 'streak', '#a855f7', 'rare'),
  ('66 Dias - Habito Consolidado', 'Completou um habito por 66 dias consecutivos. Segundo pesquisas, seu habito agora e automatico!', 'Trophy', 'streak', '#eab308', 'epic'),
  ('Primeira Conquista', 'Completou seu primeiro habito. Todo grande caminho comeca com um unico passo!', 'Star', 'milestone', '#22c55e', 'common'),
  ('Semana Perfeita', 'Completou todos os habitos planejados em uma semana inteira. Que consistencia incrivel!', 'Calendar', 'milestone', '#3b82f6', 'rare'),
  ('Desafiante', 'Completou seu primeiro desafio. Voce provou que pode ir alem!', 'Award', 'challenge', '#f43f5e', 'rare')
on conflict do nothing;
