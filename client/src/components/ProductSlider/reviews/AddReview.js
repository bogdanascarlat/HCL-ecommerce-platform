
import styles from "./styles.module.scss";
import Select from "./Select";
import { useState } from "react";
import { Rating } from "@mui/material";
import Images from "./Images";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdForkLeft } from "react-icons/md";





export default function AddReview({product},{productID}) {

  const user = useSelector((state) => state.auth.loggedInUser);
  const state = useSelector((state) => state);

    const[size, setSize] = useState("");
    const[review, setReview] = useState("");
    const[rate, setRate] = useState();
    const[images, setImages] = useState([]);
     
     const userFirstName = user.firstName;
     const userLastName = user.lastName;
    const[userPic, setUserPic] = useState("https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png") ;
    const id = product.id;

    const submitReview = (e) => {
      e.preventDefault();
      const today = new Date();
      const date = today.toDateString();
      
      const reviewConfig = {
        
        userFirstName,
        userLastName,
        productID: id,
        rate,
        userPic,
        review,
        reviewDate: date,
        createdAt: Timestamp.now().toDate(),
      }
      try {
        addDoc(collection(db, "reviews"), reviewConfig);
        alert("Review submitted successfully");
        setRate(0)
        setReview("")
      } catch (error) {
        alert(error.message);
      }
    };
  


    
  return (
    <form onSubmit={(e) => submitReview(e)}>
    <div className={styles.reviews__add}>
        <div className={styles.reviews__add_wrap}>
        
            <div className="flex" style={{gap: "10px"}}>
                Size:
                <Select property={size} text="Size"/>
            </div>
            <Images images = {images} setImages={setImages}/>
            <textarea 
             name="review" 
             value={review}
             onChange={(e)=>setReview(e.target.value)}
             placeholder="Write your review here"
            />
            <Rating
              name="half-rating-read"
              defaultValue={rate}
             // value={rate}
              onChange={(e)=>setRate(e.target.value)}
              precision={0.5}
              style={{color: "#facf19",fontSize: "2rem"}}
            />
            <button type="submit" className="btn btn-primary fw-bold align-self-end"
            style={{background: "#F29339", border: "none", width: "300px"}} 
            >
              Submit Review
            </button>
            
        </div>
    </div>
    </form>
  );
}
