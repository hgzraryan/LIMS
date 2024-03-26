import { useState } from "react";

import "./Styles/CardComponent.scss";
import { Draggable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";
import EditModal from "./EditModal";

export const CardComponent = ({ item, index, key,selectedItem }) => {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  //const [activityId, setActivityId] = useState("");
  const [activity, setActivity] = useState("");

  const handleActivity = (obj) => {    
    setOverlayIsOpen(true);
    //setActivityId(obj.id);
    setActivity(obj);
  };

  return (
    <Draggable key={item?.id} draggableId={item?.id + ""} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
           {overlayIsOpen && (
            <EditModal overlayIsOpen={overlayIsOpen} setOverlayIsOpen={setOverlayIsOpen} activity={activity} selectedItem={selectedItem}/>
          )}
          <ActivityCard
            activity={item}
            onActivityClick={() => handleActivity(item)}
          />
        </div>
      )}
    </Draggable>
  );
};
