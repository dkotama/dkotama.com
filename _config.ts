import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import metas from "lume/plugins/metas.ts";
import gpm from "https://deno.land/x/gpm@v0.4.1/mod.ts";

const site = lume({
  location: new URL("https://dkotama.com/"),
});

site
  .ignore("README.md")
  .copy("img")
  .use(postcss())
  .use(terser())
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(slugifyUrls({ alphanumeric: false }))
  .use(resolveUrls())
  .use(metas())
  .addEventListener(
    "beforeBuild",
    () => gpm(["oom-components/searcher"], "js/vendor"),
  );

site.copy([".png"], (file) => "/img" + file);

export default site;
