var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
	// debug: true,
	webpack_assets_file_path: 'webpack-assets.json',
	webpack_stats_file_path: 'webpack-stats.json',
	assets: {
		images: {
			extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
		},
		styles: {
			extensions: ['less', 'scss', 'css'],
			filter: function(module, regex, options, log) {
				if (options.development) {
					return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
				}
				return regex.test(module.name)
			},
			path: function(module, options, log) {
				if (options.development) {
					return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
				}
				return module.name
			},
			parser: function(module, options, log) {
				if (options.development) {
		        	return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
		        }
		        return module.source
			}
		}
	}
}
