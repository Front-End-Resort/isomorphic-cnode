process.env.NODE_ENV = 'production'

import ReactIMVC from 'react-imvc'
import config from './imvc.config'

ReactIMVC.start({
	config: {
		...config,
		root: __dirname,
		logger: 'dev',
	}
})