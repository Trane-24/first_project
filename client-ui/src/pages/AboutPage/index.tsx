import React, { useEffect } from 'react';
// utilites
import { toTop } from 'utilites/utilites';
// Styles
import classes from './styles.module.scss';

const AboutPage: React.FC = () => {

  useEffect(() => {
    toTop();
  }, []);
  return (
    <section>
      <div className={[classes.block, 'container'].join(' ')}>
        <div>
          <h2 className={classes.title}>About</h2>
          <p className={classes.subtitle}>mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis</p>
        </div>

        <img src='img/about/about.jpeg' alt="about" className={classes.image} />
      </div>
  
      <div style={{ backgroundColor: '#eee' }}>
        <div className={[classes.ourMission, 'container'].join(' ')} >
          <img src='img/about/ourMission.svg' alt="Our mission" />
          <h3 className={classes.title}>Our mission</h3>
          <p>pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus</p>
        </div>
      </div>

      <div className={[classes.block, 'container'].join(' ')}>
        <img src='img/about/hassleFreeTravel.jpg' alt="Hassle free travel" className={classes.image} />
        <div>
          <h3 className={classes.title}>Hassle free travel</h3>
          <p className={classes.subtitle}>diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'rgba(238, 238, 238, 0.6)' }}>
        <div className={[classes.block, 'container'].join(' ')}>
          <div>
            <h3 className={classes.title}>Our team</h3>
            <p className={classes.subtitle}>diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper</p>
          </div>
          <img src='img/about/our-team.jpeg' alt="our_team" className={classes.image} />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;