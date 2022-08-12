import React from "react";
import Clients from "../parts/Clients";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Sitemap from "../parts/HomePage/Sitemap";
import BreadCrumb from "../components/Breadcrumb";
import ProductsDetails from "../parts/Details/ProductsDetails";
import Suggestion from "../parts/Details/Suggestion";

export default function Details() {
  return (
    <>
      <Header theme="black" />
      <BreadCrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/categories/912313", name: "Office Room" },
          { url: "/categories/912313/products/91283", name: "Details" },
        ]}
      />
      <ProductsDetails />
      <Suggestion />
      {/* <Clients /> */}
      <Sitemap />
      <Footer />
    </>
  );
}
