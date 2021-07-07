require("dotenv").config()

exports.shopifyConfig = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_TOKEN,
}
