export default function ActivityLog({ activities }) {
  return (
    <div className="activity-log">
      <h2>Activity Log</h2>

      {activities.length === 0 && <p>No activity yet</p>}

      {activities.map((activity) => (
        <div className="activity-item" key={activity._id}>
          <p>{activity.message}</p>
          <small>
            {activity.user} •{" "}
            {new Date(activity.createdAt).toLocaleTimeString()}
          </small>
        </div>
      ))}
    </div>
  );
}