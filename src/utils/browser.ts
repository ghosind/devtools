export type UAResult = {
  raw: string;
  browser: { name: string; version?: string };
  os: { name: string; version?: string };
  device: { type: string; model?: string };
};

export const isBrowser = () => {
  return typeof window !== 'undefined';
}

const detectBrowser = (ua: string) => {
  const patterns: Array<[RegExp, string]> = [
    [/edg\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Edge'],
    [/opr\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Opera'],
    [/chrome\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Chrome'],
    [/crios\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Chrome'],
    [/firefox\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Firefox'],
    [/version\/(\d+(?:\.\d+)?).*safari/i, 'Tools.UserAgent.Browsers.Safari'],
    [/safari\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Safari'],
  ];

  for (const [re, name] of patterns) {
    const m = ua.match(re);
    if (m) {
      return { name, version: m[1] }
    };
  }

  return { name: 'Tools.UserAgent.Unknown' };
}

const detectOS = (ua: string) => {
  const patterns: Array<[RegExp, RegExp, string]> = [
    [/windows nt/i, /windows nt (\d+(?:\.\d+)?)/i, 'Tools.UserAgent.OSs.Windows'],
    [/android/i, /android (\d+(?:\.\d+)?)/i, 'Tools.UserAgent.OSs.Android'],
    [/iphone|ipad|ipod/i, /os (\d+[_\d]*) like mac os x/i, 'Tools.UserAgent.OSs.iOS'],
    [/mac os x/i, /mac os x (\d+[_\d]*)/i, 'Tools.UserAgent.OSs.macOS'],
    [/linux/i, /linux/i, 'Tools.UserAgent.OSs.Linux'],
  ]

  for (const [re, ver, name] of patterns) {
    if (!re.test(ua)) {
      continue;
    }
    const m = ua.match(ver);
    return { name, version: m?.[1]?.replace(/_/g, '.') };
  }

  return { name: 'Tools.UserAgent.Unknown' };
}

const detectDevice = (ua: string) => {
  const patterns: Array<[RegExp, string]> = [
    [/bot|crawl|spider|bingpreview/i, 'Tools.UserAgent.Devices.Bot'],
    [/tablet|ipad|playbook|silk/i, 'Tools.UserAgent.Devices.Tablet'],
    [/mobi|iphone|ipod|android.*mobile|windows phone/i, 'Tools.UserAgent.Devices.Mobile'],
    [/desktop|windows nt|macintosh|linux/i, 'Tools.UserAgent.Devices.Desktop'],
  ]

  for (const [re, type] of patterns) {
    if (re.test(ua)) {
      return { type };
    }
  }

  return { type: 'Tools.UserAgent.Unknown' };
}

export const parseUserAgent = (uaString?: string): UAResult => {
  const ua = (uaString || (typeof navigator !== 'undefined' ? navigator.userAgent : '')).trim();

  return {
    raw: ua,
    browser: detectBrowser(ua),
    os: detectOS(ua),
    device: detectDevice(ua),
  };
}
