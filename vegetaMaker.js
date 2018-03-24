const fs = require('fs');
const stream = fs.createWriteStream('/Users/matthewsweeney/go/src/vegeta/testNuke.txt'); // absolute path to where you are running the vegeta go script. The txt file with all the ids to hit needs to be in there
const writer = (n = 1) => {
  let isReady = true;
  while (isReady && n < 3e6 + 1) {
    var randNum = Math.floor((Math.random() * 1e6) + 1)
    var url = `GET http://localhost:3030/api/restaurants/${randNum}/gallery/`;
    if (n !== 3e6) {
      isReady = stream.write(`${url}\n`);
    } else {
      isReady = stream.write(`${url}`);
    }
    n += 1;
  }
  stream.once('drain', () => {
    writer(n);
  });
  // console.log('draining at ', n);
};
writer();