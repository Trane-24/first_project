import React, { useEffect } from 'react';
// Framer motion
import { motion } from 'framer-motion';
// utilites
import { toTop } from 'utilites/utilites';
// Styles
import classes from './styles.module.scss';
import { textAnimation, textAnimationRight, textAnimationTop } from 'utilites/animations';

const AboutPage: React.FC = () => {

  useEffect(() => {
    toTop();
  }, []);
  return (
    <section style={{ overflow: 'hidden'}}>
      <div className={[classes.block, 'container'].join(' ')}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2}}>
          <motion.h2 variants={textAnimation} custom={1} className={classes.title}>About</motion.h2>
          <motion.p variants={textAnimation} custom={2} className={classes.subtitle}>mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis</motion.p>
        </motion.div>

        <img src='img/about/about.jpeg' alt="about" className={classes.image} />
      </div>
  
      <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2}} style={{ backgroundColor: '#eee' }}>
        <div className={[classes.ourMission, 'container'].join(' ')} >
          <img src='img/about/ourMission.svg' alt="Our mission" />
          <motion.h3 variants={textAnimationTop} custom={2} className={classes.title}>Our mission</motion.h3>
          <motion.p variants={textAnimationTop} custom={3}>pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus</motion.p>
        </div>
      </motion.div>

      <div className={[classes.block, classes.revers, 'container'].join(' ')}>
        <img src='img/about/hassleFreeTravel.jpg' alt="Hassle free travel" className={classes.image} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2}}>
          <motion.h3 variants={textAnimationRight} custom={1} className={classes.title}>Hassle free travel</motion.h3>
          <motion.p variants={textAnimationRight} custom={2} className={classes.subtitle}>diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper</motion.p>
        </motion.div>
      </div>

      <div style={{ backgroundColor: 'rgba(238, 238, 238, 0.6)' }}>
        <div className={[classes.block, 'container'].join(' ')}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2}}>
            <motion.h3 variants={textAnimation} custom={1} className={classes.title}>Our team</motion.h3>
            <motion.p variants={textAnimation} custom={1} className={classes.subtitle}>diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper</motion.p>
          </motion.div>
          <img src='img/about/our-team.jpeg' alt="our_team" className={classes.image} />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;