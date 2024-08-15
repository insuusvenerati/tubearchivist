import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, json, useLoaderData, useOutletContext, useSearchParams as useSearchParams$1, Link as Link$1, Form } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, Fragment as Fragment$1, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import setCookie from "set-cookie-parser";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/style-CQU1Tu5A.css";
const darkStyles = "/assets/dark-BebZeo14.css";
const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: darkStyles }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" }),
      /* @__PURE__ */ jsx("link", { rel: "manifest", href: "/favicon/site.webmanifest" }),
      /* @__PURE__ */ jsx("link", { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#01202e" }),
      /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: "/favicon/favicon.ico" }),
      /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-title", content: "TubeArchivist" }),
      /* @__PURE__ */ jsx("meta", { name: "application-name", content: "TubeArchivist" }),
      /* @__PURE__ */ jsx("meta", { name: "msapplication-TileColor", content: "#01202e" }),
      /* @__PURE__ */ jsx("meta", { name: "msapplication-config", content: "/favicon/browserconfig.xml" }),
      /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#01202e" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("title", { children: "TubeArchivist" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
var define_import_meta_env_default = { BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const isDevEnvironment = () => {
  const { DEV } = define_import_meta_env_default;
  return DEV;
};
const getApiUrl = () => {
  return "http://localhost:8000";
};
const defaultHeaders = { "Content-Type": "application/json" };
const getFetchCredentials = () => {
  const isDevEnv = isDevEnvironment();
  return isDevEnv ? "include" : "same-origin";
};
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "sessionid"
    // all of these are optional
    // domain: 'remix.run',
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    // httpOnly: true,
    // maxAge: 60,
    // path: '/',
    // sameSite: 'lax',
    // secrets: ['s3cret1'],
    // secure: true,
  }
});
const loadUserMeConfig = async (request) => {
  const sessionIdSession = await getSession(request.headers.get("Cookie"));
  if (!sessionIdSession.has("sessionid")) {
    throw redirect("/login");
  }
  const response = await fetch(`http://localhost:8000/api/user/me/`, {
    headers: {
      ...defaultHeaders,
      Cookie: Object.entries(sessionIdSession.data).map(([key, value]) => `${key}=${value}`).join("; ")
    },
    credentials: getFetchCredentials()
  });
  const userConfig = await response.json();
  if (isDevEnvironment()) {
    console.log("loadUserMeConfig", userConfig);
  }
  return userConfig;
};
const loadVideoListByFilter = async (filter) => {
  const apiUrl = getApiUrl();
  const searchParams = new URLSearchParams();
  if (filter.page) {
    searchParams.append("page", filter.page.toString());
  }
  if (filter.playlist) {
    searchParams.append("playlist", filter.playlist);
  } else if (filter.channel) {
    searchParams.append("channel", filter.channel);
  }
  if (filter.watch) {
    searchParams.append("watch", filter.watch);
  }
  if (filter.sort) {
    searchParams.append("sort", filter.sort);
  }
  if (filter.order) {
    searchParams.append("order", filter.order);
  }
  if (filter.type) {
    searchParams.append("type", filter.type);
  }
  const response = await fetch(`${apiUrl}/api/video/?${searchParams.toString()}`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const videos = await response.json();
  if (isDevEnvironment()) {
    console.log("loadVideoListByFilter", filter, videos);
  }
  return videos;
};
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const updateVideoProgressById = async ({ youtubeId, currentProgress }) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  const response = await fetch(`${apiUrl}/api/video/${youtubeId}/progress/`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({
      position: currentProgress
    })
  });
  const userConfig = await response.json();
  console.log("updateVideoProgressById", userConfig);
  return userConfig;
};
const deleteVideoProgressById = async (youtubeId) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  const response = await fetch(`${apiUrl}/api/video/${youtubeId}/progress/`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials()
  });
  const watchedState = await response.json();
  if (isDevEnvironment()) {
    console.log("deleteVideoProgressById", watchedState);
  }
  return watchedState;
};
const updateWatchedState = async (watched) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  if (watched.is_watched) {
    await deleteVideoProgressById(watched.id);
  }
  const response = await fetch(`${apiUrl}/api/watched/`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify(watched)
  });
  const watchedState = await response.json();
  console.log("updateWatchedState", watchedState);
  return watchedState;
};
function watchedThreshold(currentTime, duration) {
  let watched = false;
  if (duration <= 1800) {
    if (currentTime / duration >= 0.9) {
      watched = true;
    }
  } else {
    if (currentTime >= duration - 120) {
      watched = true;
    }
  }
  return watched;
}
const loadNotifications = async (pageName, includeReindex = false) => {
  const apiUrl = getApiUrl();
  let params = "";
  if (!includeReindex && pageName !== "all") {
    params = `?filter=${pageName}`;
  }
  const response = await fetch(`${apiUrl}/api/notification/${params}`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const notifications = await response.json();
  if (isDevEnvironment()) {
    console.log("loadNotifications", notifications);
  }
  return notifications;
};
const iconStop = "/img/icon-stop.svg";
const stopTaskByName = async (taskId) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  const response = await fetch(`${apiUrl}/api/task/by-id/${taskId}/`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({ command: "stop" })
  });
  const downloadQueueState = await response.json();
  console.log("stopTaskByName", downloadQueueState);
  return downloadQueueState;
};
const Notifications = ({
  pageName,
  includeReindex = false,
  update,
  setShouldRefresh
}) => {
  const [notificationResponse, setNotificationResponse] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const notifications = await loadNotifications(pageName, includeReindex);
      if (notifications.length === 0) {
        setNotificationResponse(notifications);
        clearInterval(intervalId);
        setShouldRefresh == null ? void 0 : setShouldRefresh(true);
        return;
      } else {
        setShouldRefresh == null ? void 0 : setShouldRefresh(false);
      }
      setNotificationResponse(notifications);
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [pageName, update, setShouldRefresh, includeReindex]);
  if (notificationResponse.length === 0) {
    return [];
  }
  return /* @__PURE__ */ jsx(Fragment, { children: notificationResponse.map((notification) => /* @__PURE__ */ jsxs(
    "div",
    {
      id: notification.id,
      className: `notification ${notification.level}`,
      children: [
        /* @__PURE__ */ jsx("h3", { children: notification.title }),
        /* @__PURE__ */ jsx("p", { children: notification.messages.map((message) => {
          return /* @__PURE__ */ jsxs(Fragment$1, { children: [
            message,
            /* @__PURE__ */ jsx("br", {})
          ] }, message);
        }) }),
        /* @__PURE__ */ jsx("div", { className: "task-control-icons", children: notification["api_stop"] && notification.command !== "STOP" && /* @__PURE__ */ jsx(
          "img",
          {
            src: iconStop,
            id: "stop-icon",
            title: "Stop Task",
            alt: "stop icon",
            onClick: async () => {
              await stopTaskByName(notification.id);
            }
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "notification-progress-bar",
            style: { width: `${notification.progress * 100 || 0}%` }
          }
        )
      ]
    },
    notification.id
  )) });
};
function formatTime(time) {
  const hoursUnformatted = time / 3600;
  const minutesUnformatted = time % 3600 / 60;
  const secondsUnformatted = time % 60;
  const hoursFormatted = Math.trunc(hoursUnformatted);
  let minutesFormatted;
  if (minutesUnformatted < 10 && hoursFormatted > 0) {
    minutesFormatted = "0" + Math.trunc(minutesUnformatted);
  } else {
    minutesFormatted = Math.trunc(minutesUnformatted).toString();
  }
  let secondsFormatted;
  if (secondsUnformatted < 10) {
    secondsFormatted = "0" + Math.trunc(secondsUnformatted);
  } else {
    secondsFormatted = Math.trunc(secondsUnformatted).toString();
  }
  let timeUnformatted = "";
  if (hoursFormatted > 0) {
    timeUnformatted = hoursFormatted + ":";
  }
  const timeFormatted = timeUnformatted.concat(minutesFormatted, ":", secondsFormatted);
  return timeFormatted;
}
const Subtitles = ({ subtitles }) => {
  return subtitles.map((subtitle) => {
    let label = subtitle.name;
    if (subtitle.source === "auto") {
      label += " - auto";
    }
    return /* @__PURE__ */ jsx(
      "track",
      {
        label,
        kind: "subtitles",
        srcLang: subtitle.lang,
        src: `${getApiUrl()}${subtitle.media_url}`
      },
      subtitle.name
    );
  });
};
const handleTimeUpdate = (youtubeId, duration, watched, sponsorBlock, setSponsorSegmentSkipped) => async (videoTag) => {
  const currentTime = Number(videoTag.currentTarget.currentTime);
  if (sponsorBlock && sponsorBlock.segments) {
    sponsorBlock.segments.forEach((segment) => {
      const [from, to] = segment.segment;
      if (currentTime >= from && currentTime <= from + 0.3) {
        videoTag.currentTarget.currentTime = to;
        setSponsorSegmentSkipped == null ? void 0 : setSponsorSegmentSkipped((segments) => {
          return { ...segments, [segment.UUID]: { from, to } };
        });
      }
      if (currentTime > to + 10) {
        setSponsorSegmentSkipped == null ? void 0 : setSponsorSegmentSkipped((segments) => {
          return { ...segments, [segment.UUID]: { from: 0, to: 0 } };
        });
      }
    });
  }
  if (currentTime < 10) return;
  if (Number((currentTime % 10).toFixed(1)) <= 0.2) {
    await updateVideoProgressById({
      youtubeId,
      currentProgress: currentTime
    });
    if (!watched) {
      if (watchedThreshold(currentTime, duration)) {
        await updateWatchedState({
          id: youtubeId,
          is_watched: true
        });
      }
    }
  }
};
const handleVideoEnd = (youtubeId, watched, setSponsorSegmentSkipped) => async () => {
  if (!watched) {
    await updateWatchedState({ id: youtubeId, is_watched: true });
  }
};
const VideoPlayer = ({ video, videoProgress, sponsorBlock, embed }) => {
  const [searchParams] = useSearchParams();
  const searchParamVideoProgress = searchParams.get("t");
  const [skippedSegments, setSkippedSegments] = useState({});
  const videoId = video.data.youtube_id;
  const videoUrl = video.data.media_url;
  const videoThumbUrl = video.data.vid_thumb_url;
  const watched = video.data.player.watched;
  const duration = video.data.player.duration;
  const videoSubtitles = video.data.subtitles;
  let videoSrcProgress = Number(videoProgress == null ? void 0 : videoProgress.position) > 0 ? Number(videoProgress == null ? void 0 : videoProgress.position) : "";
  if (searchParamVideoProgress !== null) {
    videoSrcProgress = searchParamVideoProgress;
  }
  const autoplay = false;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { id: "player", className: embed ? "" : "player-wrapper", children: /* @__PURE__ */ jsx("div", { className: embed ? "" : "video-main", children: /* @__PURE__ */ jsxs(
      "video",
      {
        poster: `${getApiUrl()}${videoThumbUrl}`,
        onVolumeChange: (videoTag) => {
          localStorage.setItem("playerVolume", videoTag.currentTarget.volume.toString());
        },
        onLoadStart: (videoTag) => {
          videoTag.currentTarget.volume = Number(localStorage.getItem("playerVolume")) ?? 1;
        },
        onTimeUpdate: handleTimeUpdate(
          videoId,
          duration,
          watched,
          sponsorBlock,
          setSkippedSegments
        ),
        onPause: async (videoTag) => {
          const currentTime = Number(videoTag.currentTarget.currentTime);
          if (currentTime < 10) return;
          await updateVideoProgressById({
            youtubeId: videoId,
            currentProgress: currentTime
          });
        },
        onEnded: handleVideoEnd(videoId, watched),
        autoPlay: autoplay,
        controls: true,
        width: "100%",
        playsInline: true,
        id: "video-item",
        children: [
          /* @__PURE__ */ jsx(
            "source",
            {
              src: `${getApiUrl()}${videoUrl}#t=${videoSrcProgress}`,
              type: "video/mp4",
              id: "video-source"
            }
          ),
          videoSubtitles && /* @__PURE__ */ jsx(Subtitles, { subtitles: videoSubtitles })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Notifications, { pageName: "all" }),
    /* @__PURE__ */ jsx("div", { className: "sponsorblock", id: "sponsorblock", children: (sponsorBlock == null ? void 0 : sponsorBlock.is_enabled) && /* @__PURE__ */ jsxs(Fragment, { children: [
      sponsorBlock.segments.length == 0 && /* @__PURE__ */ jsxs("h4", { children: [
        "This video doesn't have any sponsor segments added. To add a segment go to",
        " ",
        /* @__PURE__ */ jsx("u", { children: /* @__PURE__ */ jsx("a", { href: `https://www.youtube.com/watch?v=${videoId}`, children: "this video on YouTube" }) }),
        " ",
        "and add a segment using the",
        " ",
        /* @__PURE__ */ jsx("u", { children: /* @__PURE__ */ jsx("a", { href: "https://sponsor.ajay.app/", children: "SponsorBlock" }) }),
        " ",
        "extension."
      ] }),
      sponsorBlock.has_unlocked && /* @__PURE__ */ jsxs("h4", { children: [
        "This video has unlocked sponsor segments. Go to",
        " ",
        /* @__PURE__ */ jsx("u", { children: /* @__PURE__ */ jsx("a", { href: `https://www.youtube.com/watch?v=${videoId}`, children: "this video on YouTube" }) }),
        " ",
        "and vote on the segments using the",
        " ",
        /* @__PURE__ */ jsx("u", { children: /* @__PURE__ */ jsx("a", { href: "https://sponsor.ajay.app/", children: "SponsorBlock" }) }),
        " ",
        "extension."
      ] }),
      Object.values(skippedSegments).map(({ from, to }) => {
        return /* @__PURE__ */ jsx(Fragment, { children: from !== 0 && to !== 0 && /* @__PURE__ */ jsxs("h3", { children: [
          "Skipped sponsor segment from ",
          formatTime(from),
          " to ",
          formatTime(to),
          "."
        ] }) });
      })
    ] }) })
  ] });
};
const loadVideoById = async (youtubeId) => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/video/${youtubeId}/`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const videos = await response.json();
  if (isDevEnvironment()) {
    console.log("loadVideoById", videos);
  }
  return videos;
};
const loadVideoProgressById = async (youtubeId) => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/video/${youtubeId}/progress/`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const videoProgress = await response.json();
  if (isDevEnvironment()) {
    console.log("loadVideoProgressById", videoProgress);
  }
  return videoProgress;
};
const loadSponsorblockByVideoId = async (youtubeId) => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/video/${youtubeId}/sponsor/`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const videos = await response.json();
  if (isDevEnvironment()) {
    console.log("loadSponsorblockByVideoId", videos);
  }
  return videos;
};
const iconClose = "/img/icon-close.svg";
const iconEye = "/img/icon-eye.svg";
const iconThumb = "/img/icon-thumb.svg";
const iconUnseen = "/img/icon-unseen.svg";
const iconSeen = "/img/icon-seen.svg";
const WatchedCheckBox = ({ watched, onClick }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    watched && /* @__PURE__ */ jsx(
      "img",
      {
        src: iconSeen,
        alt: "seen-icon",
        className: "watch-button",
        title: "Mark as unwatched",
        onClick: async () => {
          onClick == null ? void 0 : onClick(false);
        }
      }
    ),
    !watched && /* @__PURE__ */ jsx(
      "img",
      {
        src: iconUnseen,
        alt: "unseen-icon",
        className: "watch-button",
        title: "Mark as watched",
        onClick: async () => {
          onClick == null ? void 0 : onClick(true);
        }
      }
    )
  ] });
};
const getURL = () => {
  return window.location.origin;
};
function shiftCurrentTime(contentCurrentTime) {
  console.log(contentCurrentTime);
  if (contentCurrentTime === void 0) {
    return 0;
  }
  if (contentCurrentTime > 5) {
    return contentCurrentTime - 3;
  } else {
    return 0;
  }
}
async function castVideoProgress(player, video) {
  if (!video) {
    console.log("castVideoProgress: Video to cast not found...");
    return;
  }
  const videoId = video.youtube_id;
  if (player.mediaInfo.contentId.includes(videoId)) {
    const currentTime = player.currentTime;
    const duration = player.duration;
    if (currentTime % 10 <= 1 && currentTime !== 0 && duration !== 0) {
      await updateVideoProgressById({
        youtubeId: videoId,
        currentProgress: currentTime
      });
      if (!video.player.watched) {
        if (watchedThreshold(currentTime, duration)) {
          await updateWatchedState({
            id: videoId,
            is_watched: true
          });
        }
      }
    }
  }
}
async function castVideoPaused(player, video) {
  if (!video) {
    console.log("castVideoPaused: Video to cast not found...");
    return;
  }
  const videoId = video == null ? void 0 : video.youtube_id;
  const currentTime = player.currentTime;
  const duration = player.duration;
  if (player.mediaInfo != null) {
    if (player.mediaInfo.contentId.includes(videoId)) {
      if (currentTime !== 0 && duration !== 0) {
        await updateVideoProgressById({
          youtubeId: videoId,
          currentProgress: currentTime
        });
      }
    }
  }
}
const GoogleCast = ({ video, videoProgress, setRefresh }) => {
  const [isConnected, setIsConnected] = useState(false);
  const setup = useCallback(() => {
    const cast = globalThis.cast;
    const chrome = globalThis.chrome;
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      // Use built in receiver app on cast device, see https://developers.google.com/cast/docs/styled_receiver if you want to be able to add a theme, splash screen or watermark. Has a $5 one time fee.
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
    const player = new cast.framework.RemotePlayer();
    const playerController = new cast.framework.RemotePlayerController(player);
    playerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
      function() {
        setIsConnected(player.isConnected);
      }
    );
    playerController.addEventListener(
      cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
      function() {
        castVideoProgress(player, video);
      }
    );
    playerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
      function() {
        castVideoPaused(player, video);
        setRefresh == null ? void 0 : setRefresh();
      }
    );
  }, [setRefresh, video]);
  const startPlayback = useCallback(() => {
    const chrome = globalThis.chrome;
    const cast = globalThis.cast;
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaUrl = video == null ? void 0 : video.media_url;
    const vidThumbUrl = video == null ? void 0 : video.vid_thumb_url;
    const contentTitle = video == null ? void 0 : video.title;
    const contentId = `${getURL()}${mediaUrl}`;
    const contentImage = `${getURL()}${vidThumbUrl}`;
    const contentType = "video/mp4";
    const contentSubtitles = [];
    const videoSubtitles = video == null ? void 0 : video.subtitles;
    if (typeof videoSubtitles !== "undefined") {
      for (let i = 0; i < videoSubtitles.length; i++) {
        const subtitle = new chrome.cast.media.Track(i, chrome.cast.media.TrackType.TEXT);
        subtitle.trackContentId = videoSubtitles[i].media_url;
        subtitle.trackContentType = "text/vtt";
        subtitle.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
        subtitle.name = videoSubtitles[i].name;
        subtitle.language = videoSubtitles[i].lang;
        subtitle.customData = null;
        contentSubtitles.push(subtitle);
      }
    }
    const mediaInfo = new chrome.cast.media.MediaInfo(contentId, contentType);
    mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
    mediaInfo.metadata.title = contentTitle == null ? void 0 : contentTitle.replace("&amp;", "&");
    mediaInfo.metadata.images = [new chrome.cast.Image(contentImage)];
    mediaInfo.tracks = contentSubtitles;
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.currentTime = shiftCurrentTime(videoProgress == null ? void 0 : videoProgress.position);
    castSession.loadMedia(request).then(
      function() {
        console.log("media loaded");
      },
      function(error) {
        console.log("Error", error, "Error code: " + error.code);
      }
    );
  }, [video == null ? void 0 : video.media_url, video == null ? void 0 : video.subtitles, video == null ? void 0 : video.title, video == null ? void 0 : video.vid_thumb_url]);
  useEffect(() => {
    window["__onGCastApiAvailable"] = function(isAvailable) {
      if (isAvailable) {
        setup();
      }
    };
  }, [setup]);
  useEffect(() => {
    console.log("isConnected", isConnected);
    if (isConnected) {
      startPlayback();
    }
  }, [isConnected, startPlayback]);
  if (!video) {
    return /* @__PURE__ */ jsx("p", { children: "Video for cast not found..." });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx(
      "script",
      {
        type: "text/javascript",
        src: "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
      }
    ) }),
    /* @__PURE__ */ jsx("google-cast-launcher", { id: "castbutton" })
  ] }) });
};
const formatNumbers = (number, options) => {
  const formatNumber = Intl.NumberFormat(navigator.language, options);
  return formatNumber.format(number);
};
const loadPlaylistById = async (playlistId) => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/playlist/${playlistId}/`, {
    headers: defaultHeaders,
    credentials: getFetchCredentials()
  });
  const videos = await response.json();
  if (isDevEnvironment()) {
    console.log("loadPlaylistById", videos);
  }
  return videos;
};
const RoutesList = {
  Home: "/",
  Channels: "/channel/",
  Channel: (id) => `/channel/${id}`,
  ChannelVideo: (id) => `/channel/${id}`,
  ChannelStream: (id) => `/channel/${id}/streams/`,
  ChannelShorts: (id) => `/channel/${id}/shorts/`,
  ChannelPlaylist: (id) => `/channel/${id}/playlist/`,
  ChannelAbout: (id) => `/channel/${id}/about/`,
  Playlists: "/playlist/",
  Playlist: (id) => `/playlist/${id}`,
  Downloads: "/downloads/",
  DownloadsByChannelId: (channelId) => `/downloads/?channel=${channelId}`,
  Search: "/search/",
  SettingsDashboard: "/settings/",
  SettingsUser: "/settings/user/",
  SettingsApplication: "/settings/application/",
  SettingsScheduling: "/settings/scheduling/",
  SettingsActions: "/settings/actions/",
  Login: "/Login/",
  Logout: "/logout/",
  Video: (id) => `/video/${id}`,
  VideoAtTimestamp: (id, timestamp) => `/video/${id}/?t=${timestamp}`,
  About: "/about/"
};
const EmbeddableVideoPlayer = ({ videoId }) => {
  const [, setSearchParams] = useSearchParams();
  const [refresh, setRefresh] = useState(false);
  const [videoResponse, setVideoResponse] = useState();
  const [videoProgress, setVideoProgress] = useState();
  const [playlists, setPlaylists] = useState();
  const [sponsorblockResponse, setSponsorblockResponse] = useState();
  useEffect(() => {
    (async () => {
      const videoResponse2 = await loadVideoById(videoId);
      const videoProgress2 = await loadVideoProgressById(videoId);
      const sponsorblockReponse = await loadSponsorblockByVideoId(videoId);
      const playlistIds = videoResponse2.data.playlist;
      if (playlistIds !== void 0) {
        const playlists2 = await Promise.all(
          playlistIds.map(async (playlistid) => {
            const playlistResponse = await loadPlaylistById(playlistid);
            return playlistResponse.data;
          })
        );
        const playlistsFiltered = playlists2.filter((playlist) => {
          return playlist.playlist_subscribed;
        }).map((playlist) => {
          return {
            id: playlist.playlist_id,
            name: playlist.playlist_name
          };
        });
        setPlaylists(playlistsFiltered);
      }
      setVideoResponse(videoResponse2);
      setVideoProgress(videoProgress2);
      setSponsorblockResponse(sponsorblockReponse);
      setRefresh(false);
    })();
  }, [videoId, refresh]);
  if (videoResponse === void 0) {
    return [];
  }
  const video = videoResponse.data;
  const name = video.title;
  const channelId = video.channel.channel_id;
  const channelName = video.channel.channel_name;
  const watched = video.player.watched;
  const views = formatNumbers(video.stats.view_count);
  const hasLikes = video.stats.like_count;
  const likes = formatNumbers(video.stats.like_count);
  const hasDislikes = video.stats.dislike_count > 0 && videoResponse.config.downloads.integrate_ryd;
  const dislikes = formatNumbers(video.stats.dislike_count);
  const config = videoResponse.config;
  const cast = config.enable_cast;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "player-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "video-player", children: [
    /* @__PURE__ */ jsx(
      VideoPlayer,
      {
        video: videoResponse,
        videoProgress,
        sponsorBlock: sponsorblockResponse,
        embed: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "player-title boxed-content", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "close-button",
          src: iconClose,
          alt: "close-icon",
          title: "Close player",
          onClick: () => {
            setSearchParams({});
          }
        }
      ),
      /* @__PURE__ */ jsx(
        WatchedCheckBox,
        {
          watched,
          onClick: async (status) => {
            await updateWatchedState({
              id: videoId,
              is_watched: status
            });
            setRefresh(true);
          }
        }
      ),
      cast && /* @__PURE__ */ jsx(
        GoogleCast,
        {
          video,
          videoProgress,
          setRefresh: () => {
            setRefresh(true);
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "thumb-icon player-stats", children: [
        /* @__PURE__ */ jsx("img", { src: iconEye, alt: "views icon" }),
        /* @__PURE__ */ jsx("span", { children: views }),
        hasLikes && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("img", { src: iconThumb, alt: "thumbs-up" }),
          /* @__PURE__ */ jsx("span", { children: likes })
        ] }),
        hasDislikes && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("img", { className: "dislike", src: iconThumb, alt: "thumbs-down" }),
          /* @__PURE__ */ jsx("span", { children: dislikes })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "player-channel-playlist", children: [
        /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(Link, { to: RoutesList.Channel(channelId), children: channelName }) }),
        playlists == null ? void 0 : playlists.map(({ id, name: name2 }) => {
          return /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: RoutesList.Playlist(id), children: name2 }) }, id);
        })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: RoutesList.Video(videoId), children: /* @__PURE__ */ jsx("h2", { id: "video-title", children: name }) })
    ] })
  ] }) }) });
};
const iconSort = "/img/icon-sort.svg";
const iconAdd = "/img/icon-add.svg";
const iconSubstract = "/img/icon-substract.svg";
const iconGridView = "/img/icon-gridview.svg";
const iconListView = "/img/icon-listview.svg";
const updateUserConfig = async (config) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  const response = await fetch(`${apiUrl}/api/user/me/`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({ config })
  });
  const userConfig = await response.json();
  console.log("updateUserConfig", userConfig);
  return userConfig;
};
const Filterbar = ({
  hideToggleText,
  showHidden,
  hideWatched,
  isGridView,
  view,
  viewStyleName,
  gridItems,
  sortBy,
  sortOrder,
  userMeConfig,
  setShowHidden,
  setHideWatched,
  setView,
  setSortBy,
  setSortOrder,
  setGridItems,
  setRefresh
}) => {
  useEffect(() => {
    (async () => {
      if (userMeConfig.hide_watched !== hideWatched || userMeConfig[viewStyleName.toString()] !== view || userMeConfig.grid_items !== gridItems || userMeConfig.sort_by !== sortBy || userMeConfig.sort_order !== sortOrder) {
        const userConfig = {
          hide_watched: hideWatched,
          [viewStyleName.toString()]: view,
          grid_items: gridItems,
          sort_by: sortBy,
          sort_order: sortOrder
        };
        await updateUserConfig(userConfig);
        setRefresh == null ? void 0 : setRefresh(true);
      }
    })();
  }, [hideWatched, view, gridItems, sortBy, sortOrder, viewStyleName, setRefresh, userMeConfig]);
  return /* @__PURE__ */ jsxs("div", { className: "view-controls three", children: [
    /* @__PURE__ */ jsxs("div", { className: "toggle", children: [
      /* @__PURE__ */ jsx("span", { children: hideToggleText }),
      /* @__PURE__ */ jsxs("div", { className: "toggleBox", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "hide_watched",
            type: "checkbox",
            checked: hideWatched,
            onChange: () => {
              setHideWatched == null ? void 0 : setHideWatched(!hideWatched);
            }
          }
        ),
        !hideWatched && /* @__PURE__ */ jsx("label", { htmlFor: "", className: "ofbtn", children: "Off" }),
        hideWatched && /* @__PURE__ */ jsx("label", { htmlFor: "", className: "onbtn", children: "On" })
      ] })
    ] }),
    showHidden && /* @__PURE__ */ jsx("div", { className: "sort", children: /* @__PURE__ */ jsxs("div", { id: "form", children: [
      /* @__PURE__ */ jsx("span", { children: "Sort by:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          name: "sort_by",
          id: "sort",
          value: sortBy,
          onChange: (event) => {
            setSortBy == null ? void 0 : setSortBy(event.target.value);
          },
          children: [
            /* @__PURE__ */ jsx("option", { value: "published", children: "date published" }),
            /* @__PURE__ */ jsx("option", { value: "downloaded", children: "date downloaded" }),
            /* @__PURE__ */ jsx("option", { value: "views", children: "views" }),
            /* @__PURE__ */ jsx("option", { value: "likes", children: "likes" }),
            /* @__PURE__ */ jsx("option", { value: "duration", children: "duration" }),
            /* @__PURE__ */ jsx("option", { value: "filesize", children: "file size" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          name: "sort_order",
          id: "sort-order",
          value: sortOrder,
          onChange: (event) => {
            setSortOrder == null ? void 0 : setSortOrder(event.target.value);
          },
          children: [
            /* @__PURE__ */ jsx("option", { value: "asc", children: "asc" }),
            /* @__PURE__ */ jsx("option", { value: "desc", children: "desc" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "view-icons", children: [
      setShowHidden && /* @__PURE__ */ jsx(
        "img",
        {
          src: iconSort,
          alt: "sort-icon",
          onClick: () => {
            setShowHidden == null ? void 0 : setShowHidden(!showHidden);
          },
          id: "animate-icon"
        }
      ),
      isGridView && /* @__PURE__ */ jsxs("div", { className: "grid-count", children: [
        gridItems < 7 && /* @__PURE__ */ jsx(
          "img",
          {
            src: iconAdd,
            onClick: () => {
              setGridItems(gridItems + 1);
            },
            alt: "grid plus row"
          }
        ),
        gridItems > 3 && /* @__PURE__ */ jsx(
          "img",
          {
            src: iconSubstract,
            onClick: () => {
              setGridItems(gridItems - 1);
            },
            alt: "grid minus row"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: iconGridView,
          onClick: () => {
            setView("grid");
          },
          alt: "grid view"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: iconListView,
          onClick: () => {
            setView("list");
          },
          alt: "list view"
        }
      )
    ] })
  ] });
};
const Pagination = ({ pagination, setPage }) => {
  const { total_hits, params, prev_pages, current_page, next_pages, last_page, max_hits } = pagination;
  const totalHits = Number(total_hits);
  const currentPage = Number(current_page);
  const hasMaxHits = Number(max_hits) > 0;
  const lastPage = Number(last_page);
  let hasParams = false;
  if (params) {
    hasParams = params.length > 0;
  }
  const handleKeyEvent = useCallback(
    (event) => {
      const { code } = event;
      if (code === "ArrowRight") {
        if (currentPage === 0 && totalHits > 1) {
          setPage(2);
          return;
        }
        if (currentPage > lastPage) {
          return;
        }
        setPage(currentPage + 1);
      }
      if (code === "ArrowLeft") {
        if (currentPage === 0) {
          return;
        }
        if (currentPage === 2) {
          setPage(0);
          return;
        }
        setPage(currentPage - 1);
      }
    },
    [currentPage, lastPage, setPage, totalHits]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [handleKeyEvent]);
  return /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
    /* @__PURE__ */ jsx("br", {}),
    totalHits > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      currentPage > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `${RoutesList.Home}?${params}`,
            className: "pagination-item",
            onClick: (event) => {
              event.preventDefault();
              setPage(0);
            },
            children: "First"
          }
        ),
        " "
      ] }),
      prev_pages !== false && prev_pages && prev_pages.map((page) => {
        if (hasParams) {
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `${RoutesList.Home}?page=${page}&${params}`,
                className: "pagination-item",
                onClick: (event) => {
                  event.preventDefault();
                  setPage(page);
                },
                children: page
              }
            ),
            " "
          ] }, page);
        } else {
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `${RoutesList.Home}?page=${page}`,
                className: "pagination-item",
                onClick: (event) => {
                  event.preventDefault();
                  setPage(page);
                },
                children: page
              }
            ),
            " "
          ] }, page);
        }
      }),
      currentPage > 0 && /* @__PURE__ */ jsx("span", { children: `< Page ${currentPage} ` }),
      next_pages && next_pages.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { children: ">" }),
        " ",
        next_pages.map((page) => {
          if (hasParams) {
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "pagination-item",
                  href: `?page=${page}&${params}`,
                  onClick: (event) => {
                    event.preventDefault();
                    setPage(page);
                  },
                  children: page
                }
              ),
              " "
            ] }, page);
          } else {
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "pagination-item",
                  href: `?page=${page}`,
                  onClick: (event) => {
                    event.preventDefault();
                    setPage(page);
                  },
                  children: page
                }
              ),
              " "
            ] }, page);
          }
        })
      ] }),
      lastPage > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        hasParams && /* @__PURE__ */ jsxs(
          "a",
          {
            className: "pagination-item",
            href: `?page=${lastPage}&${params}`,
            onClick: (event) => {
              event.preventDefault();
              setPage(lastPage || 0);
            },
            children: [
              hasMaxHits && `Max (${lastPage})`,
              !hasMaxHits && `Last (${lastPage})`
            ]
          }
        ),
        !hasParams && /* @__PURE__ */ jsxs(
          "a",
          {
            className: "pagination-item",
            href: `?page=${lastPage}`,
            onClick: (event) => {
              event.preventDefault();
              setPage(lastPage || 0);
            },
            children: [
              hasMaxHits && `Max (${lastPage})`,
              !hasMaxHits && `Last (${lastPage})`
            ]
          }
        )
      ] })
    ] })
  ] });
};
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);
  return null;
};
const iconPlay = "/img/icon-play.svg";
const iconDotMenu = "/img/icon-dot-menu.svg";
const defaultVideoThumb = "/img/default-video-thumb.jpg";
const formatDate = (date) => {
  const dateObj = new Date(date);
  return Intl.DateTimeFormat(navigator.language).format(dateObj);
};
const iconArrowTop = "/img/icon-arrow-top.svg";
const iconArrowUp = "/img/icon-arrow-up.svg";
const iconArrowDown = "/img/icon-arrow-down.svg";
const iconArrowBottom = "/img/icon-arrow-bottom.svg";
const iconRemove = "/img/icon-remove.svg";
const updateCustomPlaylist = async (action2, playlistId, videoId) => {
  const apiUrl = getApiUrl();
  const csrfCookie = getCookie("csrftoken");
  const response = await fetch(`${apiUrl}/api/playlist/${playlistId}/`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      "X-CSRFToken": csrfCookie || ""
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({ action: action2, video_id: videoId })
  });
  const customPlaylist = await response.json();
  console.log("updateCustomPlaylist", action2, customPlaylist);
  return customPlaylist;
};
const MoveVideoMenu = ({ playlistId, videoId, setCloseMenu, setRefresh }) => {
  if (playlistId === void 0) {
    return [];
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "video-popup-menu", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: iconClose,
        className: "video-popup-menu-close-button",
        title: "Close menu",
        onClick: () => setCloseMenu(true)
      }
    ),
    /* @__PURE__ */ jsx("h3", { children: "Move Video" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "move-video-button",
        "data-context": "top",
        onClick: async () => {
          await updateCustomPlaylist("top", playlistId, videoId);
          setRefresh(true);
        },
        src: iconArrowTop,
        title: "Move to top"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "move-video-button",
        "data-context": "up",
        onClick: async () => {
          await updateCustomPlaylist("up", playlistId, videoId);
          setRefresh(true);
        },
        src: iconArrowUp,
        title: "Move up"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "move-video-button",
        "data-context": "down",
        onClick: async () => {
          await updateCustomPlaylist("down", playlistId, videoId);
          setRefresh(true);
        },
        src: iconArrowDown,
        title: "Move down"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "move-video-button",
        "data-context": "bottom",
        onClick: async () => {
          await updateCustomPlaylist("bottom", playlistId, videoId);
          setRefresh(true);
        },
        src: iconArrowBottom,
        title: "Move to bottom"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "move-video-button",
        "data-context": "remove",
        onClick: async () => {
          await updateCustomPlaylist("remove", playlistId, videoId);
          setRefresh(true);
        },
        src: iconRemove,
        title: "Remove from playlist"
      }
    )
  ] }) });
};
const VideoListItem = ({
  video,
  viewLayout,
  playlistId,
  showReorderButton = false,
  refreshVideoList
}) => {
  const [, setSearchParams] = useSearchParams();
  const [showReorderMenu, setShowReorderMenu] = useState(false);
  if (!video) {
    return /* @__PURE__ */ jsx("p", { children: "No video found." });
  }
  return /* @__PURE__ */ jsxs("div", { className: `video-item ${viewLayout}`, children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        onClick: () => {
          setSearchParams({ videoId: video.youtube_id });
        },
        children: /* @__PURE__ */ jsxs("div", { className: `video-thumb-wrap ${viewLayout}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "video-thumb", children: [
            /* @__PURE__ */ jsxs("picture", { children: [
              /* @__PURE__ */ jsx("img", { src: `${getApiUrl()}${video.vid_thumb_url}`, alt: "video-thumb" }),
              /* @__PURE__ */ jsx("source", { srcSet: defaultVideoThumb })
            ] }),
            video.player.progress && /* @__PURE__ */ jsx(
              "div",
              {
                className: "video-progress-bar",
                id: `progress-${video.youtube_id}`,
                style: {
                  width: `${video.player.progress}%`
                }
              }
            ),
            !video.player.progress && /* @__PURE__ */ jsx(
              "div",
              {
                className: "video-progress-bar",
                id: `progress-${video.youtube_id}`,
                style: { width: "0%" }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "video-play", children: /* @__PURE__ */ jsx("img", { src: iconPlay, alt: "play-icon" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `video-desc ${viewLayout}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "video-desc-player", id: `video-info-${video.youtube_id}`, children: [
        /* @__PURE__ */ jsx(
          WatchedCheckBox,
          {
            watched: video.player.watched,
            onClick: async (status) => {
              await updateWatchedState({
                id: video.youtube_id,
                is_watched: status
              });
              refreshVideoList(true);
            }
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          formatDate(video.published),
          " | ",
          video.player.duration_str
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "video-desc-details", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { to: RoutesList.Channel(video.channel.channel_id), children: /* @__PURE__ */ jsx("h3", { children: video.channel.channel_name }) }),
          /* @__PURE__ */ jsx(Link, { className: "video-more", to: RoutesList.Video(video.youtube_id), children: /* @__PURE__ */ jsx("h2", { children: video.title }) })
        ] }),
        showReorderButton && !showReorderMenu && /* @__PURE__ */ jsx(
          "img",
          {
            src: iconDotMenu,
            alt: "dot-menu-icon",
            className: "dot-button",
            title: "More actions",
            onClick: () => {
              setShowReorderMenu(true);
            }
          }
        )
      ] }),
      showReorderButton && showReorderMenu && /* @__PURE__ */ jsx(
        MoveVideoMenu,
        {
          playlistId,
          videoId: video.youtube_id,
          setCloseMenu: (status) => setShowReorderMenu(!status),
          setRefresh: refreshVideoList
        }
      )
    ] })
  ] });
};
const VideoList = ({
  videoList,
  viewLayout,
  playlistId,
  showReorderButton = false,
  refreshVideoList
}) => {
  if (!videoList || videoList.length === 0) {
    return /* @__PURE__ */ jsx("p", { children: "No videos found." });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: videoList.map((video) => {
    return /* @__PURE__ */ jsx(
      VideoListItem,
      {
        video,
        viewLayout,
        playlistId,
        showReorderButton,
        refreshVideoList
      },
      video.youtube_id
    );
  }) });
};
const ViewStyleNames = {
  home: "view_style_home",
  channel: "view_style_channel",
  downloads: "view_style_downloads",
  playlist: "view_style_playlist"
};
const ViewStyles = {
  grid: "grid",
  list: "list"
};
const loader = async ({ request }) => {
  console.log("------------ after reload");
  const userConfig = await loadUserMeConfig(request);
  return json({ userConfig });
};
const Home = () => {
  var _a, _b;
  const data = useLoaderData();
  const outletContext = useOutletContext();
  const [searchParams] = useSearchParams$1();
  const videoId = searchParams.get("videoId");
  console.log("data", data);
  const userMeConfig = (_a = data == null ? void 0 : data.userConfig) == null ? void 0 : _a.config;
  const [hideWatched, setHideWatched] = useState(userMeConfig.hide_watched || false);
  const [sortBy, setSortBy] = useState(userMeConfig.sort_by || "published");
  const [sortOrder, setSortOrder] = useState(userMeConfig.sort_order || "asc");
  const [view, setView] = useState(userMeConfig.view_style_home || "grid");
  const [gridItems, setGridItems] = useState(userMeConfig.grid_items || 3);
  const [showHidden, setShowHidden] = useState(false);
  const [refreshVideoList, setRefreshVideoList] = useState(false);
  const [videoResponse, setVideoReponse] = useState();
  const [continueVideoResponse, setContinueVideoResponse] = useState();
  const videoList = videoResponse == null ? void 0 : videoResponse.data;
  const pagination = videoResponse == null ? void 0 : videoResponse.paginate;
  const continueVideos = continueVideoResponse == null ? void 0 : continueVideoResponse.data;
  const hasVideos = ((_b = videoResponse == null ? void 0 : videoResponse.data) == null ? void 0 : _b.length) !== 0;
  const showEmbeddedVideo = videoId !== null;
  const isGridView = view === ViewStyles.grid;
  const gridView = isGridView ? `boxed-${gridItems}` : "";
  const gridViewGrid = isGridView ? `grid-${gridItems}` : "";
  useEffect(() => {
    (async () => {
      if (refreshVideoList || (pagination == null ? void 0 : pagination.current_page) === void 0 || outletContext.currentPage !== (pagination == null ? void 0 : pagination.current_page)) {
        const videos = await loadVideoListByFilter({
          page: outletContext.currentPage,
          watch: hideWatched ? "unwatched" : void 0,
          sort: sortBy,
          order: sortOrder
        });
        try {
          const continueVideoResponse2 = await loadVideoListByFilter({ watch: "continue" });
          setContinueVideoResponse(continueVideoResponse2);
        } catch (error) {
          console.log("Server error on continue vids?");
        }
        setVideoReponse(videos);
        setRefreshVideoList(false);
      }
    })();
  }, [refreshVideoList, outletContext == null ? void 0 : outletContext.currentPage, pagination == null ? void 0 : pagination.current_page]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "TubeArchivist" }) }),
    /* @__PURE__ */ jsx(ScrollToTopOnNavigate, {}),
    /* @__PURE__ */ jsxs("div", { className: `boxed-content ${gridView}`, children: [
      continueVideos && continueVideos.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "title-bar", children: /* @__PURE__ */ jsx("h1", { children: "Continue Watching" }) }),
        /* @__PURE__ */ jsx("div", { className: `video-list ${view} ${gridViewGrid}`, children: /* @__PURE__ */ jsx(
          VideoList,
          {
            videoList: continueVideos,
            viewLayout: view,
            refreshVideoList: setRefreshVideoList
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "title-bar", children: /* @__PURE__ */ jsx("h1", { children: "Recent Videos" }) }),
      /* @__PURE__ */ jsx(
        Filterbar,
        {
          hideToggleText: "Hide watched:",
          showHidden,
          hideWatched,
          isGridView,
          view,
          gridItems,
          sortBy,
          sortOrder,
          userMeConfig,
          setShowHidden,
          setHideWatched,
          setView,
          setSortBy,
          setSortOrder,
          setGridItems,
          viewStyleName: ViewStyleNames.home,
          setRefresh: setRefreshVideoList
        }
      )
    ] }),
    showEmbeddedVideo && /* @__PURE__ */ jsx(EmbeddableVideoPlayer, { videoId }),
    /* @__PURE__ */ jsx("div", { className: `boxed-content ${gridView}`, children: /* @__PURE__ */ jsxs("div", { className: `video-list ${view} ${gridViewGrid}`, children: [
      !hasVideos && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { children: "No videos found..." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you've already added a channel or playlist, try going to the",
          " ",
          /* @__PURE__ */ jsx(Link$1, { to: RoutesList.Downloads, children: "downloads page" }),
          " to start the scan and download tasks."
        ] })
      ] }),
      hasVideos && /* @__PURE__ */ jsx(
        VideoList,
        {
          videoList,
          viewLayout: view,
          refreshVideoList: setRefreshVideoList
        }
      )
    ] }) }),
    pagination && /* @__PURE__ */ jsx("div", { className: "boxed-content", children: /* @__PURE__ */ jsx(Pagination, { pagination, setPage: outletContext.setCurrentPage }) })
  ] });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const signIn = async (request) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const response = await fetch(`http://localhost:8000/api/user/login/`, {
    method: "POST",
    headers: {
      ...defaultHeaders
    },
    credentials: getFetchCredentials(),
    body: JSON.stringify({
      username,
      password
      // remember_me: saveLogin ? 'on' : 'off',
    })
  });
  console.log("loginResponse", response.headers.get("Set-Cookie"));
  const setCookieHeader = response.headers.get("Set-Cookie");
  const parsedResponseCookies = setCookie.parse(setCookie.splitCookiesString(setCookieHeader));
  const sessionIdCookie = parsedResponseCookies.find((cookie) => cookie.name === "sessionid");
  if (response.status === 403) {
    console.log("Might be already logged in.", await response.json());
  }
  return { data: response.json(), cookie: sessionIdCookie };
};
const Button = ({
  id,
  name,
  className,
  type,
  label,
  children,
  value,
  title,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      id,
      name,
      className,
      type,
      value,
      title,
      onClick,
      children: [
        label,
        children
      ]
    }
  );
};
const ColourConstant = {
  Dark: "dark.css",
  Light: "light.css",
  Matrix: "matrix.css",
  Midnight: "midnight.css"
};
const importColours = (stylesheet) => {
  switch (stylesheet) {
    case ColourConstant.Dark:
      return import("./assets/Dark-BrWd0ApP.js");
    case ColourConstant.Matrix:
      return import("./assets/Matrix-C0X-W8e9.js");
    case ColourConstant.Midnight:
      return import("./assets/Midnight-BbATspzV.js");
    case ColourConstant.Light:
      return import("./assets/Light-D8fzJf8n.js");
    default:
      return import("./assets/Dark-BrWd0ApP.js");
  }
};
const action = async ({ request }) => {
  const signInData = await signIn(request);
  const formData = await request.formData();
  const next = formData.get("next");
  const headers = new Headers();
  const { name, value, ...sessionIdCookieSerializeOptions } = signInData.cookie;
  const sessionIdSession = await getSession(request.headers.get("Cookie"));
  sessionIdSession.set(name, value);
  headers.append(
    "Set-Cookie",
    await commitSession(
      sessionIdSession,
      // Use the response's `sessionid` cookie serialization options.
      sessionIdCookieSerializeOptions
    )
  );
  return redirect(next, {
    headers
  });
};
importColours(ColourConstant.Dark);
const Login = () => {
  const [saveLogin, setSaveLogin] = useState(false);
  const form_error = false;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "TA | Welcome" }) }),
    /* @__PURE__ */ jsxs("div", { className: "boxed-content login-page", children: [
      /* @__PURE__ */ jsx("img", { alt: "tube-archivist-logo" }),
      /* @__PURE__ */ jsx("h1", { children: "Tube Archivist" }),
      /* @__PURE__ */ jsx("h2", { children: "Your Self Hosted YouTube Media Server" }),
      form_error,
      /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "username",
            id: "id_username",
            placeholder: "Username",
            autoComplete: "username",
            maxLength: 150,
            required: true
          }
        ),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "password",
            id: "id_password",
            placeholder: "Password",
            autoComplete: "current-password",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("p", { children: [
          "Remember me:",
          " ",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "remember_me",
              id: "id_remember_me",
              checked: saveLogin,
              onChange: () => {
                setSaveLogin(!saveLogin);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "next", value: RoutesList.Home }),
        /* @__PURE__ */ jsx(Button, { label: "Login", type: "submit" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "login-links", children: [
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/tubearchivist/tubearchivist", target: "_blank", children: "Github" }) }),
        " ",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/tubearchivist/tubearchivist#donate", target: "_blank", children: "Donate" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "footer-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "col-1" }),
      /* @__PURE__ */ jsx("div", { className: "col-2" }),
      /* @__PURE__ */ jsx("div", { className: "col-3" })
    ] })
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dx5zQ5Kc.js", "imports": ["/assets/components-CP9hw_Mk.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CrPhVzqh.js", "imports": ["/assets/components-CP9hw_Mk.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D1VJH5DC.js", "imports": ["/assets/components-CP9hw_Mk.js", "/assets/RouteList-Ba-kpcs5.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-Dk_A901E.js", "imports": ["/assets/components-CP9hw_Mk.js", "/assets/RouteList-Ba-kpcs5.js"], "css": [] } }, "url": "/assets/manifest-d4aa156f.js", "version": "d4aa156f" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
