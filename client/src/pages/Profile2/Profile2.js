import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE_IMAGE_MUTATION } from '../../graphql/mutation';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { logout, updateUser } from '../../features/user/authSlice';
import useProtected from '../../hooks/useProtected';
import './Profile2.css';
import Cookie from 'js-cookie';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UPDATE_ADDRESS_MUTATION } from '../../graphql/mutation';




const Profile2 = () => {
  useProtected();

  const darkMode = useSelector((state) => state.darkMode);
  const getCardColor = () => (darkMode ? "#232c31" : " ");


  const user = useSelector((state) => state.auth.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divRef = useRef(null);

  const [updateAddress, { data, loading, error }] = useMutation(UPDATE_ADDRESS_MUTATION);





  useEffect(() => {
    // If the mutation has completed and there was no error, update the user state
    if (data && !loading && !error) {
      dispatch(updateUser(data.updateAddress));
    }
  }, [data, loading, error, dispatch]);


  const [isPopupOpen1, setPopupOpen1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');

  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');


  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };


  const handleSave1 = async () => {
    try {
      const action = inputValue1.trim() === "" ? 'remove' : 'add';
      const addressToUpdate = action === 'remove' ? ' ' : inputValue1;
      await updateAddress({
        variables: {
          updateAddressInput: {
            id: user.id,
            action: action,
            address: addressToUpdate,
            index: 0,
          },
        },
      });
      setPopupOpen1(false);
      setInputValue1('');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSave2 = async () => {
    try {
      const action = inputValue2.trim() === "" ? 'remove' : 'add';
      const addressToUpdate = action === 'remove' ? ' ' : inputValue2;
      await updateAddress({
        variables: {
          updateAddressInput: {
            id: user.id,
            action: action,
            address: addressToUpdate,
            index: 1,
          },
        },
      });
      setPopupOpen2(false);
      setInputValue2('');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  






  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${Cookie.get('token')}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      const updatedUser = { ...user, image: data.file.filename };
      dispatch(updateUser(updatedUser));

    } catch (error) {
      console.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 });

  useEffect(() => {
    function handleResize() {
      if (divRef.current) {
        const divWidth = divRef.current.offsetWidth;
        const divHeight = divRef.current.offsetHeight;
        const vmin = Math.min(divWidth, divHeight) * 0.01;
        document.documentElement.style.setProperty('--vmin', `${vmin}px`);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  if (!user) {
    navigate('/login');
    return <></>;
  }

  return (
    <>
      <Navbar />
      <div className="profile_master_div">
        <div ref={divRef} className="profile_div_left">
          
          <motion.div  {...getRootProps()}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 50 }}
            className="profile_circle"
            style={{
              backgroundImage: user.image
  ? `url(${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/uploads/${user.image})`
  : 'none',

            
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
             <input {...getInputProps()} />
            {!user.image && (
              <div className="profile_default_image"></div>
            )}
          </motion.div>

          <motion.div  className="profile_details_div"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 50 }}
          style={{backgroundColor:getCardColor()}}
          >
           
            
          <motion.div
    className="profile_name"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.15, type: 'spring', stiffness: 50 }}
  >
    {user.firstName} {user.lastName}
  </motion.div>

            <div className="profile_address">Email: {user.email}</div>
            <div className="profile_address">Phone: {user.phone}</div>
            <div className="profile_address"><button onClick={handleLogout} className="btn btn-secondary w-50 mx-auto">Logout</button></div>
            
          </motion.div>
        </div>
        <div className="profile_div_right">
        <motion.div className='profile_div_right_top'
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, type: 'spring', stiffness: 50 }}
        style={{backgroundColor:getCardColor()}}>
          <div className='profile_div_right_top_text'>
            Orders
          </div>
          <div className='profile_div_right_top_activities'>
              <motion.div className='activity'
              initial="hidden"
              animate="visible">
                <div className='activity_picture'>
              <svg height="150px" width="150px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve" fill="#000000">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path style={{ fill: "#C69666" }} d="M305.404,94.317h-53.895V76.352h-89.825v17.965H35.481C15.881,94.317,0,110.198,0,129.797v342.232 c0,19.6,15.881,35.481,35.481,35.481h341.782c19.842,0,35.93-16.088,35.93-35.93V202.106h-89.825 c-9.926,0-17.965-8.039-17.965-17.965V94.317z"></path>
      <g>
        <path style={{ fill: "#E8D5B2" }} d="M238.329,191.563l-31.735-25.384l-31.726,25.384c-5.318,4.249-13.186,0.467-13.186-6.333V76.354 h89.825V185.23C251.506,192.03,243.637,195.811,238.329,191.563"></path>
        <polygon style={{ fill: "#E8D5B2" }} points="53.895,471.58 179.649,471.58 179.649,363.79 53.895,363.79 "></polygon>
      </g>
      <g>
        <path style={{ fill: "#CBB292" }} d="M143.719,408.703H89.825c-4.958,0-8.982-4.024-8.982-8.982c0-4.958,4.024-8.982,8.982-8.982h53.895 c4.958,0,8.982,4.024,8.982,8.982C152.702,404.678,148.678,408.703,143.719,408.703"></path>
        <path style={{ fill: "#CBB292" }} d="M125.754,444.632h-35.93c-4.958,0-8.982-4.024-8.982-8.982c0-4.958,4.024-8.982,8.982-8.982h35.93 c4.958,0,8.982,4.024,8.982,8.982C134.737,440.608,130.713,444.632,125.754,444.632"></path>
      </g>
      <path style={{ fill: "#48A0DC" }} d="M493.821,220.071H314.603c-10.042,0-18.18-8.138-18.18-18.18V22.673 c0-10.042,8.138-18.18,18.18-18.18h179.218c10.042,0,18.18,8.138,18.18,18.18v179.218 C512.002,211.933,503.864,220.071,493.821,220.071"></path>
      <g>
        <path style={{ fill: "#FFFFFF" }} d="M467.088,121.264H341.333c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982h125.754 c4.958,0,8.982,4.024,8.982,8.982S472.046,121.264,467.088,121.264"></path>
        <path style={{ fill: "#FFFFFF" }} d="M431.158,157.194c-2.299,0-4.599-0.88-6.351-2.632c-3.512-3.512-3.512-9.189,0-12.701 l29.579-29.579l-29.579-29.579c-3.512-3.512-3.512-9.189,0-12.701c3.512-3.512,9.189-3.512,12.701,0l35.93,35.93 c3.512,3.512,3.512,9.189,0,12.701l-35.93,35.93C435.757,156.314,433.457,157.194,431.158,157.194"></path>
      </g>
    </g>
  </g>
</svg>
</div>
<div className='activity_details'>
  <div style={{fontWeight:"bold"}}>
    0 Orders Placed
  </div>

</div>


              </motion.div>
              <div className='activity'>
                <div className='activity_picture'>
                <svg height="150px" width="150px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 505.06 505.06" xmlSpace="preserve" fill="#000000">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path style={{ fill: "#C69666" }} d="M404.074,204.173l-74.178-72.695c-14.336-12.359-24.964-28.548-29.493-46.769 c-0.362-1.457-0.636-2.807-0.892-4.122h-52.339V62.931h-88.276v17.655H34.869C15.36,80.587,0,96.397,0,115.897v335.448 c0,19.5,15.36,35.31,34.869,35.31h335.89c19.5,0,35.31-15.81,35.31-35.31V204.217C405.469,204.658,404.648,204.667,404.074,204.173 "></path>
      <g>
        <path style={{ fill: "#E8D5B2" }} d="M234.221,176.156l-31.188-24.947l-31.188,24.947c-5.217,4.175-12.95,0.459-12.95-6.223V62.933 h88.276v106.999C247.172,176.615,239.439,180.331,234.221,176.156"></path>
        <polygon style={{ fill: "#E8D5B2" }} points="52.966,451.345 176.553,451.345 176.553,345.414 52.966,345.414 "></polygon>
      </g>
      <g>
        <path style={{ fill: "#CBB292" }} d="M141.242,389.552H88.277c-4.882,0-8.828-3.955-8.828-8.828s3.946-8.828,8.828-8.828h52.966 c4.882,0,8.828,3.955,8.828,8.828S146.124,389.552,141.242,389.552"></path>
        <path style={{ fill: "#CBB292" }} d="M123.587,424.862h-35.31c-4.882,0-8.828-3.955-8.828-8.828s3.946-8.828,8.828-8.828h35.31 c4.882,0,8.828,3.955,8.828,8.828S128.469,424.862,123.587,424.862"></path>
      </g>
      <path style={{ fill: "#ED7161" }} d="M399.13,62.542c8.625-19.447,25.362-44.138,48.287-44.138c30.879,0,54.502,23.985,57.3,53.928 c0,0,1.51,7.433-1.81,20.815c-4.52,18.22-15.157,34.419-29.493,46.769l-74.178,72.695c-0.6,0.521-1.501,0.521-2.101,0 l-74.178-72.695c-14.336-12.359-24.973-28.548-29.493-46.769c-3.319-13.383-1.81-20.815-1.81-20.815 c2.798-29.943,23.649-53.928,54.528-53.928C369.108,18.404,390.497,43.095,399.13,62.542"></path>
    </g>
  </g>
</svg>


</div>
<div className='activity_details'>
  <div style={{fontWeight:"bold"}}>
    0 Orders Received
  </div>
</div>


              </div>
              <div className='activity'>
                <div className='activity_picture'>
                <svg height="150px" width="150px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path style={{ fill: "#C69666" }} d="M353.103,132.414l-26.483-26.483h-79.448V88.276h-88.276v17.655H34.869 C15.36,105.931,0,121.741,0,141.241V476.69C0,496.19,15.36,512,34.869,512h335.89c19.5,0,35.31-15.81,35.31-35.31V158.897 l-70.621,44.138L353.103,132.414z"></path>
      <g>
        <path style={{ fill: "#E8D5B2" }} d="M234.221,201.5l-31.188-24.947L171.845,201.5c-5.217,4.175-12.95,0.459-12.95-6.223V88.278h88.276 v106.999C247.171,201.959,239.438,205.676,234.221,201.5"></path>
        <polygon style={{ fill: "#E8D5B2" }} points="52.966,476.69 176.552,476.69 176.552,370.759 52.966,370.759 "></polygon>
      </g>
      <g>
        <path style={{ fill: "#CBB292" }} d="M141.241,414.897H88.276c-4.882,0-8.828-3.955-8.828-8.828s3.946-8.828,8.828-8.828h52.966 c4.882,0,8.828,3.955,8.828,8.828S146.123,414.897,141.241,414.897"></path>
        <path style={{ fill: "#CBB292" }} d="M123.586,450.207h-35.31c-4.882,0-8.828-3.955-8.828-8.828s3.946-8.828,8.828-8.828h35.31 c4.882,0,8.828,3.955,8.828,8.828S128.468,450.207,123.586,450.207"></path>
      </g>
      <polygon style={{ fill: "#F4D65A" }} points="406.069,0 439.72,70.621 512,79.448 459.034,132.414 467.862,203.034 406.069,158.897 335.448,203.034 353.103,132.414 300.138,79.448 372.418,70.621 "></polygon>
    </g>
  </g>
</svg>

</div>
<div className='activity_details'>
  <div style={{fontWeight:"bold"}}>
    0 Orders Reviewed
  </div>

</div>


              </div>
          </div>
        </motion.div>
        <div className='wrapper_2'>
        <motion.div className='profile_div_right_top_2'
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
        style={{backgroundColor:getCardColor()}}>
          <div className='profile_div_right_top_text'>
            My addresses 
            <svg style={{marginLeft:"10px"}} height="45px" width="45px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <circle style={{ fill: '#006775' }} cx="256" cy="255.977" r="255.977"></circle>
        <path style={{ fill: '#055661' }} d="M506.211,310.479C481.241,425.705,378.75,512,256.052,512c-17.299,0-34.197-1.705-50.543-5.014 L91.086,392.562l74.812-29.884l102.54-26.825l58.766-204.38L506.211,310.479z"></path>
        <path style={{ fill: '#FEFEFE' }} d="M146.693,305.215c-3.911,1.655-8.724,7.822-12.034,13.137l-42.269,67.44 c-3.309,5.265-1.755,8.774,2.106,7.12l71.352-30.236c1.304,1.805,55.758,46.532,57.613,45.83l94.969-34.548 c2.005,0.501,87.749,30.085,92.963,31.639c6.569,2.005,10.229-0.803,10.128-7.822l-1.003-69.447 c-0.1-7.02,1.003-13.388-5.415-15.695c-9.627-3.46-64.834-26.725-67.19-25.873c-14.441,5.164-79.626,28.631-79.626,28.631 c-10.179-7.572-54.003-36.855-55.858-38.208c-0.702-0.501-3.009-0.301-6.318,0.802c-7.472,2.508-51.797,23.968-59.369,27.227h-0.05 V305.215z"></path>
        <g>
          <path style={{ fill: '#D9DADA' }} d="M318.479,374.009c3.259,0.953,87.749,30.085,92.863,31.639l0.301,0.1l0.301,0.1l0.301,0.05 l0.301,0.05l0.301,0.05l0.301,0.05l0,0l0.301,0.05l0,0l0.251,0.05l0.251,0.05l0.251,0.05h0.251l0,0h0.251h0.251l0,0h0.251h0.251 h0.251h0.251l0.251-0.05l0.251-0.05l0,0l0.2-0.05l0.2-0.05l0,0l0.2-0.05l0,0l0.2-0.05l0.2-0.05l0,0l0.2-0.05l0,0l0.2-0.1l0.2-0.1 l0.2-0.1l0,0l0.2-0.1l0.15-0.1l0,0l0.15-0.1l0.15-0.1l0.15-0.15l0.15-0.15l0.15-0.15l0.15-0.15l0.15-0.15l0,0l0.15-0.15l0.15-0.15 l0.15-0.15l0,0l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.2l0.1-0.251l0.05-0.251l0.05-0.251l0.05-0.251 l0.05-0.251l0.05-0.251l0,0l0.05-0.251l0,0l0.05-0.251l0.05-0.301l0.05-0.301l0.05-0.301l0,0v-0.301v-0.301v-0.301v-0.301v-0.301 l-1.003-69.447c-0.1-7.02,1.003-13.388-5.415-15.695c-9.627-3.46-64.834-26.725-67.19-25.873l-29.383,87.247L318.479,374.009z"></path>
          <path style={{ fill: '#D9DADA' }} d="M165.848,362.677c1.304,1.755,53.451,44.676,57.412,45.83h0.2l44.827-93.113 c-10.179-7.572-54.003-36.855-55.858-38.208l-46.532,85.442L165.848,362.677z"></path>
        </g>
        <path style={{ fill: '#00CC96' }} d="M268.388,335.851h3.059c0.953-4.061,5.164-11.382,7.12-15.193l23.015-47.033 c10.529-21.01,20.358-41.769,30.787-62.577c11.984-24.018,14.14-47.534-0.05-72.004c-11.182-19.355-34.548-35.551-57.814-35.551 c-17.349,0-29.333,1.655-43.674,11.132c-9.677,6.418-16.647,13.438-22.915,23.768c-14.692,24.369-12.686,48.087-0.401,72.656 C209.32,214.608,267.284,331.038,268.388,335.851z"></path>
        <path style={{ fill: '#07B587' }} d="M269.19,335.851h2.256c0.953-4.061,5.164-11.382,7.12-15.193l23.015-47.033 c10.529-21.01,20.358-41.769,30.787-62.577c11.984-24.018,14.14-47.534-0.05-72.004c-11.182-19.355-34.548-35.551-57.814-35.551 c-1.805,0-3.61,0-5.315,0.05C269.19,192.696,269.19,182.617,269.19,335.851z"></path>
        <circle style={{ fill: '#E1E5E6' }} cx="269.889" cy="171.235" r="43.227"></circle>
        <path style={{ fill: '#CCCCCC' }} d="M269.19,128.063v86.395h0.702c23.868,0,43.223-19.355,43.223-43.223s-19.355-43.223-43.223-43.223 h-0.702V128.063z"></path>
        <path style={{ fill: '#E84F4F' }} d="M269.892,155.491c8.674,0,15.745,7.02,15.745,15.745c0,8.674-7.02,15.745-15.745,15.745 c-8.674,0-15.745-7.02-15.745-15.745C254.147,162.56,261.167,155.491,269.892,155.491z"></path>
        <path style={{ fill: '#C94545' }} d="M269.19,155.541v31.439h0.702c8.674,0,15.745-7.02,15.745-15.745c0-8.674-7.02-15.745-15.745-15.745 h-0.702V155.541z"></path>
      </g>
    </svg>
          </div>
          <div className='profile_div_right_top_activities_address' >
          <div style={{display:"flex"}}>
    <div style={{fontWeight:"bolder", fontSize:"25px", display:"flex", alignItems:"end"}}>Home:</div>
    <div style={{fontWeight:"450", marginLeft:"5px", display:"flex", alignItems:"end", fontSize:"25px",}}>{user.address[0]}</div>
    </div>
    <div className="popup-container">
      <button className="btn btn-secondary" onClick={() => setPopupOpen1(true)}>Change</button>

      <AnimatePresence>
        {isPopupOpen1 && (
          <motion.div
            initial={{ opacity: 0, z: 50 }}
            animate={{ opacity: 1, z: 0 }}
            exit={{ opacity: 0, z: 50 }}
            transition={{ duration: 0.3 }}
            className="popup"
          >
            <input className='input_style'
            style={{marginLeft:"5px"}}
              type="text"
              value={inputValue1}
              onChange={handleInputChange1}
            />

            <button className="btn btn-secondary  button_change " onClick={handleSave1}>Save</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <div style={{display:"flex"}}>
    <div style={{fontWeight:"bolder", fontSize:"25px", display:"flex", alignItems:"end"}}>Other:</div>
    <div style={{fontWeight:"450", marginLeft:"5px", display:"flex", alignItems:"end", fontSize:"25px"}}>{user.address[1]}</div>
    </div>
    <div className="popup-container">
      <button className="btn btn-secondary " onClick={() => setPopupOpen2(true)}>Change</button>

      <AnimatePresence>
        {isPopupOpen2 && (
          <motion.div
            initial={{ opacity: 0, z: 50 }}
            animate={{ opacity: 1, z: 0 }}
            exit={{ opacity: 0, z: 50 }}
            transition={{ duration: 0.3 }}
            className="popup"
          >
            <input className='input_style'
            style={{marginLeft:"5px"}}
              type="text"
              value={inputValue2}
              onChange={handleInputChange2}
            />

            <button className="btn btn-secondary button_change" onClick={handleSave2}>Save</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
          </div>
        </motion.div>
        <motion.div className='profile_div_right_top_2'
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
        style={{backgroundColor:getCardColor()}}>
          <div className='profile_div_right_top_text'>
            My cards
            <svg style={{marginLeft:"10px"}}  height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path style={{ fill: '#6ABDA0' }} d="M476.69,441.379H35.31c-19.5,0-35.31-15.81-35.31-35.31V105.931c0-19.5,15.81-35.31,35.31-35.31 H476.69c19.5,0,35.31,15.81,35.31,35.31v300.138C512,425.569,496.19,441.379,476.69,441.379"></path>
          <polygon style={{ fill: '#488578' }} points="0,194.207 512,194.207 512,123.586 0,123.586 "></polygon>
          <polygon style={{ fill: '#F0C419' }} points="300.138,388.414 459.034,388.414 459.034,300.138 300.138,300.138 "></polygon>
          <g>
            <path style={{ fill: '#488578' }} d="M123.483,264.828H44.141c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h79.342 c4.882,0,8.828,3.946,8.828,8.828S128.365,264.828,123.483,264.828"></path>
            <path style={{ fill: '#488578' }} d="M238.345,264.828h-79.342c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h79.342 c4.882,0,8.828,3.946,8.828,8.828S243.226,264.828,238.345,264.828"></path>
            <path style={{ fill: '#488578' }} d="M176.552,300.138H44.138c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h132.414 c4.882,0,8.828,3.946,8.828,8.828S181.433,300.138,176.552,300.138"></path>
            <path style={{ fill: '#488578' }} d="M238.345,300.138h-26.483c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h26.483 c4.882,0,8.828,3.946,8.828,8.828S243.226,300.138,238.345,300.138"></path>
          </g>
        </g>
      </g>
    </svg>
          </div>
          <div className='profile_div_right_top_activities_reviews'>
              <div style={{fontWeight:"bold"}}> 0 Added Cards</div>
              <div style={{fontWeight:"bold"}}> 0 Added Card Vouchers</div>
              <div style={{fontWeight:"bold"}}> 0 Added Gift Cards</div>
              <button className="btn btn-secondary button_change" >Add a card</button>
             
          </div>
        </motion.div>
        <motion.div className='profile_div_right_top_2'
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
        style={{backgroundColor:getCardColor()}}>
          <div className='profile_div_right_top_text'>
            My reviews
            <svg style={{marginLeft:"10px"}}  height="50px" width="50px" viewBox="0 -0.5 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M16.0005 0L21.4392 9.27275L32.0005 11.5439L24.8005 19.5459L25.889 30.2222L16.0005 25.895L6.11194 30.2222L7.20049 19.5459L0.000488281 11.5439L10.5618 9.27275L16.0005 0Z" fill="#FFCB45"></path>
      </g>
    </svg>
          </div>
          <div className='profile_div_right_top_activities_reviews'>
              <div style={{fontWeight:"bold"}}> 0 Product Reviews</div>
              <div style={{fontWeight:"bold"}}> 0 Order Reviews</div>
              <div style={{fontWeight:"bold"}}> 0 Product Comments</div>
              <div style={{fontWeight:"bold"}}> 0 Helpful Reviews</div>
          </div>
        </motion.div>
        </div>
        <motion.div className='profile_div_right_top'
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, type: 'spring', stiffness: 50 }}
        style={{backgroundColor:getCardColor()}}>
          <div className='profile_div_right_top_text'>
            My activity
          </div>
          <div className='profile_div_right_top_activities'>

          </div>
        </motion.div>
        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile2;
