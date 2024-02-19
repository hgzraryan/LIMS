import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Modal } from "react-bootstrap";
import BoardComponent from "./BoardComponent";
import { v4 as uuidv4 } from "uuid";
import { axiosPrivate } from "../../api/axios";
import "./Styles/customStyle.scss";

function ResearchViewBoard({
  selectedItem,
  handleCloseStatusModal,
  setResearches,
  researches,
}) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(selectedItem);
  }, [selectedItem]);
  const updateData = async (data) => {
    
    try {
      const response = await axiosPrivate.post("./updateStatusBoard", JSON.stringify({
        statusBoard: data?.statusBoard,
        diagnosticsId:selectedItem?.diagnosticsId
      }));
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.type === "CARD") {
      const { source, destination, draggableId } = result;

      const sourceColumn = columns.statusBoard?.filter(
        (ele) => ele.id === source.droppableId)[0];

        const destColumn = columns.statusBoard?.filter(
          (ele) => ele.id === destination.droppableId
        )[0];
        const reorderedColumn = columns.statusBoard?.filter(
          (ele) => ele.id === source.droppableId
        )[0];

      // If the item was moved within the same column
      if (source.droppableId === destination.droppableId) {
        const copiedResearches = [...reorderedColumn.researches];
        const [removed] = copiedResearches.splice(source.index, 1);
        copiedResearches.splice(destination.index, 0, removed);
        let updatedColumn = columns.statusBoard?.map((el) => {
          if (el.id === sourceColumn.id) {
            el.researches = copiedResearches;
          }
          return el;
        });
        const updatedColumns = {statusBoard:updatedColumn}
        
        
        setColumns((state) => updatedColumns);
        updateData(updatedColumns)
        
      } else {
        // If the item was moved to a different column  
          const sourceItems = [...sourceColumn.researches];

        const destItems = [...destColumn.researches];

        const [removed] = sourceItems.splice(source.index, 1);
        
        destItems.splice(destination.index, 0, removed);

        const newColumns = columns.statusBoard?.map((el) => {
          if (el.id === sourceColumn.id) {
             el.researches = sourceItems;
          } else if (el.id === destColumn.id) {
             el.researches = destItems;
          }
          return el
        });
        const updatedColumns = {statusBoard:newColumns}
        setColumns(updatedColumns)
        updateData(updatedColumns)

      }
    }
  };
  return (
    <>      
        <Modal show={selectedItem}  onHide={handleCloseStatusModal} dialogClassName="custom-modal ">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                textAlign: "center",
              }}
            >
              Հետազոտություններ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <div className="statusBoardContainer">
                <div className="statusBoardHeader"></div>

                <div className="statusBoardBody">
                  <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <div className="boardOuter">
                      <BoardComponent
                        columns={columns?.statusBoard}
                        selectedItem={selectedItem}
                      />
                    </div>
                  </DragDropContext>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      
    </>
  );
}
export default ResearchViewBoard;
