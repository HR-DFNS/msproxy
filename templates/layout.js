module.exports = (title, body, scripts) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <link rel="stylesheet" href="/styles.css">
    <!-- <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700|Roboto:400,700" rel="stylesheet">
    <link rel="icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico" type="image/x-icon">
  
      <meta charset="UTF-8">
      <title>${title}</title>
    </head>
    <body>
    ${body}
    <div id="recommendations-app"></div>
    </body>
    ${scripts}
    <script src="http://54.193.96.60:3004/restaurants/id/bundle.js"></script>
  </html>
`;