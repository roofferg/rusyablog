module.exports = function(eleventyConfig) {
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
      // Projenin çalışacağı ana klasörler
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
