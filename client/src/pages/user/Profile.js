import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row text-center">
          <div className="col-md-3 p-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="m-3">
              <h3>My Profile</h3>
              <ul>
                <div> {auth?.user?.name}</div>
                <div>{auth?.user?.phone}</div>
                <div> {auth?.user?.address}</div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
