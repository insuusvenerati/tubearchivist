export type WatchTypes = 'watched' | 'unwatched' | 'continue';
export type VideoTypes = 'videos' | 'streams' | 'shorts';

export type User = {
  sessionid: string;
  csrftoken: string;
};

export type FilterType = {
  page?: number;
  playlist?: string;
  channel?: string;
  watch?: WatchTypes;
  sort?: SortByType;
  order?: SortOrderType;
  type?: VideoTypes;
};

export type PlayerType = {
  watched: boolean;
  duration: number;
  duration_str: string;
  progress: number;
};

export type StatsType = {
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: number;
};

export type StreamType = {
  type: string;
  index: number;
  codec: string;
  width?: number;
  height?: number;
  bitrate: number;
};

export type Subtitles = {
  ext: string;
  url: string;
  name: string;
  lang: string;
  source: string;
  media_url: string;
};

export type VideoType = {
  active: boolean;
  category: string[];
  channel: ChannelType;
  date_downloaded: number;
  description: string;
  comment_count?: number;
  media_size: number;
  media_url: string;
  player: PlayerType;
  published: string;
  stats: StatsType;
  streams: StreamType[];
  subtitles: Subtitles[];
  tags: string[];
  title: string;
  vid_last_refresh: string;
  vid_thumb_base64: boolean;
  vid_thumb_url: string;
  vid_type: string;
  youtube_id: string;
};

export type DownloadsType = {
  limit_speed: boolean;
  sleep_interval: number;
  autodelete_days: boolean;
  format: boolean;
  format_sort: boolean;
  add_metadata: boolean;
  add_thumbnail: boolean;
  subtitle: boolean;
  subtitle_source: boolean;
  subtitle_index: boolean;
  comment_max: boolean;
  comment_sort: string;
  cookie_import: boolean;
  throttledratelimit: boolean;
  extractor_lang: boolean;
  integrate_ryd: boolean;
  integrate_sponsorblock: boolean;
};

export type ConfigType = {
  enable_cast: boolean;
  downloads: DownloadsType;
};

export type VideoResponseType = {
  data?: VideoType[];
  config?: ConfigType;
  paginate?: PaginationType;
};

export type ContinueVidsType = {
  data?: VideoType[];
  config?: ConfigType;
  paginate?: PaginationType;
};

export type SortByType = 'published' | 'downloaded' | 'views' | 'likes' | 'duration' | 'filesize';
export type SortOrderType = 'asc' | 'desc';
export type ViewLayoutType = 'grid' | 'list';

export type PaginationType = {
  page_size?: number;
  page_from?: number;
  prev_pages?: false | number[];
  current_page: number;
  max_hits?: boolean;
  params?: string;
  last_page?: number;
  next_pages?: [];
  total_hits?: number;
};

type ChannelOverwritesType = {
  download_format?: string;
  autodelete_days?: number;
  index_playlists?: boolean;
  integrate_sponsorblock?: boolean;
  subscriptions_channel_size?: number;
  subscriptions_live_channel_size?: number;
  subscriptions_shorts_channel_size?: number;
};

export type ChannelType = {
  channel_active: boolean;
  channel_banner_url: string;
  channel_description: string;
  channel_id: string;
  channel_last_refresh: string;
  channel_name: string;
  channel_overwrites?: ChannelOverwritesType;
  channel_subs: number;
  channel_subscribed: boolean;
  channel_tags: string[];
  channel_thumb_url: string;
  channel_tvart_url: string;
  channel_views: number;
};

export type ChannelsListResponse = {
  data: ChannelType[];
  paginate: PaginationType;
  config?: ConfigType;
};

export type ChannelsLoaderDataType = {
  userConfig: UserMeType;
};

export type UserMeType = {
  id: number;
  name: string;
  is_superuser: boolean;
  is_staff: boolean;
  groups: [];
  user_permissions: [];
  last_login: string;
  config: UserConfigType;
};

export type UserConfigType = {
  stylesheet?: ColourVariants;
  page_size?: number;
  sort_by?: SortByType;
  sort_order?: SortOrderType;
  view_style_home?: ViewLayoutType;
  view_style_channel?: ViewLayoutType;
  view_style_downloads?: ViewLayoutType;
  view_style_playlist?: ViewLayoutType;
  grid_items?: number;
  hide_watched?: boolean;
  show_ignored_only?: boolean;
  show_subed_only?: boolean;
  sponsorblock_id?: number;
};

export const ColourConstant = {
  Dark: 'dark.css',
  Light: 'light.css',
  Matrix: 'matrix.css',
  Midnight: 'midnight.css',
};

export type ColourVariants = 'dark.css' | 'light.css' | 'matrix.css' | 'midnight.css';

export type Watched = {
  id: string;
  is_watched: boolean;
};

export type NotificationPages = 'download' | 'settings' | 'channel' | 'all';

export type TaskNamesType =
  | 'download_pending'
  | 'update_subscribed'
  | 'manual_import'
  | 'resync_thumbs'
  | 'rescan_filesystem';

export type DownloadQueueStatus = 'ignore' | 'pending' | 'priority';

export type AppSettingsConfigType = {
  subscriptions: {
    channel_size: number;
    live_channel_size: number;
    shorts_channel_size: number;
    auto_start: boolean;
  };
  downloads: {
    limit_speed: boolean | number;
    sleep_interval: number;
    autodelete_days: boolean | number;
    format: boolean | string;
    format_sort: boolean | string;
    add_metadata: boolean;
    add_thumbnail: boolean;
    subtitle: boolean | string;
    subtitle_source: boolean | string;
    subtitle_index: boolean;
    comment_max: boolean | number;
    comment_sort: string;
    cookie_import: boolean;
    throttledratelimit: boolean | number;
    extractor_lang: boolean | string;
    integrate_ryd: boolean;
    integrate_sponsorblock: boolean;
  };
  application: {
    enable_snapshot: boolean;
  };
};

export type ReindexType = 'channel' | 'video' | 'playlist';

export const ReindexTypeEnum = {
  channel: 'channel',
  video: 'video',
  playlist: 'playlist',
};

export type ValidatedCookieType = {
  cookie_enabled: boolean;
  status: boolean;
  validated: number;
  validated_str: string;
};

export type VideoNavResponseType = {
  playlist_meta: {
    current_idx: number;
    playlist_id: string;
    playlist_name: string;
    playlist_channel: string;
  };
  playlist_previous: {
    youtube_id: string;
    title: string;
    uploader: string;
    idx: number;
    downloaded: boolean;
    vid_thumb: string;
  };
  playlist_next: {
    youtube_id: string;
    title: string;
    uploader: string;
    idx: number;
    downloaded: boolean;
    vid_thumb: string;
  };
};

export type Download = {
  auto_start: boolean;
  channel_id: string;
  channel_indexed: boolean;
  channel_name: string;
  duration: string;
  message?: string;
  published: string;
  status: string;
  timestamp: number;
  title: string;
  vid_thumb_url: string;
  vid_type: string;
  youtube_id: string;
  _index: string;
  _score: number;
};

export type DownloadResponseType = {
  data?: Download[];
  config?: ConfigType;
  paginate?: PaginationType;
};

export type DownloadLoaderDataType = {
  userConfig: UserMeType;
};
