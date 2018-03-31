module.exports = (gallery, sidebar, overview) => {
console.log(overview);
return `
<div id="App">${gallery}</div>
<div id="Sidebar">${sidebar}</div>
<div id="Overview">${String(overview)}</div>
`;}
