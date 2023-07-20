import React, { useReducer, useState }  from "react"
import "./create.css"
import { needReducer, INITIAL_STATE } from "../../reducers/needReducer";
import upload from "../../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";


const Create = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(needReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };


  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (need) => {
      return newRequest.post("/needs", need);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usereeds"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    window.location.href = "/userneeds";

    // navigate("/mygigs")
  };

    return(
      <>
        <center><h2 style={{marginTop:'10px'}}>Post Your Need to Naik-E Platform</h2></center>
        <div className="create">

        <div className="container">
          
          <div className="sections">
            <div className="info">
              <label htmlFor="">Title</label>
              <input style={{border:'.5px solid #00aded' }} 
                type="text"
                name="title"
                placeholder="e.g.Describe Your Need Shortly 10-20 words"
                onChange={handleChange}/>
              <label htmlFor="">Category</label>
              <select style={{border:'.5px solid #00aded',color:'#00aded'}}  name="cat" id="cat" onChange={handleChange}>
                <option style={{border:'.5px solid #00aded', color:'#00aded' }}  value="food">Food</option>
                <option style={{border:'.5px solid #00aded', color:'#00aded' }} value="education">Education</option>
                <option style={{border:'.5px solid #00aded', color:'#00aded' }} value="health">Health</option>
                <option style={{border:'.5px solid #00aded', color:'#00aded' }} value="emergency">Emergency</option>
                <option style={{border:'.5px solid #00aded', color:'#00aded' }} value="misscellaneous">Miscellaneous</option>

              </select>
              <label htmlFor="">Enter Estimated Amount (PKR)</label>
              <input style={{border:'.5px solid #00aded' }}  type="text" onChange={handleChange} name="amount"/>
              <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
              <label htmlFor="">Description</label>
              <textarea  style={{border:'.5px solid #00aded',boxSizing:'border-box',resize:'none' }} name="desc" id="" placeholder="Describe your need in detail" cols="0" rows="5" onChange={handleChange}></textarea>
              <button onClick={handleSubmit}>Create</button>
            </div>

          </div>
        </div>
      </div>
      </>
    );
  };

export default Create