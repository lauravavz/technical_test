import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Turn your raw data into a gold mine',
    Svg: require('../../static/img/undraw_programmer_imem.svg').default,
    description: (
      <>
        Lettria was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Analyze your documents to extract key information',
    Svg: require('../../static/img/undraw_proud_coder_7ain.svg').default,
    description: (
      <>
        Thanks to its optimized performance and easy integration, the Lettria API will help you analyze your raw data to bring out the key elements.
      </>
    ),
  },
  {
    title: 'Structure your customer data',
    Svg: require('../../static/img/undraw_code_inspection_bdl7.svg').default,
    description: (
      <>
        The Lettria API efficiently and rigorously analyzes all points of contact with your customers (email, support, telephone). 
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
