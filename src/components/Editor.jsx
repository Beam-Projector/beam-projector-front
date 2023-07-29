import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { useRef, useEffect } from "react";

Quill.register("modules/imageResize", ImageResize);

const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [
    {
      color: [
        "#000000",
        "#e60000",
        "#ff9900",
        "#ffff00",
        "#008a00",
        "#0066cc",
        "#9933ff",
        "#ffffff",
        "#facccc",
        "#ffebcc",
        "#ffffcc",
        "#cce8cc",
        "#cce0f5",
        "#ebd6ff",
        "#bbbbbb",
        "#f06666",
        "#ffc266",
        "#ffff66",
        "#66b966",
        "#66a3e0",
        "#c285ff",
        "#888888",
        "#a10000",
        "#b26b00",
        "#b2b200",
        "#006100",
        "#0047b2",
        "#6b24b2",
        "#444444",
        "#5c0000",
        "#663d00",
        "#666600",
        "#003700",
        "#002966",
        "#3d1466",
        "custom-color",
      ],
    },
    { background: [] },
  ],
  [{ align: [] }],
  ["clean"],
];

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
  imageResize: {
    // https://www.npmjs.com/package/quill-image-resize-module-react 참고
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const Editor = ({ value, setValue }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef != null && quillRef.current != null) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", () => {
        document.querySelector(".input-image-upload").click();
      });
    }
  }, []);

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append("api_key", "618146626818528");
    formData.append("upload_preset", "hoh2g1dm");
    formData.append("file", file);

    fetch(`https://api.cloudinary.com/v1_1/ji/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.url) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", response.url);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="quill-editor"
        placeholder={"프로젝트 소개를 입력해주세요"}
        preserveWhitespace
        ref={quillRef}
      />
      <input
        type="file"
        accept="image/*"
        className="input-image-upload"
        tabIndex="-1"
        style={{ display: "none" }}
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
    </>
  );
};

export default Editor;
