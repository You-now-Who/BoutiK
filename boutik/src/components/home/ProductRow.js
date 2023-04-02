import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
// import {} from '@heroicons/react/24/outline'
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";


// Define an array of product objects
const products = [
    {
      title: "Blue T-Shirt",
      gender: "Men",
      color: "Blue",
      description: "This blue t-shirt is a classic and versatile piece of clothing that is perfect for men who want a comfortable and stylish look. Made from high-quality materials, this t-shirt is designed to provide a comfortable fit and last for a long time. The blue color gives it a fresh and vibrant look that is perfect for the summer months. Whether you're running errands or hanging out with friends, this blue t-shirt is a great addition to your wardrobe. Plus, with an eco-friendliness rating of 3, you can feel good about your purchase.",
      size: "M",
      price: 25.99,
      imageUrl: "https://cdn.shopify.com/s/files/1/1346/2167/products/SS_Blue_Front.jpg?v=1490400205",
      ecoFriendly: 3,
    },
    {
      title: "Black Hoodie",
      gender: "Men",
      color: "Black",
      size: "L",
      price: 39.99,
      imageUrl: "https://th.bing.com/th/id/OIP.6p4MwkbfZFtZ_eB0iicGrwHaJQ?pid=ImgDet&w=1268&h=1585&rs=1",
      description: "This black hoodie is a comfortable and versatile piece of clothing that is perfect for men who want to stay warm and look stylish. Made from soft and warm materials like cotton or fleece, this hoodie is designed to provide a cozy and comfortable fit. The black color gives it a classic and timeless look that matches well with almost any outfit. Featuring a drawstring hood and a kangaroo pocket at the front, this black hoodie provides additional warmth and storage space for your hands or small essentials. With an eco-friendliness rating of 5, you can feel good about your purchase knowing it was made with the environment in mind.",
      ecoFriendly: 5,
    },
    {
      title: "Red Skirt",
      gender: "Women",
      color: "Red",
      size: "S",
      price: 29.99,
      imageUrl: "https://th.bing.com/th/id/R.df732e695183b7f36d1fd582aa3e1860?rik=dl5gcYrrmMrq%2fA&riu=http%3a%2f%2fassets.goodhousekeeping.co.uk%2fmain%2fgalleries%2f14492%2fred_midi_long_skirt-bhs-how_to_wear_red-autumn_winter-fashion_trend-030914__large.jpg",
      description: "This red skirt is a stylish and feminine piece of clothing that is perfect for women who want to make a statement. Made from high-quality materials, this skirt is designed to provide a comfortable and flattering fit. The red color gives it a bold and eye-catching look that is perfect for special occasions or a night out on the town. With an eco-friendliness rating of 0, however, you may want to consider other options if you're looking to make an environmentally conscious purchase.",
      ecoFriendly: 0,
    },
    {
        title: "Men's Blue Plaid Shirt",
        color: "blue",
        size: "M",
        imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61SZn0s9c2L._UY550_.jpg",
        price: 49.99,
        gender: "male",
        description: "This blue plaid shirt is a classic and stylish piece of clothing that is perfect for men who want to look sharp and put-together. Made from high-quality materials, this shirt is designed to provide a comfortable and flattering fit. The blue plaid pattern gives it a timeless and versatile look that is perfect for any occasion, whether you're dressing up or down. With an eco-friendliness rating of 1, this shirt is not the most environmentally friendly option, but it is still a great choice for men who value style and quality.",
        ecoFriendly: 1,
    },
    {
        title: "Women's Black Dress",
        color: "black",
        size: "S",
        imageUrl: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10054821/2019/7/3/db52fd6a-19fc-4add-bc4b-77b8608454d01562138455279-Veni-Vidi-Vici-Women-Black-Bodycon-Dress-3841562138453419-1.jpg",
        price: 99.99,
        gender: "female",
        description: "This black dress is a stylish and versatile piece of clothing that is perfect for women who want to look elegant and put-together. Made from high-quality materials, this dress is designed to provide a comfortable and flattering fit. The black color gives it a classic and timeless look that is perfect for any occasion, from a fancy dinner to a night out with friends. With an eco-friendliness rating of 4, you can feel good about your purchase knowing it was made with the environment in mind.",
        ecoFriendly: 4,
    },
    {
        title: "Men's Grey Hoodie",
        color: "grey",
        size: "L",
        imageUrl: "https://cdn.shopify.com/s/files/1/0752/6435/products/HERO_b516990a-b2e5-406c-a971-c5c480e0f4b2.jpg?v=1666177997",
        price: 59.99,
        gender: "male",
        description: "This grey hoodie is a comfortable and stylish piece of clothing that is perfect for men who want to stay warm and look good. Made from soft and warm materials like cotton or fleece, this hoodie is designed to provide a cozy and comfortable fit. The grey color gives it a versatile and classic look that is perfect for any occasion. With an eco-friendliness rating of 2, you can feel good about your purchase knowing it was made with some consideration for the environment.",
        ecoFriendly: 2,
    },
    {
        title: "Women's White T-Shirt",
        color: "white",
        size: "M",
        imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81uDnWPK5ZL._UX569_.jpg",
        price: 19.99,
        gender: "female",
        ecoFriendly: 3,
    },
    {
        title: "Men's Black Jeans",
        color: "black",
        size: "32x32",
        imageUrl: "https://cdn.shopify.com/s/files/1/0556/9826/0107/products/MDNM00361_BLACK_4_650x.jpg?v=1677126835",
        price: 79.99,
        gender: "male",
        description: "This is a pair of men's black jeans with a size of 32x32. They are designed for males and have a sleek black color. The jeans have an eco-friendliness rating of 5, indicating that they were made with environmentally conscious practices. The price of the jeans is $79.99, and an image of the product is provided through the specified imageUrl.",
        ecoFriendly: 5,
    },
    {
        title: "Women's Red Blouse",
        color: "red",
        size: "L",
        imageUrl: "https://sc04.alicdn.com/kf/HTB1BnLsnbwrBKNjSZPcq6xpapXaS.jpg",
        price: 49.99,
        gender: "female",
        ecoFriendly: 1,
    },
    {
        title: "Men's White Polo Shirt",
        color: "white",
        size: "XL",
        imageUrl: "https://images.tailorstore.com/YToyOntzOjU6IndpZHRoIjtpOjE2MDA7czo2OiJoZWlnaHQiO2I6MDt9/images/catalog/tailor-store-pike-white-short.jpg",
        price: 39.99,
        gender: "male",
        ecoFriendly: 2,
    },
    {
        title: "Women's Blue Skirt",
        color: "blue",
        size: "M",
        imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/31WUuK4Iu1L.jpg",
        price: 69.99,
        gender: "female",
        ecoFriendly: 3,
    },
    {
        title: "Men's Red Sweater",
        color: "red",
        size: "L",
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/IG/CC/HN/38109915/new-product-500x500.jpeg",
        price: 89.99,
        gender: "male",
        ecoFriendly: 4,
    },
    {
        title: "Women's Grey Sweatshirt",
        color: "grey",
        size: "S",
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/11/AH/NV/FR/110004021/cotton-oversized-sweatshirt-in-dark-grey-500x500.jpg",
        price: 29.99,
        gender: "female",
        ecoFriendly: 5,
    },
    {
        title: "Men's Black Leather Jacket",
        color: "black",
        size: "M",
        imageUrl: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10721006/2022/11/22/582e8501-4644-47c3-9def-da632fd5688d1669106702258-HIGHLANDER-Men-Black-Solid-Leather-Jacket-7061669106702041-1.jpg",
        price: 199.99,
        gender: "male",
        ecoFriendly: 0,
    },
    {
        title: "Women's Yellow Dress",
        color: "yellow",
        size: "L",
        imageUrl: "https://5.imimg.com/data5/ZT/PF/SV/SELLER-29696787/women-mustard-yellow-printed-midi-a-line-dress-1000x1000.jpg",
        price: 149.99,
        gender: "female",
        ecoFriendly: 4,
    },
    {
        title: "Men's Green Shorts",
        color: "green",
        size: "32",
        imageUrl: "https://n.nordstrommedia.com/id/sr3/b2214520-5fa5-4b2b-982e-7ea177087dac.jpeg?h=365&w=240&dpr=2",
        price: 34.99,
        gender: "male",
        ecoFriendly: 5,

    },
    {
        title: "Men's Brown Suede Shoes",
        color: "brown",
        size: "10",
        imageUrl: "https://stylemann.com/wp-content/uploads/2016/12/suede-shoes-13-650x650.jpg",
        price: 119.99,
        gender: "male",
        ecoFriendly: 5,
    },
    {
        title: "Women's Black High Heels",
        color: "black",
        size: "7",
        imageUrl: "https://ae01.alicdn.com/kf/HTB1uh1BasrrK1Rjy1zeq6xalFXag/high-heels-women-s-shoes-bow-women-shoes-high-heel-sandals-platform-high-heels-peep-toe.jpg",
        price: 89.99,
        gender: "female",
        ecoFriendly: 5,
    },
    {
        title: "Men's Blue Swim Trunks",
        color: "blue",
        size: "L",
        imageUrl: "https://static.funkita.com/photo/product/media/storage/product/00/75/007577.jpg",
        price: 44.99,
        gender: "male",
        ecoFriendly: 4,
    },
    {
        title: "Women's Green Blouse",
        color: "green",
        size: "M",
        imageUrl: "https://absolutelydesi.com/wp-content/uploads/2022/11/Studio-Shringaar-Women-Green-Woven-Design-Saree-Blouse-1.jpg",
        price: 59.99,
        gender: "female",
        ecoFriendly: 3,
    },
    {
        title: "Men's Black Leather Belt",
        color: "black",
        size: "M",
        imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51Cl+DSakYL._UX679_.jpg",
        price: 24.99,
        gender: "male",
        ecoFriendly: 4,
    },
    {
        title: "Women's Purple Cardigan",
        color: "purple",
        size: "S",
        imageUrl: "https://assets.ajio.com/medias/sys_master/root/20220907/TTWQ/6317c5f7f997dd1f8de98abe/-288Wx360H-464953120-purple-MODEL.jpg",
        price: 79.99,
        gender: "female",
        ecoFriendly: 5,
    },
    {
        title: "Men's White Sneakers",
        color: "white",
        size: "11",
        imageUrl: "https://rukminim1.flixcart.com/image/832/832/l3929ow0/shoe/x/y/8/10-366-wht-t-rock-white-black-original-imageeq7n87vys95.jpeg?q=70",
        price: 69.99,
        gender: "male"
    },
    {
        title: "Women's Red Skirt",
        color: "red",
        size: "M",
        imageUrl: "https://rukminim1.flixcart.com/image/832/832/kf0087k0-0/trouser/1/k/j/free-red-flare-skirt-aaliya-fashion-original-imafvjv85yqz3uef.jpeg?q=70",
        price: 39.99,
        gender: "female"
    },
    {
        title: "Women's Blue Jeans",
        color: "blue",
        size: "S",
        imageUrl: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7744523/2018/11/6/acb0ec0f-036d-4a44-b8fc-2165977d1c881541499459066-Heart-of-Darkness-Skinny-Jeans-1501541499458878-1.jpg",
        price: 69.99,
        gender: "female"
    },
    {
        title: "Men's Black Shoes",
        color: "black",
        size: "9",
        imageUrl: "https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Aviator-Black-052722-Flatlay.jpg?v=1653681878",
        price: 99.99,
        gender: "male"
    },
    {
        title: "Men's Red Polo Shirt",
        color: "red",
        size: "XL",
        imageUrl: "https://cdn.shopify.com/s/files/1/0293/9277/products/08-10-18_Studio_3_14-05-13_Q8122M_Red_0514_AG_1_1200x1200.jpg?v=1614796354",
        price: 34.99,
        gender: "male"
    },
    {
        title: "Women's Black Sandals",
        color: "black",
        size: "8",
        imageUrl: "https://rukminim1.flixcart.com/image/832/832/xif0q/sandal/m/e/j/4-dori-blk-shomee-black-original-imagkfy2hyp6aegk.jpeg?q=70",
        price: 49.99,
        gender: "female"
    },     

    {
        title: "Yellow Dress",
        gender: "Women",
        color: "Yellow",
        size: "M",
        price: 49.99,
        imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61uskALdGaL._UL1400_.jpg",
  
      },
      {
      title: "Men's Blue Plaid Shirt",
      color: "blue",
      size: "M",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61uskALdGaL._UL1400_.jpg",
      price: 49.99,
      gender: "male"
      },
      {
      title: "Women's Striped Blouse",
      color: "green",
      size: "S",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81ouOtX5zIL._AC_UL480_FMwebp_QL65_.jpg",
      price: 34.99,
      gender: "female"
      },
      {
      title: "Men's Brown Leather Jacket",
      color: "brown",
      size: "L",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41mBEyv1INL._AC_UL480_FMwebp_QL65_.jpg",
      price: 129.99,
      gender: "male"
      },
      {
      title: "Women's Black Pencil Skirt",
      color: "black",
      size: "XS",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51mbZ7buM-L._AC_UL480_FMwebp_QL65_.jpg",
      price: 29.99,
      gender: "female"
      },
      {
      title: "Men's Gray Hoodie",
      color: "gray",
      size: "XL",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91nOJdFkR7L._AC_UL480_FMwebp_QL65_.jpg",
      price: 44.99,
      gender: "male"
      },
  
  {
      title: "Women's Red Cocktail Dress",
      color: "red",
      size: "M",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61nVjRXpGLL._AC_UL480_FMwebp_QL65_.jpg",
      price: 89.99,
      gender: "female"
      },
      {
      title: "Men's White T-Shirt",
      color: "white",
      size: "S",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71EHL5ATUBL._AC_UL480_FMwebp_QL65_.jpg",
      price: 14.99,
      gender: "male"
      },
      {
      title: "Women's Blue Jeans",
      color: "blue",
      size: "M",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41mSv3FwDTL._AC_UL480_FMwebp_QL65_.jpg",
      price: 39.99,
      gender: "female"
      },
      {
      title: "Men's Black Dress Shoes",
      color: "black",
      size: "11",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61ZtkYj+nyL._AC_UL480_FMwebp_QL65_.jpg",
      price: 79.99,
      gender: "male"
      },
      {
      title: "Women's Yellow Sundress",
      color: "yellow",
      size: "L",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81fJmfZ12EL._AC_UL480_FMwebp_QL65_.jpg",
      price: 54.99,
      gender: "female"
      },
      {
      title: "Men's Beige Chinos",
      color: "beige",
      size: "34",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/517TRH8bGFL._AC_UL480_FMwebp_QL65_.jpg",
      price: 49.99,
      gender: "male"
      },
      {
      title: "Women's Gray Blazer",
      color: "gray",
      size: "M",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71hB3AElzHL._AC_UL480_FMwebp_QL65_.jpg",
      price: 69.99,
      gender: "female"
      },
      {
      title: "Men's Blue Jeans",
      color: "blue",
      size: "36",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81Jk3frRCML._AC_UL480_FMwebp_QL65_.jpg",
      price: 59.99,
      gender: "male"
      },
      {
      title: "Women's Green Tunic",
      color: "green",
      size: "S",
      imageUrl: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81ABC9AmSbL._AC_UL480_FMwebp_QL65_.jpg",
      price: 24.99,
      gender: "female"
      },
    
    
    
  ];
  

// Loop through the products array and add each one to the 'products' collection
products.forEach(product => {
//   db.collection('products').add(product)
//     .then(docRef => {
//       console.log(`Product added with ID: ${docRef.id}`);
//     })
//     .catch(error => {
//       console.error('Error adding product: ', error);
//     });
    setDoc(doc(db, "products", product.title), product)
});


const ProductRow = ({type}) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        
        if (type == "MOST ECO-FRIENDLY")
        {   
            const q = query(collection(db, "products"), where("ecoFriendly", "==", 5));
            const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        const productsData = [];

        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("LOL")
        console.log(doc.id, " => ", doc.data());
        productsData.push(doc.data());
        });


      setProducts(productsData);    
        }
        else
        {
            const q = query(collection(db, "products"));
            const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        const productsData = [];

        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("LOL")
        console.log(doc.id, " => ", doc.data());
        productsData.push(doc.data());
        });


      setProducts(productsData);
        }
        
        
    };

    fetchData();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
    <h1 className="ml-2 mt-10 font-bold text-3xl text-stone-600">{type}</h1>
    <div className="relative w-full h-96 flex items-center justify-center">
        
      <div className="absolute left-0 flex items-center justify-center h-full w-12">
        {currentIndex !== 0 && (
          <button onClick={handlePrevClick} className="p-2 rounded-full bg-gray-700 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto w-full">
        {products.length > 0 ? (
          products
            .slice(currentIndex, currentIndex + 10)
            .map((product) => (
                <Link key={product.title} to={`/product/${product.title}`}>
              <div
                key={product.title}
                className="flex-none h-72 w-72 m-4 p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center"
              >
                <img
                  className="h-40 w-40 object-contain rounded-sm"
                  src={product.imageUrl}
                  alt={product.title}
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500">$ {product.price}</p>
              </div>
              </Link>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="absolute right-0 flex items-center justify-center h-full w-12">
        {currentIndex + 10 < products.length && (
          <button onClick={handleNextClick} className="p-2 rounded-full bg-gray-700 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductRow;
