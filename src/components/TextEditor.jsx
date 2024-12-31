import React from "react";
// import ReactQuill from "react-quill";
import dynamic from 'next/dynamic'
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
const TextEditor = ({ className, placeholder, value, onChange }) => {
  
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  return (
    <ReactQuill
      modules={{ toolbar: toolbarOptions }}
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextEditor;
