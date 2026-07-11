const path = require("node:path");

/** @type {import("next-i18next").UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-TW", "zh-CN", "ms"],
  },
  localePath: path.resolve("./public/locales"),
  defaultNS: "common",
  ns: ["common", "home", "pages", "seo", "about", "mission", "impact", "institutional-history"],
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
