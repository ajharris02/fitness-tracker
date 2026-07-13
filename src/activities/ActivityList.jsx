import axios from "axios";
import { useState } from "react";

export default function ActivityList({ activities, setActivities }) {
  const [error, setError] = useState();
  const removeActivity = async (activityId) => {
    try {
      await axios.delete(
        `https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        },
      );
      setActivities(
        activities.filter((activity) => {
          return activity.id !== activityId;
        }),
      );
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.status);
    }
  };
  return (
    <>
      {error === 403 ? <h3>User not authorized to delete activity.</h3> : null}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            <button
              onClick={() => {
                removeActivity(activity.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
