import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div>
      <header>
          {/* Mobile phone Slider */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-[250px] md:hidden"
          >
            <SwiperSlide>
              <img src="/img/s1.webp" alt="" className='h-full w-full object-left object-cover'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s2.webp" alt="" className='h-full w-full object-right-top object-cover'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s3.webp" alt="" className='h-full w-full object-left object-cover'/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s4.webp" alt="" className='h-full w-full object-left object-cover'/>
            </SwiperSlide>
          </Swiper>
            
           {/* desktop Slider  */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper hidden md:flex"
          >
            <SwiperSlide>
              <img src="/img/s1.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s2.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s3.webp" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/s4.webp" alt="" />
            </SwiperSlide>
          </Swiper>
        </header> 
    </div>
  )
}

export default Slider
