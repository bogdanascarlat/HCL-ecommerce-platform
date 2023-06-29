import { Rating } from '@mui/material';
import styles from './styles.module.scss';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';




export default function Review({rview} ,{productId}) {
   // const {name, image} = review.reviewBy;
   const { data } = useFetchCollection("reviews");
   const { id: selectedProductId } = useParams();

   const prodId = selectedProductId;
   const filteredReviews = data.filter((review) => review.productID === prodId);
   
  return (filteredReviews.map((rev) => {
    
    const {rate, review, reviewDate, userFirstName,userLastName, userPic} = rev;

    return (
    <div className={styles.review}>
     <div className={styles.flex}>
     
     <div className={styles.review__use}>
          
       </div>
       <h4>
          {userFirstName} {userLastName}
          </h4>
          
          
       <div className={styles.review}>
       
       <div className={styles.review__images}>
       
            {/* {
                review.images.length > 0 && 
                review.images.map((img)=> <img src={img?.url} alt=''/>)
            } */}
         
           { userPic ? <img style={{borderRadius: 150/ 5}} src={userPic} alt=''/> 
           : 
           <img src='https://centraleastzone.files.wordpress.com/2020/02/default-profile.gif?w=380' />}

            <Rating 
           name='half-rating'
           defaultValue={rate}
           readOnly
           style={{color: "#facf19"}}
          />
          <p>{reviewDate}</p>
        </div>
          
          
          <p>{review}</p>
          {/* <p>
            <span>Overall : </span>
          </p> */}
          <div className={styles.flex}>
            {/* <img 
             scr={review.styles.image}
             alt=''
             className={styles.review__img}
            /> */}
          </div>
       </div>
       
      
     </div>
     <div className={styles.flex}>
       
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {rview.likes && rview?.likes}
            <AiOutlineLike style={{color: "#007cb9", marginRight: 50}}/>
          
            <AiOutlineDislike style={{color: "#E76161"}}/>
          </div>
          <div className={styles.review__extra_date}>
             
          </div>
        </div>
  
    
     </div>
     
    </div>



  
    )})
  ); 
}
