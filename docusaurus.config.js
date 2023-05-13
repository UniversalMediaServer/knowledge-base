// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
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
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/UniversalMediaServer/knowledge-base/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

//     <nav class="nav-menu d-none d-lg-block">
//       <ul>
//         <li><a href="/#hero">Home</a></li>
//         <li><a href="/#features">Features</a></li>
//         <li><a href="/#about">About</a></li>
//         <li><a href="/#news">News</a></li>
//         <li class="drop-down">
//           <a href="">Support</a>
//           <ul>
//             <li><a href="https://support.universalmediaserver.com"><i class='bx bx-book'></i> Knowledge base</a></li>
//             <li><a href="/forum/"><i class='bx bx-support'></i> Forum</a></li>
//             <li><a href="https://github.com/UniversalMediaServer/UniversalMediaServer/issues"><i class='bx bx-bug'></i> Bug report</a></li>
//           </ul>
//         </li>
//         <li class="drop-down">
//           <a href="">Contribute</a>
//           <ul>
//             <li><a href="https://github.com/UniversalMediaServer/UniversalMediaServer/"><i class='bx bxl-github'></i> Code</a></li>
//             <li><a href="https://crowdin.com/project/universalmediaserver"><i class='bx bx-world'></i> Translate</a></li>
//             <li><a href="/donate/"><i class='bx bx-donate-heart'></i> Donate</a></li>
//           </ul>
//         </li>
//         <li><a href="/donate/">Donate</a></li>
//       </ul>
//     </nav>

//     <a href="/download/" class="get-started-btn scrollto">Download</a>
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'To main site',
            href: 'https://www.universalmediaserver.com',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
