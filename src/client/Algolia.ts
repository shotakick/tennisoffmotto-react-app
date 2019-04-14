import algoliasearch from 'algoliasearch';

const appId = process.env.REACT_APP_ALGOLIA_APP_ID || 'none';
const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY || 'none';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex('events');

export default index;
