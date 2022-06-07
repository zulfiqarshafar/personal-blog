import React, { forwardRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CircularProgress from "@mui/material/CircularProgress";
import "./PostEditor.css";

const PostEditor = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);

  const editorRef = ref;

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <div className="create-article__content__editor">
      {loading && (
        <div className="create-article__content__editor__overlay">
          <CircularProgress color="inherit" />
        </div>
      )}

      <form
        className="create-article__content__editor__form"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Editor
          apiKey="your-api-key"
          onInit={(evt, editor) => {
            editorRef.current = editor;
            setLoading(false);
          }}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "save",
            ],
            toolbar:
              "save | undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | image | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.addEventListener("change", (e) => {
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                  */
                  const id = "blobid" + new Date().getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(",")[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
              });

              input.click();
            },
            // save_onsavecallback: () => {
            //   handleSubmit();
            // },
          }}
        />
        {/* <button onClick={log}>Log editor content</button> */}
      </form>
    </div>
  );
});

export default PostEditor;
