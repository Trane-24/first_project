interface IConfig {
  [key:string]: {
    production: boolean;
    apiURL: string;
    serverURL: string;
  }
}

const config:IConfig = {
  'development': {
    production: false,
    apiURL: 'http://localhost:5000/api',
    serverURL: 'http://localhost:5000',
  },
  'qa': {
    production: false,
    apiURL: 'https://enigmatic-dusk-45240.herokuapp.com/api',
    serverURL: 'http://localhost:5000',
  },
  'production': {
    production: true,
    apiURL: 'https://enigmatic-dusk-45240.herokuapp.com/api',
    serverURL: 'http://localhost:5000',
  }
};

const stage:string = process.env.REACT_APP_STAGE || 'development';

export default config[stage];
