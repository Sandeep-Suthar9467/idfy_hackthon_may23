import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

const UPLOAD_VIDEO_URL = "http://127.0.0.1:5000/process_video";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let data = new FormData()
    data.append("video",file)
    let options = {
        url: UPLOAD_VIDEO_URL,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
    }
    setLoader(true)
    axios.request(options).then((data)=>{
        setLoader(false)
        navigate("/dashboard")
    }).catch((err)=>{
        console.log(err)
        setLoader(false)
        alert(err.message)
    })
    
  };

  return (
    <div  className="align-center mt10 mt50">
        <div>
            <h3>Upload Video</h3>
        </div>
      <div className="VideoInput">
        <input
          ref={inputRef}
          className="VideoInput_input"
          multiple={false}
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4,.webm"
        />
      </div>
      {loader && <Loader/>}
    </div>
  );
}
