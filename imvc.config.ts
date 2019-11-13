import path from 'path'
import { Config } from 'react-imvc'

const config: Config = {
	restapi: 'https://cnodejs.org/api/v1',
	favicon: path.join(__dirname, 'favicon.ico'),
	staticEntry: 'index.html',
	// bundleAnalyzer: true,
}

export default config