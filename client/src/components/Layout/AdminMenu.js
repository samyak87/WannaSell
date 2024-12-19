import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <div className="list-group ">
          <NavLink to="/dashboard/admin/create-category" className="list-group-item p-3 list-group-item-action">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item p-3 list-group-item-action">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item p-3 list-group-item-action">
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
