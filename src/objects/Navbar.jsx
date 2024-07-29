import appLogo from "/ASSET/image-logo/waterGuard.png";
import loginLogo from "/ASSET/image-logo/login.png";
export const Navbar = () => {
  return (
    <div className="text-xl px-10 fixed shadow-custom w-full bg-gray-100 z-50 items-center grid grid-cols-3">
      
      <div className="w-fit flex items-center gap-3 my-4 cursor-pointer hover:text-gray-400 active:text-gray-300">
        <img src={appLogo} alt="" className="w-12 " />
        <div className="text-3xl font-light ">WaterGuard</div>
      </div>
      <div className="flex flex-row gap-10 justify-center">
        <div className="cursor-pointer hover:text-gray-400 active:text-gray-300">
          Home
        </div>
        <div className="cursor-pointer hover:text-gray-400 active:text-gray-300">
          Monitoring
        </div>
        <div className="cursor-pointer hover:text-gray-400 active:text-gray-300">
          About
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="w-fit flex items-center justify-end gap-1 cursor-pointer hover:text-gray-400 active:text-gray-300">
          <img src={loginLogo} alt="" className="w-5 h-5" />
          <div className="">login</div>
        </div>
      </div>
    </div>
  );
};
