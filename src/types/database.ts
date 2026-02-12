export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  is_admin: boolean;
  is_public_profile: boolean;
  show_habits_publicly: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  day_of_week: number; // 0=Sunday, 6=Saturday
  wake_time: string;
  sleep_time: string;
  work_start: string | null;
  work_end: string | null;
  created_at: string;
}

export interface FixedCommitment {
  id: string;
  user_id: string;
  title: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface HabitCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  created_at: string;
}

export interface HabitTemplate {
  id: string;
  category_id: string;
  name: string;
  description: string;
  scientific_benefit: string;
  recommended_duration_minutes: number;
  recommended_frequency_per_week: number;
  best_time_of_day: string;
  scientific_source: string;
  icon: string;
  difficulty: "easy" | "medium" | "hard";
  esteem_impact: "low" | "medium" | "high";
  created_at: string;
}

export interface UserHabit {
  id: string;
  user_id: string;
  template_id: string | null;
  custom_name: string | null;
  custom_description: string | null;
  duration_minutes: number;
  frequency_per_week: number;
  preferred_time: string;
  preferred_days: number[];
  is_active: boolean;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
  // Joined
  template?: HabitTemplate;
}

export interface HabitLog {
  id: string;
  user_habit_id: string;
  date: string;
  status: "completed" | "partial" | "skipped";
  notes: string | null;
  duration_minutes: number | null;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "founder" | "sponsor" | "streak" | "challenge" | "milestone" | "special";
  criteria_type: string | null;
  criteria_value: number | null;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  scientific_benefit: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  challenge_type: string;
  criteria: ChallengeRules;
  badge_id: string | null;
  is_active: boolean;
  created_by: string;
  icon: string;
  color: string;
  created_at: string;
  badge?: Badge;
}

export interface ChallengeRules {
  type: "consecutive_days" | "weekly_frequency" | "total_completions" | "custom";
  target_habit_category?: string;
  required_days?: number;
  required_frequency_per_week?: number;
  required_weeks?: number;
  total_completions?: number;
  custom_description?: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  joined_at: string;
  status: "active" | "completed" | "failed" | "abandoned";
  progress: number;
  completed_at: string | null;
  challenge?: Challenge;
}

export interface SocialPost {
  id: string;
  user_id: string;
  content: string;
  post_type: "achievement" | "reflection" | "motivation" | "milestone";
  related_habit_id: string | null;
  related_challenge_id: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profile?: Profile;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
}

export interface DonationGoal {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  user_id: string;
  goal_id: string | null;
  amount: number;
  message: string | null;
  is_anonymous: boolean;
  created_at: string;
  profile?: Profile;
}

export interface MotivationalMessage {
  id: string;
  message: string;
  author: string | null;
  category: "missed_habit" | "streak" | "general" | "scientific";
  scientific_source: string | null;
  is_active: boolean;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}
