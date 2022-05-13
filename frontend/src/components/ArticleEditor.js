import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import "./ArticleEditor.css";

// console.log(DecoupledEditor.builtinPlugins.map((plugin) => plugin.pluginName));

function ArticleEditor() {
  let editor = null;

  return (
    <div className="create-article__content__editor">
      <div className="document-editor__toolbar"></div>
      <div className="document-editor__editable-container">
        <CKEditor
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
            window.editor = editor;

            // Insert the toolbar before the editable area.
            const toolbarContainer = document.querySelector(
              ".document-editor__toolbar"
            );
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          }}
          onError={(error, { willEditorRestart }) => {
            // If the editor is restarted, the toolbar element will be created once again.
            // The `onReady` callback will be called again and the new toolbar will be added.
            // This is why you need to remove the older toolbar.
            if (willEditorRestart) {
              editor.ui.view.toolbar.element.remove();
            }
          }}
          onChange={(event, editor) => console.log({ event, editor })}
          editor={DecoupledEditor}
          data="<p>Hello from CKEditor 5's decoupled editor!</p>"
          config={
            {
              // plugins: [CKFinder],
            }
          }
          ckfinder={{
            // Upload the images to the server using the CKFinder QuickUpload command.
            uploadUrl:
              "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
          }}
        />
      </div>
    </div>
  );
}

export default ArticleEditor;
