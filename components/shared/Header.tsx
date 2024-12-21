import Image from "next/image";
import Instructions from "./Rules/Instructions";

const Header = () => {
  return (
    <nav className="navbar p-4 flex items-center">
      <div className="flex justify-between items-center grow ml-4">
        <Image
          src="/images/logo/logo_brand_blue_bg_white.png"
          alt="Logo and brand Chess to earn"
          width={180}
          height={60}
        />
        <div className="mr-4">
          <Instructions />
        </div>
      </div>
    </nav>
  );
};

export default Header;
