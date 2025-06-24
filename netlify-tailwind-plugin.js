// Custom Netlify plugin to ensure @tailwindcss/postcss works correctly
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Setting up custom Tailwind CSS configuration for Netlify...');
    
    // Create a temporary postcss.config.js that works with Netlify
    const fs = require('fs');
    const tempConfig = `
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
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
    console.log('Build completed with custom Tailwind configuration');
  },
  
  onPostBuild: ({ utils }) => {
    // Restore the original config
    const fs = require('fs');
    try {
      if (fs.existsSync('./postcss.config.js.bak')) {
        fs.copyFileSync('./postcss.config.js.bak', './postcss.config.js');
        fs.unlinkSync('./postcss.config.js.bak');
        console.log('Restored original PostCSS config');
      }
    } catch (error) {
      console.error('Error restoring original PostCSS config:', error);
    }
  }
};
