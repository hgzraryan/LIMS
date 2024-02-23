import React from "react";
import { Droppable } from "react-beautiful-dnd";

import "./Styles/BoardComponent.scss";
import ColumnComponent from "./ColumnComponent";
function BoardComponent({ selectedItem, columns }) {
  return (
    <Droppable type="COLUMN" droppableId="Column" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className="boardOuterDroppable"
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#d2d3d4" : "#f3f4f5",
          }}
        >
          {columns?.map((column, index) => (
            <>
            <ColumnComponent
              key={column.id}
              columnIndex={index}
              columnId={column.id}
              columnTitle={column.title}
              columnColor={column.color}
              columnItems={column.researches}
              selectedItem={selectedItem}
              // myActivitiesList={data}
              />
              </>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default BoardComponent;
