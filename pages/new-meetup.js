import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';


const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
      // const response = await fetch('/api/new-meetup', {
      //     method: 'POST',
      //     body: JSON.stringify(enteredMeetupData),
      //     headers: {
      //         'Content-Type': 'application/json'
      //     }
      // });

      const response = await fetch(
        'https://meetup-app-8fd08-default-rtdb.firebaseio.com/meetups.json',
        {
          method: 'POST',
          body: JSON.stringify(enteredMeetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(() => {
        router.push('/');
      });

      // const data = await response.json();
      // console.log(data);

      // router.push('/');
    }
    return (
      <Fragment>
        <Head>
          <title>New Meetup</title>
          <meta name='description' content='Add a New Meetup' />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </Fragment>
    );
}

export default NewMeetupPage;