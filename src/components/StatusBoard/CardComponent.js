import { useState } from "react";

import "./Styles/CardComponent.scss";
import { Draggable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";

export const CardComponent = ({ item, index, key }) => {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [activityId, setActivityId] = useState("");

  const handleActivity = (obj) => {
    setOverlayIsOpen(true);
    setActivityId(obj.id);
  };

  return (
    <Draggable key={item.id} draggableId={item.id + ""} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ActivityCard
            activity={item}
            //onActivityClick={() => handleActivity(item)}
          />
        </div>
      )}
    </Draggable>
  );
};
