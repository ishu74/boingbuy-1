import { image } from "./image";
export const products = {
    "categories": [
        {
            "name": "Electronics",
            "subcategories": [
                {
                    "name": "Smartphones",
                    "products": [
                        { "id": 1, "name": "iPhone 14", "price": 999, "brand": "Apple", "image": image.iphone14 },
                        { "id": 2, "name": "Galaxy S23", "price": 849, "brand": "Samsung", "image": image.galaxy_s23 },
                        { "id": 3, "name": "Pixel 8", "price": 799, "brand": "Google", "image": image.pixel_8 },
                        { "id": 4, "name": "OnePlus 11", "price": 699, "brand": "OnePlus", "image": image.OnePlus_11 }
                    ]
                },
                {
                    "name": "Laptops",
                    "products": [
                        { "id": 5, "name": "MacBook Pro", "price": 1299, "brand": "Apple", "image": image.MacBook_Pro },
                        { "id": 6, "name": "Dell XPS 13", "price": 1099, "brand": "Dell", "image": image.Dell_XPS_13 },
                        { "id": 7, "name": "HP Spectre x360", "price": 1199, "brand": "HP", "image": image.HP_Spectre_x360 },
                        { "id": 8, "name": "Lenovo ThinkPad X1", "price": 999, "brand": "Lenovo", "image": image.Lenovo_ThinkPad_X1 }
                    ]
                }
            ]
        },
        {
            "name": "Fashion",
            "subcategories": [
                {
                    "name": "Men's Clothing",
                    "products": [
                        { "id": 9, "name": "Slim Fit Shirt", "price": 25, "brand": "H&M", "image": image.Slim_Fit_Shirt },
                        { "id": 10, "name": "Chino Pants", "price": 35, "brand": "Zara", "image": image.Chino_Pants },
                        { "id": 11, "name": "Denim Jacket", "price": 50, "brand": "Levi's", "image": image.Denim_Jacket },
                        { "id": 12, "name": "Sneakers", "price": 60, "brand": "Nike", "image": image.Sneakers }
                    ]
                },
                {
                    "name": "Women's Clothing",
                    "products": [
                        { "id": 13, "name": "Evening Gown", "price": 120, "brand": "Chanel", "image": image.Evening_Gown },
                        { "id": 14, "name": "Summer Dress", "price": 45, "brand": "H&M", "image": image.Summer_Dress },
                        { "id": 15, "name": "High Heels", "price": 80, "brand": "Jimmy Choo", "image": image.High_Heels },
                        { "id": 16, "name": "Leather Bag", "price": 150, "brand": "Gucci", "image": image.Leather_Bag }
                    ]
                }
            ]
        },
        {
            "name": "Home Appliances",
            "subcategories": [
                {
                    "name": "Kitchen",
                    "products": [
                        { "id": 17, "name": "Blender", "price": 40, "brand": "Ninja", "image": image.Blender },
                        { "id": 18, "name": "Toaster", "price": 30, "brand": "Philips", "image": image.Toaster },
                        { "id": 19, "name": "Microwave Oven", "price": 120, "brand": "Samsung", "image": image.Microwave_Oven },
                        { "id": 20, "name": "Dishwasher", "price": 500, "brand": "Bosch", "image": image.Dishwasher }
                    ]
                },
                {
                    "name": "Laundry",
                    "products": [
                        { "id": 21, "name": "Washing Machine", "price": 800, "brand": "LG", "image": image.Washing_Machine },
                        { "id": 22, "name": "Dryer", "price": 600, "brand": "Whirlpool", "image": image.Dryer },
                        { "id": 23, "name": "Iron", "price": 25, "brand": "Panasonic", "image": image.Iron },
                        { "id": 24, "name": "Garment Steamer", "price": 50, "brand": "Rowenta", "image": image.Garment_Steamer }
                    ]
                }
            ]
        },
        {
            "name": "Books",
            "subcategories": [
                {
                    "name": "Fiction",
                    "products": [
                        { "id": 25, "name": "The Great Gatsby", "price": 10, "author": "F. Scott Fitzgerald", "image": image.The_Great_Gatsby },
                        { "id": 26, "name": "1984", "price": 15, "author": "George Orwell", "image": image.Book1984 },
                        { "id": 27, "name": "To Kill a Mockingbird", "price": 12, "author": "Harper Lee", "image": image.To_Kill_a_Mockingbird },
                        { "id": 28, "name": "The Catcher in the Rye", "price": 14, "author": "J.D. Salinger", "image": image.The_Catcher_in_the_Rye }
                    ]
                },
                {
                    "name": "Non-Fiction",
                    "products": [
                        { "id": 29, "name": "Sapiens", "price": 18, "author": "Yuval Noah Harari", "image": image.Sapiens },
                        { "id": 30, "name": "Becoming", "price": 20, "author": "Michelle Obama", "image": image.Becoming },
                        { "id": 31, "name": "Educated", "price": 16, "author": "Tara Westover", "image": image.The_Catcher_in_the_Rye },
                        { "id": 32, "name": "The Power of Habit", "price": 14, "author": "Charles Duhigg", "image": image.The_Power_of_Habit }
                    ]
                }
            ]
        },
        {
            "name": "Sports",
            "subcategories": [
                {
                    "name": "Outdoor",
                    "products": [
                        { "id": 33, "name": "Mountain Bike", "price": 500, "brand": "Trek", "image": image.Mountain_Bike },
                        { "id": 34, "name": "Tent", "price": 150, "brand": "Coleman", "image": image.Tent },
                        { "id": 35, "name": "Sleeping Bag", "price": 80, "brand": "North Face", "image": image.Sleeping_Bag },
                        { "id": 36, "name": "Hiking Boots", "price": 120, "brand": "Merrell", "image": image.Hiking_Boots }
                    ]
                },
                {
                    "name": "Fitness",
                    "products": [
                        { "id": 37, "name": "Treadmill", "price": 700, "brand": "ProForm", "image": image.Treadmill },
                        { "id": 38, "name": "Dumbbell Set", "price": 100, "brand": "Bowflex", "image": image.Dumbbell_Set },
                        { "id": 39, "name": "Yoga Mat", "price": 25, "brand": "Manduka", "image": image.Yoga_Mat },
                        { "id": 40, "name": "Resistance Bands", "price": 20, "brand": "Fit Simplify", "image": image.Resistance_Bands }
                    ]
                }
            ]
        }
    ]
};
