import { BodyWrapper } from "../constant/BodyWrapper";

const Navbar = () => {
  return (
    <div className="w-full bg-amber-400 sticky top-0">
      <BodyWrapper>
        <div className="h-16 text-3xl text-white font-semibold flex items-center">
          Pokedex
        </div>
      </BodyWrapper>
    </div>
  );
};

export default Navbar;
