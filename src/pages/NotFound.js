import React from "react";
import BreadCrumb from "../components/Breadcrumb";
import Header from "../parts/Header";
import Sitemap from "../parts/HomePage/Sitemap";
import { Link } from "react-router-dom";
import Footer from "../parts/Footer";
import PageErrorMessage from "../parts/PageErrorMessage";

export default function NotFound() {
  return (
    <>
      <Header theme="black" />
      <PageErrorMessage />
      <Sitemap />
      <Footer />
    </>
  );
}
