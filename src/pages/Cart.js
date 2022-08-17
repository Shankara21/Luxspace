import React from "react";
import BreadCrumb from "../components/Breadcrumb";
import ShippingDetails from "../parts/Cart/ShippingDetails";
import ShoppingCart from "../parts/Cart/ShoppingCart";
import Documents from "../parts/Document";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import Sitemap from "../parts/HomePage/Sitemap";

export default function Cart() {
  return (
    <Documents>
      <Header theme="black" />
      <BreadCrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/cart", name: "Shopping Cart" },
        ]}
      />
      <section className="md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex -mx-4 flex-wrap">
            <ShoppingCart />
            <ShippingDetails />
          </div>
        </div>
      </section>
      <Sitemap />
      <Footer />
    </Documents>
  );
}
