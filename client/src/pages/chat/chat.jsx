import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import React  from "react"
import { Link, useParams } from "react-router-dom";
import "./chat.css"

const Chat = () => {

  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      newRequest.get(`/chats/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (chat) => {
      return newRequest.post(`/chats`, chat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });

  const handleSubmit = (e) => {
    
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };


    return (
        <div className="chat">
          <div className="container">
            <span className="breadcrumbs">
              <Link to="/chats">Messages</Link>  {currentUser.name}
            </span>
            {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
            <div className="chats">
              {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
            </div>
            )}
            <hr />
          <form className="write" onSubmit={handleSubmit}>
          <textarea style={{ resize:'none',border:'none'}} type="text" placeholder="write a message" cols={50} rows={15}/>
          <button style={{width:'100px', height:'30px', border:'none',marginLeft:'30px'}}  type="submit">Send</button>
        </form>
          </div>
        </div>
      );
    };

export default Chat