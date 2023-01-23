interface IConfig {
  [key:string]: {
    production: boolean;
    apiURL: string;
  }
}

const config:IConfig = {
  'development': {
    production: false,
    apiURL: 'http://localhost:5000/api/client',
  },
  'production': {
    production: true,
    apiURL: 'https://api-hotels-reservations.appspot.com/api/client',
  }
};

const stage:string = process.env.REACT_APP_STAGE || 'development';

export default config[stage];
