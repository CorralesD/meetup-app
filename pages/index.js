import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';


const HomePage = (props) => {
    
    return (
      <Fragment>
        <Head>
          <title>Meetup List</title>
          <meta name='description' content='List of Meetups' />
        </Head>
        <MeetupList meetups={props.meetups} />
      </Fragment>
    );
}

// export const getServerSideProps = async () => {

//   const meetups = [];

//   await fetch(
//     'https://meetup-app-8fd08-default-rtdb.firebaseio.com/meetups.json'
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       for (const key in data) {
//         const meetup = {
//           id: key,
//           ...data[key],
//         };
//         meetups.push(meetup);
//       }
//     });
    
//   return {
//     props: {
//       meetups
//     }
//   }
// }

export const getStaticProps = async () => {

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
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup.id,
      })),
    },
  };
}

export default HomePage;