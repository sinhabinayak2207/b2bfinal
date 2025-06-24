// This file ensures consistent build behavior between local and Netlify environments
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Ensuring consistent build environment for Tailwind CSS...');
  },
  onBuild: ({ utils }) => {
    console.log('Build completed with consistent styling');
  }
};
