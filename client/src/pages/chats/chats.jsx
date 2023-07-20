import React  from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./chats.css";
import newRequest from "../../../utils/newRequest";
import moment from "moment";


const Chats = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

     
    
      return (
        <div className="chats">
          {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
          <div className="container">
            <div className="title">
              <h1>Messages</h1>
            </div>
            <table>
              <tr>
                <th>{currentUser.isneedy ? "Donor Id" : "Needy Id"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              {data.map (c=>(
              <tr
              className={
                ((currentUser.isNeedy && !c.readByNeedy) ||
                  (!currentUser.isNeedy && !c.readByDonor)) &&
                "active"
              }
              key={c.id}
            >
                <td>{currentUser.isNeedy ? c.donorId : c.needyId}</td>
                <td>
                  <Link to={`/chat/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...Click Here For Chat
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isNeedy && !c.readByNeedy) ||
                    (currentUser.isNeedy && c.readByDonor)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>))}
              
            </table>
          </div>)}
        </div>
      );
    };
export default Chats


