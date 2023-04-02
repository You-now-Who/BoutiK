import React from "react";

const Blog = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">How Eco-Friendly Ratings are Calculated</h1>
        <img src="https://picsum.photos/800/400" alt="Blog Header" className="mb-4" />
        <p className="mb-4">
          Eco-friendly ratings are becoming increasingly important for consumers who want to make more sustainable
          choices. But how exactly are these ratings calculated?
        </p>
        <p className="mb-4">
          At the core of eco-friendly ratings is a life cycle assessment (LCA) of the product. This assessment takes into
          account the environmental impact of a product from the extraction of raw materials to the disposal of the
          product at the end of its useful life. Some of the factors that are considered in the LCA include:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Energy consumption during manufacturing and transportation</li>
          <li>Water consumption during manufacturing</li>
          <li>Use of environmentally harmful chemicals</li>
          <li>Carbon emissions during manufacturing and transportation</li>
          <li>Recyclability and/or biodegradability at end of life</li>
        </ul>
        <p className="mb-4">
          Based on the results of the LCA, a product is given an eco-friendly rating on a scale of 1 to 10. A rating of 1
          indicates that the product has a high environmental impact, while a rating of 10 indicates that the product has
          a low environmental impact.
        </p>
        <p className="mb-4">
          Eco-friendly ratings can be a useful tool for consumers who want to make more sustainable choices. However, it's
          important to keep in mind that the rating is only one aspect of a product's sustainability. Other factors such
          as ethical labor practices, fair trade, and animal welfare should also be considered.
        </p>
      </div>
    </div>
  );
};

export default Blog;
