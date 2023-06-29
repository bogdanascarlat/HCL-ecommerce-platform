import { useRef, useState } from "react";
import styles from "../reviews/styles.module.scss";
import { Rating } from "@mui/material";
import { useSession } from "next-auth/react"
import AddReview from "./AddReview";
import Table from "./Table";
import Review from "./Review";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useParams } from "react-router-dom";



const data = require("./data.json");

const reviews = data?.map((review)=>{
  return(
  <div className="box">
    {review.review}
  </div>
  )
})



export default function Reviews({product}) {

   const { data } = useFetchCollection("reviews");
   const { id: selectedProductId } = useParams();

  const prodId = selectedProductId;
  

  const[isShown, setIsShown] = useState(false);
   
  // const rating = {data.filter((review) => review.productID === prodId).length};
  const showRev = event => {
   setIsShown(current => !current);
  };

 const [ratings, setRatings] = useState([
  {
  "percentage": "76"
   },
  {"percentage": "14"
  },
  {"percentage": "6"
  },
  {"percentage": "4"
  },
  {"percentage": "0"
  },
]);
const ref = useRef(null);

  return(
  
  <div className={styles.reviews}>
    <div className={styles.reviews__container}>
           {/* Reviews . length  */}
       <h1>Customer Reviews ({data.filter((review) => review.productID === prodId).length})</h1> 



       <div className={styles.reviews__stats}>
           <div ref={ref} className={styles.reviews__stats_overview}>
              <h4><b>Average Rating</b></h4>
              <div className={styles.reviews__stats_overview_rating}>
                  <Rating 
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    style={{ color:"#FACF19" }}

                  />
                  {product.rating === 0 ? "No reviews yet." : product.rating}
              </div>
           </div>
           <div className={styles.reviews__stats_reviews}>
               { ratings?.map((rating, i) => (
                    <div className={styles.reviews__stats_reviews_review}> 
                 <Rating 
                    name="half-rating-read"
                    defaultValue={ 5 - i }
                    
                    readOnly
                    style={{ color:"#FACF19" }}
                  />
                   
                  <div className={styles.bar}>
                      <div className={styles.bar__inner} 
                      style={{ width: `${rating.percentage}%` }}
                      
                      ></div>
                  </div>
                  <span>{rating.percentage}%</span> 
                  </div>
                ))}
           </div>
       </div>
      
       
           <button className="btn btn-primary fw-bold align-self-end"
            onClick={showRev}
            style={isShown? {background: "#F29339", border: "none", marginTop: 25}
             :
             {marginTop: 25}} 
            
             >Leave a review
             </button> 

         {isShown && <AddReview product={product} productId = {product.id}/>}
         
       <Table reviews={reviews}/>
      <Review  rview={data} productId={product.id}></Review>
    </div>
  </div>
 
  );
}

