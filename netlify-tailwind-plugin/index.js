// Custom Netlify plugin to handle Tailwind CSS configuration
// This plugin temporarily modifies the postcss.config.js file during build
// and restores it afterward

module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Setting up Tailwind CSS for Netlify build...');
    
    // Create a temporary postcss.config.js that works with Netlify
    const fs = require('fs');
    const tempConfig = `
module.exports = {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }
};
    `;
    
    // Backup the original config
    try {
      if (fs.existsSync('./postcss.config.js')) {
        fs.copyFileSync('./postcss.config.js', './postcss.config.js.bak');
        fs.writeFileSync('./postcss.config.js', tempConfig);
        console.log('Created Netlify-compatible PostCSS config');
      }
    } catch (error) {
      console.error('Error setting up Tailwind for Netlify:', error);
    }
  },
  
  onBuild: ({ utils }) => {
    console.log('Tailwind CSS build completed successfully');
  },
  
  onPostBuild: ({ utils }) => {
    console.log('Restoring original Tailwind configuration...');
    
    // Restore the original config
    const fs = require('fs');
    try {
      if (fs.existsSync('./postcss.config.js.bak')) {
        fs.copyFileSync('./postcss.config.js.bak', './postcss.config.js');
        fs.unlinkSync('./postcss.config.js.bak');
        console.log('Restored original PostCSS config');
      }
    } catch (error) {
      console.error('Error restoring Tailwind configuration:', error);
    }
  }
};
