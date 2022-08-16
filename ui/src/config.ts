interface IConfig {
  [key:string]: {
    production: boolean;
    apiURL: string;
  }
}

const config:IConfig = {
  'development': {
    production: false,
    apiURL: 'https://enigmatic-dusk-45240.herokuapp.com/api',
  },
  'qa': {
    production: false,
    apiURL: 'https://enigmatic-dusk-45240.herokuapp.com/api',
  },
  'production': {
    production: true,
    apiURL: 'https://enigmatic-dusk-45240.herokuapp.com/api',
  }
};

const stage:string = process.env.REACT_APP_STAGE || 'development';

export default config[stage];
