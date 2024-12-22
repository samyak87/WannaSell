import React from "react";
const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className=" p-3 border border-dark">
        <div className="mb-3">
          <input
            type="text"
            className="form-control " 
            placeholder="Enter new category"
            value={value} 
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
