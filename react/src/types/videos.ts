export type Videos = {
  data: Datum[];
  config: Config;
  paginate: Paginate;
};

export type Config = {
  archive: Archive;
  default_view: DefaultView;
  subscriptions: Subscriptions;
  downloads: Downloads;
  application: Application;
  scheduler: Scheduler;
};

export type Application = {
  app_root: string;
  cache_dir: string;
  videos: string;
  colors: string;
  enable_cast: boolean;
  enable_snapshot: boolean;
  REDIS_HOST: string;
  es_url: string;
  es_auth: string[];
  HOST_UID: number;
  HOST_GID: number;
};

export type Archive = {
  sort_by: string;
  sort_order: string;
  page_size: number;
};

export type DefaultView = {
  home: string;
  channel: string;
  downloads: string;
  playlist: string;
  grid_items: number;
};

export type Downloads = {
  limit_speed: boolean;
  sleep_interval: number;
  autodelete_days: boolean;
  format: boolean;
  add_metadata: boolean;
  add_thumbnail: boolean;
  subtitle: boolean;
  subtitle_source: boolean;
  subtitle_index: boolean;
  comment_max: boolean;
  comment_sort: string;
  cookie_import: boolean;
  throttledratelimit: boolean;
  integrate_ryd: boolean;
  integrate_sponsorblock: boolean;
  format_sort: boolean;
};

export type Scheduler = {
  update_subscribed: boolean;
  download_pending: boolean;
  check_reindex: CheckReindex;
  check_reindex_days: number;
  thumbnail_check: CheckReindex;
  run_backup: boolean;
  run_backup_rotate: number;
  version_check: VersionCheck;
};

export type CheckReindex = {
  minute: string;
  hour: string;
  day_of_week: string;
};

export type VersionCheck = {
  minute: number;
  hour: number;
  day_of_week: string;
};

export type Subscriptions = {
  auto_download: boolean;
  channel_size: number;
  live_channel_size: number;
  shorts_channel_size: number;
  auto_start: boolean;
};

export type Datum = {
  active: boolean;
  category: string[];
  channel: Channel;
  date_downloaded: number;
  description: string;
  media_size: number;
  media_url: string;
  player: Player;
  published: string;
  stats: Stats;
  streams: Stream[];
  tags: string[];
  title: string;
  vid_last_refresh: string;
  vid_thumb_base64: boolean;
  vid_thumb_url: string;
  vid_type: string;
  youtube_id: string;
  playlist?: string[];
};

export type Channel = {
  channel_active: boolean;
  channel_banner_url: string;
  channel_description: string;
  channel_id: string;
  channel_last_refresh: string;
  channel_name: string;
  channel_subs: number;
  channel_subscribed: boolean;
  channel_thumb_url: string;
  channel_tvart_url: string;
  channel_views: number;
};

export type Player = {
  watched: boolean;
  duration: number;
  duration_str: string;
};

export type Stats = {
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: null;
};

export type Stream = {
  type: string;
  index: number;
  codec: string;
  width?: number;
  height?: number;
  bitrate: number;
};

export type Paginate = {
  page_size: number;
  page_from: number;
  prev_pages: boolean;
  current_page: number;
  max_hits: boolean;
  params: string;
  last_page: boolean;
  next_pages: any[];
  total_hits: number;
};
