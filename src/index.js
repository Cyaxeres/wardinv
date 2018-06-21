import app from './app';
// import browserSync from 'browser-sync';
// import fs from 'fs';

const {
  PORT = 8080
} = process.env;

app.on('listening',function(){
  console.log('server is running');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console 
});