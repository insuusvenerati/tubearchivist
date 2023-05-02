import { Datum as VideoType } from '../types/videos';

export const Video = ({ video }: { video: VideoType }) => {
  return (
    <div className="video-item grid">
      <a
        href="#player"
        data-id={video.youtube_id}
        // onClick={window.createPlayer(this)}
      >
        <div className="video-thumb-wrap grid">
          <div className="video-thumb">
            <img src={video.vid_thumb_url} alt="video-thumb" />

            {video.player.progress ? (
              <div
                className="video-progress-bar"
                id={`progress-${video.youtube_id}`}
                style={{ width: video.player.progress }}
              />
            ) : (
              <div
                className="video-progress-bar"
                id={`progress-${video.youtube_id}`}
                style={{ width: 0 }}
              />
            )}
          </div>
          <div className="video-play">
            <img src="/static/img/icon-play.svg" alt="play-icon" />
          </div>
        </div>
      </a>
      <div className="video-desc grid">
        <div className="video-desc-player" id="video-info-{{ video.youtube_id }}">
          {video.player.watched ? (
            <img
              src="/static/img/icon-seen.svg"
              alt="seen-icon"
              data-id={video.youtube_id}
              data-status="watched"
              // onClick={window.updateVideoWatchStatus(this)}
              className="watch-button"
              title="Mark as unwatched"
            />
          ) : (
            <img
              src="/static/img/icon-unseen.svg"
              alt="unseen-icon"
              data-id={video.youtube_id}
              data-status="unwatched"
              // onClick={window.updateVideoWatchStatus(this)}
              className="watch-button"
              title="Mark as watched"
            />
          )}

          <span>
            {video.published} | {video.player.duration_str}
          </span>
        </div>
        <div>
          <a href="{% url 'channel_id' video.channel.channel_id %}">
            <h3>{video.channel.channel_name}</h3>
          </a>
          <a className="video-more" href="{% url 'video' video.youtube_id %}">
            <h2>{video.title}</h2>
          </a>
        </div>
      </div>
    </div>
  );
};
