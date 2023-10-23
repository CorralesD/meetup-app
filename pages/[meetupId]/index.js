import MeetupDetail from '@/components/meetups/MeetupDetail';
import Head from 'next/head';
import { Fragment } from 'react';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        alt={props.meetupData.title}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {

  const meetups = [];

  await fetch(
    'https://meetup-app-8fd08-default-rtdb.firebaseio.com/meetups.json'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key],
        };
        meetups.push(meetup);
      }
    });

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup.id },
    })),
  };
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const meetups = [];

  await fetch(
    'https://meetup-app-8fd08-default-rtdb.firebaseio.com/meetups.json'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key],
        };
        meetups.push(meetup);
      }
    });

    const selectedMeetup = meetups.find(({ id }) => id == meetupId);

  return {
    props: {
      meetupData: selectedMeetup
    },
  };
}

export default MeetupDetails;