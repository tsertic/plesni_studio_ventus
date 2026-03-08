/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://www.plesni-studio-ventus.hr",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://www.plesni-studio-ventus.hr/sitemap.xml"],
  },
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/classes": 0.9,
      "/schedule": 0.9,
      "/about": 0.8,
      "/contact": 0.8,
      "/events": 0.7,
      "/news": 0.7,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
