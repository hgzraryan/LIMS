import React from "react";
import { useEffect, useRef } from "react";
import {
  GanttComponent,
  Inject,
  Selection,
  Filter,
  Sort,
  ColumnMenu,
  Resize,
  Edit,
  Reorder,
  UndoRedo,
  ContextMenu,
  ColumnsDirective,
  ColumnDirective,
  Toolbar,
  DayMarkers,
} from "@syncfusion/ej2-react-gantt";
import { projectNewData } from "./data";

function GanttChart() {
  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    child: "subtasks",
  };
  const labelSettings = {
    leftLabel: "TaskName",
  };
  const undoRedoActions = [
    "Sorting",
    "Add",
    "ColumnReorder",
    "ColumnResize",
    "ColumnState",
    "Delete",
    "Edit",
    "Filtering",
    "Indent",
    "Outdent",
    "NextTimeSpan",
    "PreviousTimeSpan",
    "RowDragAndDrop",
    "Search",
  ];
  const splitterSettings = {
    columnIndex: 4,
  };
  const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };
  const toolbar = [
    "Add",
    "Edit",
    "Update",
    "Delete",
    "Cancel",
    "Search",
    "Undo",
    "Redo",
  ];
  const projectStartDate = new Date("03/24/2019");
  const projectEndDate = new Date("07/06/2019");
  return (
    <div className="control-pane">
      <div className="control-section">
        <GanttComponent
          id="ColumnMenu"
          treeColumnIndex={1}
          showColumnMenu={true}
          allowFiltering={true}
          allowSorting={true}
          allowResizing={true}
          dataSource={projectNewData}
          highlightWeekends={true}
          splitterSettings={splitterSettings}
          taskFields={taskFields}
          labelSettings={labelSettings}
          height="100%"
          enableUndoRedo={true}
          enableContextMenu={true}
          allowReordering={true}
          editSettings={editSettings}
          toolbar={toolbar}
          undoRedoActions={undoRedoActions}
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="TaskID"
              headerText="ID"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="TaskName"
              headerText="Name"
              width="250"
            ></ColumnDirective>
            <ColumnDirective field="StartDate"></ColumnDirective>
            <ColumnDirective field="EndDate"></ColumnDirective>
            <ColumnDirective field="Duration"></ColumnDirective>
            <ColumnDirective field="Progress"></ColumnDirective>
            <ColumnDirective
              field="Predecessor"
              headerText="Dependency"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject
            services={[
              Selection,
              Filter,
              Sort,
              ColumnMenu,
              Resize,
              Edit,
              Reorder,
              UndoRedo,
              ContextMenu,
              Toolbar,
              DayMarkers,
            ]}
          />
        </GanttComponent>
      </div>
    </div>
  );
}

export default GanttChart;