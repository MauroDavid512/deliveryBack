const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preloadUsers, preloadRest, preloadFood,preloadCategories } = require('./src/routes/utils.js')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    preloadUsers()
    setTimeout(()=>{
      preloadRest()
    },1000)
    setTimeout(()=>{
      preloadFood()
    },2000)
    
    preloadCategories()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


setTimeout(()=>{

},1000)