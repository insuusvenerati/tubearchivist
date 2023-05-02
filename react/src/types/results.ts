export type Results = Root2[];

export interface Root2 {
  _index: string;
  _id: string;
  _score: any;
  sort: [number, string, string];
  source: Source;
}

export interface Source {
  title: string;
  description: string;
  category: string[];
  vid_thumb_url: string;
  vid_thumb_base64: boolean;
  tags: string[];
  published: string;
  vid_last_refresh: string;
  date_downloaded: number;
  youtube_id: string;
  vid_type: string;
  active: boolean;
  channel: Channel;
  stats: Stats;
  media_url: string;
  player: Player;
  streams: Stream[];
  media_size: number;
  playlist?: string[];
}

export interface Channel {
  channel_active: boolean;
  channel_last_refresh: string;
  channel_subs: number;
  channel_name: string;
  channel_banner_url: string;
  channel_tvart_url: string;
  channel_id: string;
  channel_subscribed: boolean;
  channel_description: string;
  channel_thumb_url: string;
  channel_views: number;
}

export interface Stats {
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: any;
}

export interface Player {
  watched: boolean;
  duration: number;
  duration_str: string;
}

export interface Stream {
  type: string;
  index: number;
  codec: string;
  width?: number;
  height?: number;
  bitrate: number;
}
