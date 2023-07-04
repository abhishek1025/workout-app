import React, { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { ACTION_TYPES } from '../context/Workout/workout.reducer';
import SearchBox from '../components/SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext();
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState([])

  const { user } = useAuthContext()

  useEffect(() => {

    const fetchWorkouts = async () => {

      const res = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const jsonData = await res.json()
      if (res.ok) {
        dispatch({ type: ACTION_TYPES.SET_WORKOUTS, payload: jsonData });
      }
    }

    if (user) fetchWorkouts()

  }, [dispatch, user])

  useEffect(() => {

    if (workouts) {
      setFilteredWorkouts(workouts.filter(workout => workout.title.includes(searchTitle)))
    }

  }, [searchTitle, workouts])

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  }

  return (
    <>
      <div className='home'>
        <div className="workouts">
          <SearchBox handleSearch={handleSearch} />
          {searchTitle
            ? filteredWorkouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
            : workouts && workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  )
}

export default Home;
