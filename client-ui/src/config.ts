interface IConfig {
  [key:string]: {
    production: boolean;
    apiURL: string;
    wsURL: string;
  }
}

const config:IConfig = {
  'development': {
    production: false,
    apiURL: 'http://localhost:5000/api/client',
    wsURL: 'ws://localhost:5000',
  },
  'production': {
    production: true,
    apiURL: 'https://api-hotels-reservations.appspot.com/api/client',
    wsURL: 'ws://api-hotels-reservations.appspot.com',
  }
};

const stage:string = process.env.REACT_APP_STAGE || 'development';

export default config[stage];
