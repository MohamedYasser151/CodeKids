import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import './css/adminTable.css'

export default function AdminVideosList() {

  const [videos,setVideos] =
    useState([]);

  const [editingVideo,setEditingVideo] =
    useState(null);

  const loadVideos = async()=>{

    const res =
      await axios.get(
        "http://localhost:8083/admin/videos"
      );

    setVideos(res.data);

  };

  useEffect(()=>{
    loadVideos();
  },[]);

const deleteVideo = async (id) => {

  try {

    await axios.delete(
      `http://localhost:8083/admin/videos/${id}`
    );

    loadVideos();

  } catch (err) {

    console.log(err.response?.data);

  }

};

  const saveVideo =
  async()=>{

    await axios.put(
      `http://localhost:8083/admin/videos/${editingVideo.id}`,
      editingVideo
    );

    setEditingVideo(null);

    loadVideos();

  };

  return(

    <div className="admin-page">

      <h1>🎥 Videos</h1>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Course</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {
            videos.map(video=>(

              <tr key={video.id}>

                <td>{video.id}</td>

                <td>{video.title}</td>

                <td>{video.course}</td>

                <td>{video.description}</td>

                <td>

                  <button
                  onClick={()=>
                    setEditingVideo(video)
                  }>
                    ✏ Edit
                  </button>

                  <button
                  onClick={()=>
                    deleteVideo(video.id)
                  }>
                    🗑 Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

      {
        editingVideo && (

          <div>

            <h2>Edit Video</h2>

            <input
              value={editingVideo.title}
              onChange={(e)=>
                setEditingVideo({
                  ...editingVideo,
                  title:e.target.value
                })
              }
            />

            <textarea
              value={editingVideo.description}
              onChange={(e)=>
                setEditingVideo({
                  ...editingVideo,
                  description:e.target.value
                })
              }
            />

            <select
              value={editingVideo.course}
              onChange={(e)=>
                setEditingVideo({
                  ...editingVideo,
                  course:e.target.value
                })
              }
            >
              <option>Scratch</option>
              <option>Python</option>
              <option>JavaScript</option>
            </select>

            <button
              onClick={saveVideo}
            >
              Save
            </button>

          </div>

        )
      }

    </div>

  );

}