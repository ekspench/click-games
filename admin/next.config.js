const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

module.exports = withPWA({
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  async redirects() {
    return [
     /* {
        source: "/",
        destination: "/grocery",
        permanent: false,
      },*/
    ];
  },
  images: {
    domains: [
      "googleusercontent.com",
      "localhost",
      "graph.facebook.com",
"platform-lookaside.fbsbx.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "test.api.click-univers.com",
       "api.click-univers.com",
       "api.click-univers.local",
       "test.api.click-games.local",
      "click-univers.com",
      "18.141.64.26",
      "dev.api.click-univers.com",
      "localhost:8000",
      "via.placeholder.com",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
      "lh3.googleusercontent.com",
      "dev.api.click-games.fr",
      "api.click-games.fr",
      "api.click-games.local",
      "api-test.click-games.fr",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    

  },

});
