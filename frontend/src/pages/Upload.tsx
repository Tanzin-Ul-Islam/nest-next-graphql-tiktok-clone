import React, { useEffect, useRef, useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import { GiBoxCutter } from "react-icons/gi"
import UploadError from "../components/UploadError"
import { CREATE_POST } from "../graphql/mutation/CreatePost"
import { useMutation } from "@apollo/client"
export default function Upload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileDisplay, setFileDisplay]: any = useState(null);
  const [fileData, setFileData] = useState(null);
  const [file, setFile] = React.useState<File | null>(null)
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorType, setErrorType] = React.useState<string | null>(null);

  const [createPost] = useMutation(CREATE_POST, {
    onError: (err: any) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions?.errors)
    },
    variables: {
      text: caption,
      video: fileData,
    }
  })
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFileDisplay(URL.createObjectURL(e.target.files[0]));
    }
  }
  async function handleCreatePost(e: any) {
    e.preventDefault();
    try {
      console.log(fileData);
      setIsUploading(true);
      await createPost();
      setIsUploading(false);
      setShow(true);
      clearVideo();
    } catch (error) {
      console.log(error)
      return;
    }
  }

  function onDropFile(e: React.DragEvent<HTMLLabelElement>) {
    setErrorType(null);
    setFile(e.dataTransfer.files[0]);
    const extension = e.dataTransfer.files[0].name.split(".").pop();
    if (extension !== "mp4") {
      setErrorType("file");
      return;
    }
    setFileDisplay(URL.createObjectURL(e.dataTransfer.files[0]));
  }
  function clearVideo() {
    setFile(null);
    setFileDisplay(null);
  }
  function discard() {
    setFile(null);
    setFileDisplay(null);
    setCaption("");
  }

  useEffect(() => {
    if (caption.length >= 150) {
      setErrorType("caption");
      return;
    }
    setErrorType(null)
  }, [errorType, caption])
  return (
    <>
      <UploadError errorType={errorType} />
    </>
  )
}
