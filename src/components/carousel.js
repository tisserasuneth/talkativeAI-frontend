import React from "react";
import Slider from "react-slick";
import Avatar from "@mui/material/Avatar";

const CarouselComponent = () => {
    const settings = {
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 1000,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const images = [
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/18891640/pexels-photo-18891640/free-photo-of-cinematic-portrait-of-teen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29368447/pexels-photo-29368447/free-photo-of-elegant-woman-in-red-dress-with-earrings.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];

    return (
        <Slider {...settings}>
            {images.map((src, index) => (
                <div key={index}>
                    <Avatar
                        src={src}
                        sx={{
                            width: 200,
                            height: 200,
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselComponent;
