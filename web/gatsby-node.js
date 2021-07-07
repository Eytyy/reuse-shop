const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const srcPath = resolveApp('src');

async function createProducts(graphql, actions, reporter) {
  const {createPage} = actions;
  const result = await graphql(`
    {
      allSanityProduct(
        filter: {deleted: {ne: true}, main: {slug: {current: {ne: null}}}}
      ) {
        nodes {
          id
          main {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const products = (result.data.allSanityProduct || {}).nodes || [];
  const template = require.resolve('./src/templates/product.js');

  await buildLocalizedPages(
    products,
    ({main, id}, lang) => ({
      path:
        lang === 'en'
          ? `/products/${main.slug.current}`
          : `/${lang}/products/${main.slug.current}`,
      component: template,
      context: {
        originalPath: main.slug.current,
        slug: main.slug.current,
        id,
      },
    }),
    createPage,
    reporter
  );
}

const languages = ['en', 'ar'];

async function createLandingPages(graphql, actions, reporter) {
  const {createPage} = actions;

  const results = await graphql(`
    {
      pages: allSanityPage(
        filter: {slug: {current: {ne: null}}, id: {ne: null}}
      ) {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  const pages = results.data.pages.nodes;
  const template = require.resolve('./src/templates/page.js');

  await buildLocalizedPages(
    pages,
    ({slug}, lang, i18n) => ({
      path: lang === 'en' ? `/${slug.current}` : `/${lang}/${slug.current}`,
      component: template,
      context: {
        originalPath: slug.current,
        slug: slug.current,
      },
    }),
    createPage,
    reporter
  );
}

async function createBasicLandingPages(graphql, actions, reporter) {
  const {createPage} = actions;

  const results = await graphql(`
    {
      pages: allSanityBasicPage(
        filter: {slug: {current: {ne: null}}, id: {ne: null}}
      ) {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  const pages = results.data.pages.nodes;
  const template = require.resolve('./src/templates/basicPage.js');

  await buildLocalizedPages(
    pages,
    ({slug}, lang, i18n) => ({
      path: lang === 'en' ? `/${slug.current}` : `/${lang}/${slug.current}`,
      component: template,
      context: {
        originalPath: slug.current,
        slug: slug.current,
      },
    }),
    createPage,
    reporter
  );
}

const createHomePage = async (actions, reporter) => {
  const {createPage} = actions;
  const homeTemplate = path.resolve(`src/templates/home.js`);
  await buildLocalizedPages(
    null,
    (_, lang) => ({
      path: lang === 'en' ? '/' : `/${lang}`,
      component: homeTemplate,
      context: {
        originalPath: '/',
      },
    }),
    createPage,
    reporter
  );
};

const createCartPage = async (actions, reporter) => {
  const {createPage} = actions;
  const homeTemplate = path.resolve(`src/templates/home.js`);
  await buildLocalizedPages(
    null,
    (_, lang) => ({
      path: lang === 'en' ? '/cart' : `/${lang}/cart`,
      component: homeTemplate,
      context: {
        cart: true,
        originalPath: '/cart',
      },
    }),
    createPage,
    reporter
  );
};

const createShop = async (actions, reporter) => {
  const {createPage} = actions;
  const shopTemplate = path.resolve(`src/templates/shop.js`);
  await buildLocalizedPages(
    null,
    (_, lang) => ({
      path: lang === 'en' ? '/our-shop' : `/${lang}/our-shop`,
      component: shopTemplate,
      context: {
        originalPath: '/our-shop',
      },
    }),
    createPage,
    reporter
  );
};

const createTransparencyPage = async (actions, reporter) => {
  const {createPage} = actions;
  const transparencyTemplate = path.resolve(`src/templates/transparency.js`);
  await buildLocalizedPages(
    null,
    (_, lang) => ({
      path: lang === 'en' ? '/transparency' : `/${lang}/transparency`,
      component: transparencyTemplate,
      context: {
        originalPath: '/transparency',
      },
    }),
    createPage,
    reporter
  );
};

const buildLocalizedPages = async (
  inputData,
  pageDefinitionCallback,
  createPage,
  reporter
) => {
  if (!Array.isArray(inputData)) {
    inputData = [inputData];
  }

  await Promise.all(
    inputData.map(async (data) => {
      const defs = await Promise.all(
        languages.map(async (language) => {
          // (1) use the given callback to generate the definition to create the Gatsby page
          const def = pageDefinitionCallback(data, language);

          // (2) The Gatsby page will receive the language and the loaded language key along with the definition returned by the callback
          def.context.lang = language;
          return def;
        })
      );

      // (3) Map over all definitions, which contain the final URL and the language, to generate the alternate links
      const alternateLinks = defs.map((def) => ({
        lang: def.context.lang,
        path: def.path,
      }));

      // (4) Finally, we create pages for all definitions.
      defs.forEach((def) => {
        reporter.info(`Creating page: ${def.path}`);
        def.context.alternateLinks = alternateLinks;
        createPage(def);
      });
    })
  );
};

exports.createPages = async ({graphql, actions, reporter}) => {
  await createLandingPages(graphql, actions, reporter);
  await createBasicLandingPages(graphql, actions, reporter);
  await createHomePage(actions, reporter);
  await createShop(actions, reporter);
  await createTransparencyPage(actions, reporter);

  await createProducts(graphql, actions, reporter);
  await createCartPage(actions, reporter);
};

exports.onCreatePage = ({page, actions}) => {
  const {createPage} = actions;
  // Only update the `/account` page.
  if (page.path.match(/^\/account/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/account/*';
    // Update the page.
    createPage(page);
  }
};
