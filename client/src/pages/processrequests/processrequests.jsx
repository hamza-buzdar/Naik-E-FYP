import React  from "react"
import "./processrequests.css"
import { Link, useNavigate } from 'react-router-dom';
import newRequest from "../../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";


const Processrequests = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["processrequests"],
    queryFn: () =>
      newRequest.get(`/processrequests`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (processrequest) => {
    const needyId = processrequest.needyId;
    const donorId = processrequest.donorId;
    const id = needyId + donorId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/chat/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.needy ? donorId : needyId,
        });
        navigate(`/chat/${res.data.id}`);
      }
    }
  };



      return (
        <div className="processrequests">
          {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
    <div className="container">
        <div className="title">
          <h1>Processed Requests</h1>
        </div>
        <table >
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Contact</th>
          </tr>
          {data.map((processrequest) => (
              <tr key={processrequest._id}>
                <td>
                  <img className="image" src={processrequest.img || "/img/solve.jpg"} alt="" />
                </td>
                <td>{processrequest.title}</td>
                <td>{processrequest.amount}</td>
                <td>
                  <img
                    className="message"
                    src="/img/message.png"
                    alt=""
                    onClick={() => handleContact(processrequest)}
                  />
                </td>
              </tr>
            ))}
        </table>
      </div>)}
    </div>
  );
};
export default Processrequests