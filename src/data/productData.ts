import img from '../assets/image.jpg' 

export const products = [
    {
      category: "Groceries",
      items: [
        { id: 1, image: img, name: "Coconut", rating: 4, price: "20" },
        { id: 2, image: img, name: "Rice", rating: 4.5, price: "55" },
        { id: 3, image: img, name: "Wheat Flour", rating: 4.2, price: "35" },
        { id: 4, image: img, name: "Olive Oil", rating: 5, price: "125" },
        { id: 5, image: img, name: "Sugar", rating: 4.3, price: "30" },
      ],
    },
    {
      category: "Electronics",
      items: [
        { id: 1, image: img, name: "Smartphone", rating: 4.5, price: "5000" },
        { id: 2, image: img, name: "Laptop", rating: 4.7, price: "120000" },
        { id: 3, image: img, name: "Headphones", rating: 4.3, price: "1000" },
        { id: 4, image: img, name: "Smartwatch", rating: 4.8, price: "2500" },
        { id: 5, image: img, name: "Bluetooth Speaker", rating: 4.6, price: "1500" },
      ],
    },
    {
      category: "Casuals",
      items: [
        { id: 1, image: img, name: "T-Shirt", rating: 4, price: "150" },
        { id: 2, image: img, name: "Jeans", rating: 4.5, price: "400" },
        { id: 3, image: img, name: "Sneakers", rating: 4.7, price: "600" },
        { id: 4, image: img, name: "Hoodie", rating: 4.6, price: "500" },
        { id: 5, image: img, name: "Cap", rating: 4.3, price: "100" },
      ],
    },
  ];