const { getDefaultConfig } = require('@expo/metro-config');

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
    evaPackage: '@eva-design/eva',
    // Optional, but may be useful when using mapping customization feature.
    // customMappingPath: './custom-mapping.json',
  };

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = async () => {
  return MetroConfig.create(evaConfig, defaultConfig);
};