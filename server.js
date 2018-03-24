const express = require('express')
const morgan = require('morgan');
const path = require('path');
const React = require('react');
const ReactDom = require('react-dom/server');
const app = express();
const port = process.env.PORT || 4000;
const request = require('request');
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

// app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));
app.get('/restaurants/:id', function(req, res){
  let components = renderComponents(services);
  res.end(Layout(
    'WeGot',
    App(...components),
    Scripts(Object.keys(services))
  ));
});
app.get('/api/restaurants/:id/gallery', (req, res) => {
  res.redirect(`http://localhost:3001/api/restaurants/${req.params.id}/gallery`)
});
app.get('/api/restaurants/:id/overview', (req, res) => {
  //res.redirect(`http://184.169.248.150/api/restaurants/${req.params.id}/overview`)
});
app.get('/api/restaurants/:id/sidebar', (req, res) => {
  //res.redirect(`http://54.177.233.239/api/restaurants/${req.params.id}/sidebar`)
});
app.get('/api/restaurants/:id/recommendations', (req, res) => {
  //res.redirect(`http://52.89.102.101/api/restaurants/${req.params.id}/recommendations`)
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
