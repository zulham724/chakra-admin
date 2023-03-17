const path = require('path')

module.exports = {
  env: {
    CLIENT_API_URL: "https://ppm.ardata.co.id",
    CLIENT_STORAGE_URL: "https://cdn-agpaiidigital.online/ppm",
    CLIENT_ID: 2,
    CLIENT_SECRET: "L1pCyVJtzn2T2UAOmlOGdW0GLP405o9iMZqS6qMP",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "aploEVuE90n2W7hIZlVWY0WzNUNQgLUFrnL5bhhpaI4="
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  }
}
