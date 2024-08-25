import * as process from 'node:process';

export default () => {
  const config = {
    domain: {
      endpoint: process.env.Iplan_BFF_Domain_Service_Endpoint,
    },
    communication: {
      endpoint: process.env.Iplan_BFF_Domain_Service_Endpoint,
    },
  };

  return config;
};
