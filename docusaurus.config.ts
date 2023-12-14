import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

const config: Config = {
  title: 'Knowledge Base',
  tagline: 'Universal Media Server',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://support.universalmediaserver.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'UniversalMediaServer', // Usually your GitHub org/user name.
  projectName: 'knowledge-base', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      'bg-BG',
      'bn-BD',
      'ca-ES',
      'cs-CZ',
      'da-DK',
      'de-DE',
      'el-GR',
      'en-US',
      'en-GB',
      'es-ES',
      'et-EE',
      'fa-IR',
      'fi-FI',
      'fr-FR',
      'he-IL',
      'hr-HR',
      'hu-HU',
      'is-IS',
      'it-IT',
      'ja-JP',
      'ko-KR',
      'nl-NL',
      'no-NO',
      'pl-PL',
      'pt-BR',
      'pt-PT',
      'ro-RO',
      'ru-RU',
      'sk-SK',
      'sl-SI',
      'sr-SP',
      'sv-SE',
      'th-TH',
      'tr-TR',
      'uk-UA',
      'vi-VN',
      'zh-CN',
      'zh-TW',
    ],
  },
  plugins: [
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/UniversalMediaServer/knowledge-base/edit/main',
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Knowledge Base',
      logo: {
        alt: 'Universal Media Server',
        src: 'https://www.universalmediaserver.com/assets/img/logo.png',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'To main site',
          href: 'https://www.universalmediaserver.com',
        },
      ],
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
