import './App.css';
import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [gallery, setGallery] = useState({ imagetitle: '', image: '' });
  const [data, setData] = useState([]);
  const [processing, setProcessing] = useState(false)

  const getGallery = async () => {
    try {
      const resp = await axios.get('https://image-gallery-03dg.onrender.com/getallimage');
      setData(resp.data);

    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (e) => {
    setProcessing(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagetitle', gallery.imagetitle);
    formData.append('image', gallery.image);

    try {
      await axios.post('https://image-gallery-03dg.onrender.com/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      getGallery();
      console.log(data);
      // alert('Image added');
      setGallery({ imagetitle: '', image: '' })
      setProcessing(false)
    } catch (error) {
      console.log(error);
    }
  }
  const deletehandle = async (imagetitle) => {
    try {
      setProcessing(true)
      const resp = await axios.delete(`https://image-gallery-03dg.onrender.com/deleteimage/${imagetitle}`);
      console.log(resp.data);
      setProcessing(false)
      getGallery();

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getGallery();
  }, []);


  return (
    <Router>
      <div className="container-fluid">


        <Routes>

          <Route path='/' element={<div className="container">
            <form onSubmit={submitHandler}>
              <div className="input-group mx-auto my-3 p-3 rounded-4 shadow bg-primary-subtle">
                <input type="file" accept="image/png, image/gif, image/jpeg" className="form-control"
                  onChange={(e) => { setGallery({ ...gallery, image: e.target.files[0] }) }}
                />
                <input type="text" className="form-control w-25" placeholder="Enter image title"
                  value={gallery.imagetitle} required onChange={(e) => setGallery({ ...gallery, imagetitle: e.target.value })} />
                <button className="btn btn-secondary" type="submit">Upload Image</button>
              </div>
            </form>
            <p className="text-center">
              {processing ? (<>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> Procssing...
              </>) : (" ")}
            </p>
            <div>
              <div className="row g-3">
                {data.map((item, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                    <div className="card ">
                      <img src={`https://image-gallery-03dg.onrender.com/${item.image?.replace('uploads\\', '')}`} style={{ maxHeight: 300, maxWidth: 'auto' }} className="card-img" alt={item.imagetitle} />
                      <div className="card-img-overlay">
                        <div className="d-flex justify-content-between">
                          <p className="card-text fs-5 fw-bold text-dark px-2 bg-warning">{item.imagetitle}</p>
                          <div className="deletebtn">
                            <button className="btn btn-danger rounded-5" onClick={() => deletehandle(item.imagetitle)}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>} />


        </Routes>

      </div>

    </Router>
  );
}

export default App;
