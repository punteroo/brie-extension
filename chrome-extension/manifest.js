import fs from 'node:fs';
import deepmerge from 'deepmerge';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
const isFirefox = process.env.__FIREFOX__ === 'true';
const { activateNewTabFeature, activateDevToolsFeature, activateSidePanelFeature } = {
  activateNewTabFeature: false,
  activateDevToolsFeature: false,
  activateSidePanelFeature: false,
};

/**
 * If you want to disable the sidePanel, you can delete withSidePanel function and remove the sidePanel HoC on the manifest declaration.
 *
 * ```js
 * const manifest = { // remove `withSidePanel()`
 * ```
 */
const withSidePanel = manifest => {
  // Firefox does not support sidePanel
  if (isFirefox) {
    return manifest;
  }

  return deepmerge(
    manifest,
    activateSidePanelFeature
      ? {
          side_panel: {
            default_path: 'side-panel/index.html',
          },
          permissions: ['sidePanel'],
        }
      : {},
  );
};

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = withSidePanel({
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  host_permissions: ['<all_urls>'],
  permissions: ['webRequest', 'storage', 'tabs', 'activeTab'],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'brie-logo.png',
  },
  ...(activateNewTabFeature
    ? {
        chrome_url_overrides: {
          newtab: 'new-tab/index.html',
        },
      }
    : {}),
  icons: {
    128: 'brie-icon-128x128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['content/index.iife.js'],
      run_at: 'document_start',
    },
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      css: ['content.css'], // public folder
    },
  ],
  ...(activateDevToolsFeature ? { devtools_page: 'devtools/index.html' } : {}),
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'brie-icon-128x128', 'brie-logo.png', 'content/extend.iife.js'],
      matches: ['*://*/*'],
    },
  ],
});

export default manifest;
