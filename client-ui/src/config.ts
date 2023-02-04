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
    apiURL: 'https://whiteboard-me7hsknbqa-lm.a.run.app/api/client',
    wsURL: 'wss://whiteboard-me7hsknbqa-lm.a.run.app',
  }
};

const stage:string = process.env.REACT_APP_STAGE || 'development';

export default config[stage];
