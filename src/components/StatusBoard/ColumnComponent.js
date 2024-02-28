import React, { useState } from "react";
import "./Styles//ActivityCard.scss";
import "./Styles/EntityCard.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardComponent } from "./CardComponent";
import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";
function ColumnComponent({
  columnIndex,
  columnId,
  columnTitle,
  columnColor,
  columnItems,
  selectedItem,
}) {
  // const intl = useIntl();
  // const { globalState, handleGlobalState } = useContext(globalContext);
  const [editStatusName, setEditStatusName] = useState(false);
  const [newResearchModal,setNewResearchModal]=useState(false)
  const [optionsList] = useState(["Edit", "Delete"]);
  const statusBoard = selectedItem?.statusBoard
  // const [, setOverlayNameActivity] = useState('');
  const handleOpenOverlayActivity =()=>{
    setNewResearchModal(true)
  }
  
  return (
    <>
    {newResearchModal && (
      <ActivityModal
      overlayIsOpen={newResearchModal}
      setOverlayIsOpen={setNewResearchModal}
      selectedItem={selectedItem}
    />
    )}
    <Draggable
      draggableId={columnTitle + ""}
      index={columnIndex}
      key={columnTitle}
      isDragDisabled={columnIndex === 0}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div
            className="boardContianer column"
            style={{ borderColor: columnColor }}
          >
            <div className="board_header">
              <p className="board_header_title">{columnTitle}</p>
            </div>
            <Droppable
              key={columnId}
              droppableId={columnId + ""}
              type="CARD"
            >
              {(provided, snapshot) => (
                <div
                  className="board_cards"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "#d2d3d4"
                      : "#e7e9eb",
                    borderColor: columnColor,
                  }}
                >
                  <div className="boardCardsDrag">
                    {columnItems?.map((item, index) => (
                      <CardComponent item={item} index={index} selectedItem={selectedItem}/>
                    ))}
                  </div>
                  
                  {columnTitle === "Ընդունված" && (
                    <button
                      type="button"
                      onClick={handleOpenOverlayActivity}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Ավելացնել Հետազոտություն
                    </button>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  </>
  );
}

export default ColumnComponent;
