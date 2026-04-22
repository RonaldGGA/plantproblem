/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.plantproblem.com",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        "/privacy",
        "/*.png",
        "/*.svg",
        "/*.ico",
        "*/opengraph-image",
        "*/twitter-image",
        "*/icon",
        "*/apple-icon",
    ],

    additionalPaths: async (config) => [
        await config.transform(config, "/"),
        await config.transform(config, "/blog"),
        await config.transform(config, "/about"),
    ],

    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
    },

    transform: async (config, path) => {
        if (path.startsWith("/blog/")) {
            return {
                loc: path,
                changefreq: "monthly",
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }

        if (path === "/") {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        return {
            loc: path,
            changefreq: "monthly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
        };
    },
};