const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Tarihleri "4 Ağustos 2025" gibi okunabilir bir formata çeviren filtre
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    // Gelen tarihi 'tr' lokasyonuna göre formatla
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).setLocale('tr').toLocaleString(DateTime.DATE_FULL);
  });

  // Sitenizin stil, script, resim ve diğer klasörlerini direkt kopyala
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("araba");
  eleventyConfig.addPassthroughCopy("egitim");
  eleventyConfig.addPassthroughCopy("haberler");
  eleventyConfig.addPassthroughCopy("hukuk");
  eleventyConfig.addPassthroughCopy("kategoriler");
  eleventyConfig.addPassthroughCopy("sehirler");
  eleventyConfig.addPassthroughCopy("teknoloji");
  eleventyConfig.addPassthroughCopy("yasam");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
