import React  from "react"
import "./need.css"
import { Slider } from "infinite-react-carousel/lib"
import { Link, useParams } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";


const Need = () => {

  const redirectToChats = () => {
    // Perform the redirect to the chats page
    window.location.href = "/chats";
  };

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["need"],
    queryFn: () =>
      newRequest.get(`/needs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.post("/conversations", { to: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleChatClick = () => {
    mutation.mutate();
    redirectToChats();
  };


    return(
        <div className='need'>
           {isLoading ? "Loading " : error ? "Something wrong" : ( <div className="container">
            <div className="left">
                <span className="breadCrumbs"></span>
                <h1>{data.title}</h1>
                <h3>Category : {data.category}</h3>

                {isLoadingUser ? "Loading" : errorUser ? "Something wrong" : (<div className="user">
                    <img className="pp" src={dataUser.img || "/img/no.jpg"} alt="" />
                    <span>{dataUser.name}</span>
                    <div className="stars">
                        <img src="/img/star.png" alt="" />
                        <img src="/img/star.png" alt="" />
                        <img src="/img/star.png" alt="" />
                        <img src="/img/star.png" alt="" />
                        <img src="/img/star.png" alt="" />
                        <span>5</span>
                        </div>
                </div>)}
                <Slider slidesToShow={3}>
                    <img
              src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
                </Slider>
                
                <h2>Details</h2>
          <p>
            {data.desc}
          </p>
          {isLoadingUser ? "Loading" : errorUser ? "Something wrong" :
          <div className="needyuser">
            <h2>User Details</h2>
            <div className="user">
              <img
                src= {dataUser.img || "/img/no.jpg"}
                alt=""
              />
              <div className="info">
                <span>{dataUser.name}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button className="button" style={{width:'100px', height:'40px'}} onClick={handleChatClick}>Start a Chat</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>

                


              </div>
              <hr />
              <p>
{dataUser.desc}              </p>
            </div>
          </div>}
          <div className="reviews">
            <h2>Feedback</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Dawood Ghani</span>
                  <div className="place">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>Faisalabad</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>Happily solved some financial problems for some people.</p>
     
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Taimoor</span>
                  <div className="place">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    />
                    <span>Karachi</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                The app is fantastic for the uplifting of the society.
              </p>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Ilyas </span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>Lahore</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                It was really pleasure to help out people in need.
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="amount">
            <h3>Are You interested to solve this user's need. click here to continue to Resolve..</h3>
            <h2>{data.amount}</h2>
          </div>
          <p>
            
          </p>
          {/* <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>3 Revisions</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div>
          </div> */}
          <Link to={`/pay/${id}`}>
            <button style={{border:'none',height: '40px',width: '130px'}}>Continue</button>
            </Link>
        </div>
      </div>
           )}
    </div>
  );
}
export default Need