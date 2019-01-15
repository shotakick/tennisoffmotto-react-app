import * as React from 'react';

const algoliaLogoStyle: React.CSSProperties = {
  marginLeft: '5px',
  marginRight: '5px'
};
const algoliaLogo = () => (
  <div className={'AlgoliaLogo'} style={algoliaLogoStyle}>
    <a href={'https://www.algolia.com'} target={'_blank'} rel={'noopener'}>
      <img
        src={'images/search-by-algolia-light-background-1961896d.svg'}
        alt={'Search by Algolia'}
        width={130}
        height={19}
      />
    </a>
  </div>
);
export default algoliaLogo;
