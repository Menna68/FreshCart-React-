import slidImgo from "../../assets/images/slider1.jpg";
import slidImge from "../../assets/images/slider2.jpg";
import slidImgs from "../../assets/images/slider3.jpg";
import product1 from "../../assets/images/slider3.jpg";
import product2 from "../../assets/images/slider1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";

import "swiper/css";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 gap-4 mb-11 mt-5 ">
        <div className="col-span-12 lg:col-span-8 ">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            slidesPerView={"auto"}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-full rounded-xl  "
          >
            <div className="w-full h-full">
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImgs} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImge} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                  
              
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImgo} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                  
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
        <div className="col-span-12 flex flex-col sm:flex-row  lg:grid lg:col-span-4 gap-4 ">
          <div className="w-full  rounded-xl overflow-hidden relative">
            <img className="w-full " src={product1} alt="" />
            <div className=" absolute top-8 left-6 space-y-6 sm:space-y-2 md:space-y-6 lg:space-y-4 ">
              
            </div>
          </div>
          <div className="w-full  rounded-xl overflow-hidden -mb-4 relative">
            <img className="w-full " src={product2} alt="" />
            <div className=" absolute top-8 left-6 space-y-6 sm:space-y-2 md:space-y-6 lg:space-y-4 ">
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
