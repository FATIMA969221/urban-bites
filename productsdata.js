var UB_PRODUCTS = [
    {
        id: 1,
        name:"Classic Smash Burger",
        shortDesc: "Beef patty, cheddar, lettuce",
        longDesc: "A juicy beef patty smashed thin on the grill for a crispy edge, layered with melted cheddar, crunchy lettuce, and our house sauce inside a toasted brioche bun. Served with a side of crispy fries.",
        price: 12,
        img: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" 
    },
    {
        id: 2,
        name:"Margherita Pizza",
        shortDesc:"Mozzarella, basil, tomato",
        longDesc:"A wood-fired classic topped with fresh mozzarella, ripe tomato sauce, and fragrant basil leaves. Simple ingredients, done right, on a thin and crispy crust.",
        price: 15,
        img: "https://images.unsplash.com/photo-1716237386053-e7f2747d123d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcmdoZXJpdGElMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 3,
        name:"Garden Fresh Salad",
        shortDesc:"Mixed greens, vinaigrette",
        longDesc:"A crisp mix of seasonal greens, cheery tomatoes, cucumber, and red onion, tossed in a light house-made vinaigrette. A refreshing way to start any meal.",
        price: 9,
        img: "https://plus.unsplash.com/premium_photo-1676047258557-de72954cf17c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsYWR8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 4,
        name:"Creamy Carbonara",
        shortDesc:"Spaghetti, pancetta, parmesan",
        longDesc:"Al dente spaghetti tossed in a rich, creamy sauce with crispy pancetta and a generous shaving of parmesan. Finished with cracked black pepper.",
        price: 14,
        img:"https://images.unsplash.com/photo-1781332147533-aefdfe14dc2c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 5,
        name:"Grilled Chicken Bowl",
        shortDesc:"Chicken, rice, avocado",
        longDesc:"Tender grilled chicken breast over seasoned rice with creamy avocado, roasted vegetables, and a drizzle of chipotle-lime sauce.",
        price: 13,
        img:"https://images.unsplash.com/photo-1666599028424-e316d4e34aa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JpbGxlZCUyMGNoaWNrZW4lMjBib3dsfGVufDB8fDB8fHww"
    },
    {
        id: 6,
        name:"Ribeye Steak",
        shortDesc:"Prime cut, herb butter, fries",
        longDesc:"A prime cut ribeye grilled to your liking, topped with herb butter and served alongside golden, crispy fries. A hearty choice for steak lovers.",
        price: 28,
        img:"https://plus.unsplash.com/premium_photo-1723672929404-36ba6ed8ab50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmliZXllJTIwc3RlYWt8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 7,
        name:"Street Tacos",
        shortDesc:"Corn tortilla, beef, onion",
        longDesc:"Three soft corn tortillas filled with seasoned beef, chopped onion, cilantro, and a squeeze of fresh lime. Served with our signature salsa on the side.",
        price: 11,
        img:"https://plus.unsplash.com/premium_photo-1681406995031-fe952f1e0858?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHN0cmVldCUyMHRhY29zfGVufDB8fDB8fHww"
    },
    {
        id: 8,
        name:"Chocolate Lava Cake",
        shortDesc:"Warm chocolate, ice cream",
        longDesc:"A warm chocolate cake with a molten center, served with a scoop of vanilla ice cream. The perfect finish to any meal.",
        price: 8,
        img:"https://images.unsplash.com/photo-1585504455924-3d3b0eb2b8ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNob2NvbGF0ZSUyMGxhdmElMjBjYWtlfGVufDB8fDB8fHww"
    },
    {
        id: 9,
        name:"Full English Breakfast",
        shortDesc:"Eggs, bacon, toast, beans",
        longDesc:"A hearty plate with eggs cooked to your liking, crispy bacon, grilled tomato, baked beans, and buttered toast. A morning classic done properly.",
        price: 10,
        img:"https://images.unsplash.com/photo-1655979282314-eb45a7d69959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 10,
        name:"Sushi Platter",
        shortDesc:"Salmon, tuna, avocado rolls",
        longDesc:"A curated selection of fresh salmon, tuna and avocado rolls, served with soy sauce, wasabi, and pickled ginger.",
        price: 22,
        img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VzaGklMjBwbGF0dGVyfGVufDB8fDB8fHww"
    }
];

function ubGetProductById(id) {
    id = parseInt(id, 10);
    for (var i = 0; i < UB_PRODUCTS.length; i++) {
        if (UB_PRODUCTS[i].id === id) return UB_PRODUCTS[i];
    }
    return null;
} 

