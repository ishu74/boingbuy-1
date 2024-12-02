import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Cards from "../Components/Cards";
import { products } from "../../assets/product";
import "../../App.css";
import { ShimmerPostList } from "react-shimmer-effects";
import CardShimmerLoader from "../_common/shimmer-card";
import BoingBuyLoader from "../_common/BoingBuyLoader";

const ProductListing = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false); 
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setSubcategoryFilter("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredCategories = products.categories.filter((category) => {
    if (!categoryFilter) return true;
    return category.name === categoryFilter;
  });

  const filteredSubcategories = filteredCategories.map((category) => {
    const subcategories = category.subcategories.filter((subcategory) => {
      if (!subcategoryFilter) return true;
      return subcategory.name === subcategoryFilter;
    });

    return { ...category, subcategories };
  });

  const finalFilteredData = filteredSubcategories.map((category) => {
    const subcategories = category.subcategories.map((subcategory) => {
      const products = subcategory.products.filter((product) => {
        const matchesSearch = product.name 
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        // return matchesSearch;
        const matchesPrice = 
        (minPrice === "" || product.price >= parseFloat(minPrice)) && // search buy price
        (maxPrice === "" || product.price <= parseFloat(maxPrice));
      return matchesSearch && matchesPrice;
      });

      products.sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });

      return { ...subcategory, products };
    });

    return { ...category, subcategories };
  });


  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  useState(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); 
  }, []);

  return (
    <Container fluid className="listing-page">
      <Row>
        <Col xs={12} md={4} lg={3} className="sidebar ">
          <h4>Filters</h4>

          {/* Category Filter */}
          <Form.Group controlId="categoryFilter">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {products.categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Subcategory Filter */}
          {categoryFilter && (
            <Form.Group controlId="subcategoryFilter">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                value={subcategoryFilter}
                onChange={(e) => setSubcategoryFilter(e.target.value)}
              >
                <option value="">All Subcategories</option>
                {products.categories
                  .find((category) => category.name === categoryFilter)
                  .subcategories.map((subcategory) => (
                    <option key={subcategory.name} value={subcategory.name}>
                      {subcategory.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          )}

          {/* Search Filter */}
          <Form.Group controlId="searchQuery">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>

            {/* Price Filter */}
            <Form.Group controlId="priceFilter">
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </Form.Group>
          <Form.Group controlId="priceFilter">
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </Form.Group>

          {/* Sorting Filter */}
          <Form.Group controlId="sortOrder">
            <Form.Label>Sort by Price</Form.Label>
            <Form.Control
              as="select"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="">No Sorting</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12} md={8} lg={9} className="products justify-content-around">
          {/* Display Shimmer Effect or Products */}
          {!loading ? (
              finalFilteredData.map((category) => (
                <div key={category.name} className="category-section">
                  <h2 className="category-title">{category?"":category.name}</h2>
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="subcategory-section">
                      <h3 className="subcategory-title">{subcategory?"":subcategory.name}</h3>
                      <Row>
                        {subcategory.products.map((product, index) => (
                          <Col key={index} xs={6} sm={6} md={6} lg={6}>
                            <Cards product={product} />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <>
            {/* <ShimmerPostList postStyle="STYLE_FOUR" col={2} row={2} gap={40} style={{display :"flex"}} /> */}
            {/* <CardShimmerLoader columnCount={2} rowCount={2} /> */}
            <BoingBuyLoader/>
            {/* <img src=""/> */}
 
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListing;
