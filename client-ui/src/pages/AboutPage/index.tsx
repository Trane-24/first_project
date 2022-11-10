import React from 'react';
// Styles
import classes from './styles.module.scss';

const AboutPage: React.FC = () => {
  return (
    <section>
      <div className={[classes.about, 'container'].join(' ')}>
        <div>
          <h2 className={classes.title}>About</h2>
          <p>With more than 30 years of combined experience delivering luxury vacations through our premium hotel partners, you can trust the owners of Hotels to ensure your vacation is everything you expect. We are travelers helping travelers, our expertise on all of our destinations offer our guests travel planning without unanswered questions.</p>
        </div>

        <img src='img/about/about.png' alt='about'/>
      </div>

      <div className={classes.ourMission}>
        <div className={[classes.ourMission_content, 'container'].join(' ')}>
          <img src='img/about/ourMission.svg' alt='our_mission'/>
          <h3 className={classes.title}>Our mission</h3>
          <p>
            is to offer our guests guidance, peace of mind and personal service throughout the vacation rental process.
          </p>
        </div>
      </div>

      <div className={[classes.hassleFreeTravel, 'container'].join(' ')}>
        <img src='img/about/hassleFreeTravel.jpg' alt='hassleFreeTravel'/>
        <div>
          <h3 className={classes.title}>Hassle free travel</h3>
          <p>Travel has become more complex, with varying destination requirements and changing security measures, you can trust our staff to get you to your destination and back hassle free.</p>
        </div>
      </div>

      <div className={classes.ourTeam}>
        <div className={[classes.ourTeam_content, 'container'].join(' ')}>
          <div>
            <h3 className={classes.title}>Our team</h3>
            <p>Hotels is an all-male team of Front-end technology specialists. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe et omnis eaque nemo hic quae nulla iure enim</p>
          </div>
          <img src='img/about/our-team.jpg' alt='our_team' />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;