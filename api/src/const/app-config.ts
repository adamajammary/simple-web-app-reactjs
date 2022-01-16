const production = false;

export const AppConfig = {
  Db: {
    Collection: 'tasks',
    Name: 'simple-web-app-reactjs',
    Url: 'mongodb://localhost:27017'
  },
  Server: {
    CorsOptions: {
      origin: (production ? 'https://reactjs.gcp.jammary.com' : 'http://localhost:3000')
    },
    Port: 4000
  }
};
