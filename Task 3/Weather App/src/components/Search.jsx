import React from "react";
import { useFormik } from "formik";

import { CiSearch } from "react-icons/ci";

import { object, string } from "yup";
import apiFetch from "../config/axiossetup";
const schema = object({
  search: string().required(),
});
const Search = ({ setloading, setdata }) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      apiFetch(values.search, setloading, setdata);
      formik.resetForm();
    },
  });
  return (
    <div className="d-flex  justify-content-center">
      <form
        className="d-flex gap-1"
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            formik.handleSubmit();
          }
        }}
      >
        <input
          className=" form-control "
          name="search"
          type="text"
          placeholder="Search"
          value={formik.values.search}
          onChange={formik.handleChange("search")}
          onBlur={formik.handleBlur("search")}
        />
        <button type="submit" className="btn btn-light  rounded-2">
          <CiSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
