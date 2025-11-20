export type UAResult = {
  raw: string;
  browser: { name: string; version?: string };
  os: { name: string; version?: string };
  device: { type: string; model?: string };
};

export function parseUserAgent(uaString?: string): UAResult {
  const ua = (uaString || (typeof navigator !== 'undefined' ? navigator.userAgent : '')).trim();

  function detectBrowser() {
    // Order matters
    const brs: Array<[RegExp, string]> = [
      [/edg\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Edge'],
      [/opr\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Opera'],
      [/chrome\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Chrome'],
      [/crios\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Chrome'],
      [/firefox\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Firefox'],
      [/version\/(\d+(?:\.\d+)?).*safari/i, 'Tools.UserAgent.Browsers.Safari'],
      [/safari\/(\d+(?:\.\d+)?)/i, 'Tools.UserAgent.Browsers.Safari']
    ];
    for (const [re, name] of brs) {
      const m = ua.match(re);
      if (m) return { name, version: m[1] };
    }
    return { name: 'Tools.UserAgent.Unknown' };
  }

  function detectOS() {
    if (/windows nt/i.test(ua)) {
      const m = ua.match(/windows nt (\d+(?:\.\d+)?)/i);
      return { name: 'Tools.UserAgent.OSs.Windows', version: m?.[1] };
    }
    if (/android/i.test(ua)) {
      const m = ua.match(/android (\d+(?:\.\d+)?)/i);
      return { name: 'Tools.UserAgent.OSs.Android', version: m?.[1] };
    }
    if (/iphone|ipad|ipod/i.test(ua)) {
      const m = ua.match(/os (\d+[_\d]*) like mac os x/i);
      return { name: 'Tools.UserAgent.OSs.iOS', version: m?.[1]?.replace(/_/g, '.') };
    }
    if (/mac os x/i.test(ua)) {
      const m = ua.match(/mac os x (\d+[_\d]*)/i);
      return { name: 'Tools.UserAgent.OSs.macOS', version: m?.[1]?.replace(/_/g, '.') };
    }
    if (/linux/i.test(ua)) return { name: 'Linux' };
    return { name: 'Tools.UserAgent.Unknown' };
  }

  function detectDevice() {
    if (/bot|crawl|spider|bingpreview/i.test(ua)) {
      return { type: 'Tools.UserAgent.Devices.Bot' as const };
    }
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      return { type: 'Tools.UserAgent.Devices.Tablet' as const };
    }
    if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) {
      return { type: 'Tools.UserAgent.Devices.Mobile' as const };
    }
    if (/desktop|windows nt|macintosh|linux/i.test(ua)) {
      return { type: 'Tools.UserAgent.Devices.Desktop' as const };
    }
    return { type: 'Tools.UserAgent.Unknown' as const };
  }

  return {
    raw: ua,
    browser: detectBrowser(),
    os: detectOS(),
    device: detectDevice(),
  };
}
