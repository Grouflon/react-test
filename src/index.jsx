// https://blog.yld.io/2015/06/10/getting-started-with-react-and-node-js/#.WWJZmelpyMp

import React from 'react';
import {render} from 'react-dom';

import App from './App.jsx'


render(<App/>, document.getElementById('app'));	

if (module.hot)
{
	module.hot.accept('./App.jsx', () => {
		const NextApp = require('./App.jsx').default;
		render(<NextApp />, document.getElementById('app'));
	});
}
