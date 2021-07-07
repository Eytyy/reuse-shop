// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import basicBlockContent from './basicBlockContent';

import shopSettings from './documents/shopSettings';
import siteSettings from './documents/siteSettings';
import transparency from './documents/transparency';
import front from './documents/front';
import page from './documents/page';
import basicPage from './documents/basicPage';
import * as pageModules from './modules';

import category from './documents/category';
import product from './documents/product';
import maker from './documents/maker';
import variant from './documents/variant';
import color from './documents/color';
import material from './documents/material';
import cost from './documents/cost';

import * as structure from './structure';

import localeString from './locale/String';
import localeText from './locale/Text';
import localeBlockContent from './locale/BlockContent';
import localeBasicBlockContent from './locale/BasicBlockContent';

import menu from './documents/menu';

import shopLocale from './documents/locale/shopLocale';
import productLocale from './documents/locale/productLocale';
import siteLocale from './documents/locale/siteLocale';

import menuItem from './objects/menuItem';
import externalLink from './objects/externalLink';
import event from './objects/event';

import headerText from './objects/headerText';
import headertypes from './objects/headertypes';
import headerTextOptions from './objects/headerTextOptions';
import headlineAndBody from './objects/headlineAndBody';

import linkTypes from './objects/linkTypes';
import linkOptions from './objects/linkOptions';
import link from './objects/link';

import translation from './objects/translation';
import translationText from './objects/translationText';

const allStructureObjects = Object.values(structure).map((obj) => {
  return {...obj, fields: obj.fields};
});

const allModules = Object.values(pageModules).map((pageModule) => {
  return {...pageModule, fields: pageModule.fields};
});

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes
    .concat([
      linkTypes,
      linkOptions,
      link,

      // The following are document types which will appear
      // in the studio.
      shopSettings,
      siteSettings,
      transparency,
      menu,
      front,
      page,
      basicPage,
      menuItem,

      shopLocale,
      productLocale,
      siteLocale,

      externalLink,
      event,
      headerText,
      headerTextOptions,
      headertypes,
      headlineAndBody,
      translation,
      translationText,

      product,
      maker,
      category,
      color,
      material,
      cost,
      // When added to this list, object types can be used as
      // { type: 'typename' } in other document schemas
      blockContent,
      basicBlockContent,
      localeText,
      localeBlockContent,
      localeBasicBlockContent,
      localeString,
      variant,
    ])
    .concat(allModules, allStructureObjects),
});
