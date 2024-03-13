import React from "react";
import "./Styles/ActivityCard.scss";
import "./Styles/EntityCard.scss";

function ActivityCard({ activity, onActivityClick }) {
  return (
    <div
      className="activity"
      onClick={() => {
        onActivityClick(activity.id);
      }}
    >
      <div className="entity-card">
        {/* <div className="activity-card-header d-flex align-items-center">
          {activity.assignee ? (
            <span className="activity-card-avatar">
              { activity?.assignee?.firstName[0] }
            </span>
          ) : (
            <span className="activity-card-avatar empty" style={{backgroundColor:'red'}}/>
          )}
        </div> */}
        <div className={"entity-card-title"}>{activity?.name}</div>

        <div className="entity-card-result">{activity?.id}</div>
        {/* <div className="activity-card-footer">activity-card-footer</div> */}
      </div>
    </div>
  );
}

export default ActivityCard;
