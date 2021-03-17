const withTM = require('next-transpile-modules')(['react-hook-speech-to-text']); // pass the modules you would like to see transpiled
const withPWA = require('next-pwa')

module.exports = withPWA(withTM({
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
  async rewrites() {
    return [
	    {
	      source: "/bee.js",
	      destination: "https://cdn.splitbee.io/sb.js",
	    },
	    {
	      source: "/_hive/:slug",
	      destination: "https://hive.splitbee.io/:slug",
	    },
	  ];
  },
  pwa: {
    dest: 'public'
  }
}))