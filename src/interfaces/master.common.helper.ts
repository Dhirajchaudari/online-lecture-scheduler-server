export function parseUserAgent(userAgent: string) {
  // Define regex patterns to match device types and operating systems
  const deviceTypePatterns = {
    mobile: /Mobi|Android/i,
    tablet: /Tablet|iPad/i,
    desktop: /Win|Mac|Linux|X11/i,
  };

  const osPatterns = {
    Windows: /Windows NT (\d+\.\d+)/,
    macOS: /Mac OS X (\d+[\._]\d+)/,
    iOS: /iPhone OS (\d+[\._]\d+)/,
    Android: /Android (\d+\.\d+)/,
    Linux: /Linux/,
  };

  const browserPatterns = {
    Edge: /Edg\/(\d+\.\d+)/,
    Chrome: /Chrome\/(\d+\.\d+)/,
    Firefox: /Firefox\/(\d+\.\d+)/,
    Safari: /Version\/(\d+\.\d+).*Safari/,
    IE: /MSIE (\d+\.\d+);|Trident.*rv:(\d+\.\d+)/,
  };

  let deviceType = "unknown";
  for (const [type, pattern] of Object.entries(deviceTypePatterns)) {
    if (pattern.test(userAgent)) {
      deviceType = type;
      break;
    }
  }

  let deviceOS = "unknown";
  for (const [os, pattern] of Object.entries(osPatterns)) {
    const match = userAgent.match(pattern);
    if (match) {
      deviceOS = match[1] ? `${os} ${match[1].replace("_", ".")}` : os;
      break;
    }
  }

  let browserName = "unknown";
  for (const [browser, pattern] of Object.entries(browserPatterns)) {
    const match = userAgent.match(pattern);
    if (match) {
      browserName = match[1] ? `${browser} ${match[1]}` : browser;
      break;
    }
  }
  return { deviceType, deviceOS, browserName };
}
