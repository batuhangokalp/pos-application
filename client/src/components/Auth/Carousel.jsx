import { Carousel } from "antd";
import AuthCarousel from "./AuthCarousel";

const CommonCarousel = () => {
  return (
    <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
      <div className="w-full h-full flex items-center">
        <div className="w-full">
          <Carousel className="!h-full px-6" autoplay>
            <AuthCarousel
              img="/images/responsive.svg"
              title="Responsive"
              desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
            />
            <AuthCarousel
              img="/images/statistic.svg"
              title="İstatistikler"
              desc="Geniş Tutulan İstatistikler"
            />
            <AuthCarousel
              img="/images/customer.svg"
              title="Müşteri Memnuniyeti"
              desc="Deneyim Sonunda Üründen Memnun Müşteriler"
            />
            <AuthCarousel
              img="/images/admin.svg"
              title="Yönetici Paneli"
              desc="Tek Yerden Yönetim"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CommonCarousel;
