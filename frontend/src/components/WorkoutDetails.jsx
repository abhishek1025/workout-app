import React from 'react';
import { formatDistanceToNow } from 'date-fns'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { ACTION_TYPES } from '../context/workout.reducer';


const WorkoutDetails = ({ workout }) => {
    const { _id, title, load, reps, createdAt } = workout;
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const res = await fetch(`/api/workouts/${_id}`, { method: "DELETE" })
        const json = await res.json();

        if (res.ok) {
            dispatch({ type: ACTION_TYPES.DELETE_WORKOUT, payload: json._id })
        }
    }

    const handleUpdate = () => {
        dispatch({ type: ACTION_TYPES.UPDATE_WORKOUT, payload: _id })
    }

    return (
        <div className='workout-details'>
            <h4>{title}</h4>
            <p><strong>Load (kg): </strong>{load}</p>
            <p><strong>Reps: </strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>

            <div className='delete-edit-btns flex gap-x-4'>
                <span className='material-symbols-outlined text-red-600' onClick={handleClick}>delete</span>
                <span className="material-symbols-outlined text-green-600" onClick={handleUpdate}>edit</span>
            </div>

        </div>
    )
}

export default WorkoutDetails