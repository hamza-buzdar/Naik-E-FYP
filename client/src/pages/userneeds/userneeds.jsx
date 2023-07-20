import React from "react";
import "./userneeds.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";

const Userneeds = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myNeeds"],
    queryFn: () =>
      newRequest.get(`/needs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/needs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myNeeds"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="userneeds">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Needs</h1>
            {currentUser.isNeedy && (
              <Link to="/create">
                <button>Create a new need</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Remove</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((need) => (
                <tr key={need._id}>
                  <td>
                    <img className="image" src={need.cover || "/img/need.png"} alt="" />
                  </td>
                  <td>{need.title}</td>
                  <td>{need.amount}</td>
                  <td>
                    <img
                      className="delete"
                      src="/img/delete.jpg"
                      alt=""
                      onClick={() => handleDelete(need._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Userneeds;
