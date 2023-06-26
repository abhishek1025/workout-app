import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { ACTION_TYPES } from '../context/workout.reducer';

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {

    const fetchWorkouts = async () => {
      const res = await fetch('/api/workouts')
      const jsonData = await res.json()
      if (res.ok) {
        dispatch({ type: ACTION_TYPES.SET_WORKOUTS, payload: jsonData });
      }
    }

    fetchWorkouts()
  }, [dispatch])


  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;
