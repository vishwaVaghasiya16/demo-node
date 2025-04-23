import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  shopByCategories: [
    {
      _id: "111",
      title: "New Arrival",
    },
    {
      _id: "2",
      title: "Featured",
    },
    {
      _id: "3",
      title: "Best Seller",
    },
  ],
  shopByCategoryData: [
    {
      _id: "111",
      category: { title: "New Arrivals" },
      data: [
        {
          _id: "1",
          img:
            "https://i.pinimg.com/736x/de/df/69/dedf692f808a1aada2c23fc224bdfd4d--gold-earrings-gold-jewelry.jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "2",
          img:
            "https://3.bp.blogspot.com/-B3H7b5J8Ovs/VIbisklWqOI/AAAAAAAAgvE/e1glFTDgj8c/s1600/Unique-Golden-Earrings-Jhumka.jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "3",
          img:
            "https://3.bp.blogspot.com/-58AEqkfvZhU/UUAnelMRJxI/AAAAAAAAIWU/obyKrgAp40s/s1600/Indian+Gold+Earring+Design+for+ladies+2013+(2).jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "4",
          img:
            "https://www.purejewels.com/wp-content/uploads/2017/12/26274_1-copy-1.png",
          category: "bracelet",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "5",
          img:
            "https://i.pinimg.com/736x/de/df/69/dedf692f808a1aada2c23fc224bdfd4d--gold-earrings-gold-jewelry.jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "6",
          img:
            "https://3.bp.blogspot.com/-B3H7b5J8Ovs/VIbisklWqOI/AAAAAAAAgvE/e1glFTDgj8c/s1600/Unique-Golden-Earrings-Jhumka.jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "7",
          img:
            "https://3.bp.blogspot.com/-58AEqkfvZhU/UUAnelMRJxI/AAAAAAAAIWU/obyKrgAp40s/s1600/Indian+Gold+Earring+Design+for+ladies+2013+(2).jpg",
          category: "EARRINGS",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
        {
          _id: "8",
          img:
            "https://www.purejewels.com/wp-content/uploads/2017/12/26274_1-copy-1.png",
          category: "bracelet",
          title: "Circle of Light Heart Earring",
          discountedPrice: "10,320",
          price: "12,000",
          off: "15%",
        },
      ],
    },
  ],
  JewelryTrends: [
    {
      _id: 1,
      //   img: "/assets/web/home/explore-collection-image1.webp",
      img: "https://avatars.mds.yandex.net/i?id=054b789c23f1c7d2d274b5233645aeb23cbf3200-5257529-images-thumbs&n=13",
      category:"earrings",
      title: "Christmas Gift Guide, Christmas Gift Guide, Christmas Gift Guide, Christmas Gift Guide, Christmas Gift Guide",
      discountedPrice:"15279",
      price:"17500",
      off:"15%"
    },
    {
      _id: 2,
      //   img: "/assets/web/home/explore-collection-image1.webp",
      img: "https://cf.ltkcdn.net/jewelry/images/orig/249770-1600x1030-meaning-each-finger-rings.jpg",
      category:"earrings",
      title: "Christmas Gift Guide",
      discountedPrice:"15279",
      price:"17500"
    },
    {
      _id: 3,
      //   img: "/assets/web/home/explore-collection-image1.webp",
      img: "https://avatars.mds.yandex.net/i?id=f66b123450ad424c2a5b30731477e598c1bb2602-12460761-images-thumbs&n=13",
      category:"earrings",
      title: "Christmas Gift Guide",
      discountedPrice:"15279",
      price:"17500"
    },
    {
      _id: 4,
      //   img: "/assets/web/home/explore-collection-image1.webp",
      img: "https://avatars.mds.yandex.net/i?id=054b789c23f1c7d2d274b5233645aeb23cbf3200-5257529-images-thumbs&n=13",
      category:"earrings",
      title: "Christmas Gift Guide",
      discountedPrice:"15279",
      price:"17500",
      off:"15%"
    },
    {
      _id: 5,
      //   img: "/assets/web/home/explore-collection-image1.webp",
      img: "https://cf.ltkcdn.net/jewelry/images/orig/249770-1600x1030-meaning-each-finger-rings.jpg",
      category:"earrings",
      title: "Christmas Gift Guide",
      discountedPrice:"15279",
      price:"17500"
    },
  ],
  latestCollection: [
    {
      _id: "1",
      thumbnail:
        "https://i.pinimg.com/originals/8d/18/fc/8d18fc95f657f6faa57910becea387cb.jpg",
      title: "Necklaces & Body Jewels",
      description: "Look to our new season collection for girls.",
    },
    {
      _id: "2",
      thumbnail:
        "https://acklamvillage.com/wp-content/uploads/2014/09/photodune-1634933-beautiful-woman-wearing-jewelry-very-clean-image-with-copy-space-m1-1.jpg",
      title: "Just Lunched Desk The Hals",
    },
    {
      _id: "3",
      thumbnail:
        "https://www.laclessidra1945.it/wp-content/uploads/2018/01/HighJewellery_W_010web-1.jpg",
      title: "Jewelry & Charm Bracelets",
      description: "Look to our new season collection",
    },
  ],
  gifting:[
    {
      _id:"1",
      for:"For Brother",
      img:"https://static.wixstatic.com/media/11062b_f3b70ee7b93d45169c65bbe743ae5e39~mv2_d_3359_2240_s_2.jpg/v1/fill/w_2500,h_1667,al_c/11062b_f3b70ee7b93d45169c65bbe743ae5e39~mv2_d_3359_2240_s_2.jpg"
    },
    {
      _id:"2",
      for:"For Sister",
      img:"https://visualeducation.com/wp-content/uploads/2019/02/gem-no-dust-final-image-1.jpg"
    },
    {
      _id:"3",
      for:"For mother",
      img:"https://browntape.com/wp-content/uploads/2016/10/jew_banner.jpg"
    },
    {
      _id:"4",
      for:"For father",
      img:""
    },
  ],
  loading: true,
  error: null,
  message: "",
};

const slice = createSlice({
  name: "CollectionsOverview",
  initialState,
  reducers: {},
});

export default slice.reducer;
