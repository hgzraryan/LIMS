// import React, { useCallback, useMemo, useState } from "react";
// import { createEditor } from "slate";
// import { Slate, Editable, withReact } from "slate-react";

// const SlateEditor = () => {
//   const editor = useMemo(() => withReact(createEditor()), []);
//   const [value, setValue] = useState([
//     {
//       type: "paragraph",
//       children: [{ text: "Start typing..." }],
//     },
//   ]);

//   return (
//     <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
//       {/* <Editable placeholder="Enter text here..." /> */}
//     </Slate>
//   );
// };

// export default SlateEditor;
