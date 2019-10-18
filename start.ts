process.env.NODE_ENV = 'production'

import ReactIMVC from 'react-imvc'
var config = require('./imvc.config')

ReactIMVC.start({
	config: {
		...config,
		root: __dirname,
		logger: 'dev',
	}
})