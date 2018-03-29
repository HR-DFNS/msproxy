const express = require('express')
const morgan = require('morgan');
const path = require('path');
const React = require('react');
const ReactDom = require('react-dom/server');
const app = express();
const port = process.env.PORT || 4000;
const request = require('request');
const redis = require('redis');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');
//app.use(morgan('dev'));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item]);
    return ReactDom.renderToString(component);
  });
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/restaurants/1/');
});

app.get('/restaurants/:id', function(req, res){
  let components = renderComponents(services);
  const rendered = Layout(
    'WeGot',
    App(...components),
    Scripts(Object.keys(services))
  );
  res.end(rendered);
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  const response = res.redirect(`http://g-1938099559.us-west-1.elb.amazonaws.com/api/restaurants/${req.params.id}/gallery`);
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
