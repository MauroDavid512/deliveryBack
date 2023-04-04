const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preloadRest, preloadFood } = require('./src/routes/utils.js')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    preloadRest()
    preloadFood()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
