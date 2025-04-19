import Faved from "../components/Faved";
const WishList = () => {

  return (
    <div className=" sm:grid sm:grid-cols-3 md:grid-cols-4 p-5 pl-16 sm:pl-10 sm:gap-0  sm:gap-y-10 flex flex-col gap-8 sm:text-[0.8em] bg-[#E4E0E1]">
      <Faved loc={"/assets/pexels-alokkd1-19845610.jpg"} />
      <Faved loc={"/assets/pexels-fahmi-garna-249814583-13381986.jpg"} />
      <Faved
        loc={
          "/assets/pexels-jose-martin-segura-benites-1422456152-27352801.jpg"
        }
      />
      <Faved loc={"/assets/pexels-vie-studio-8148577.jpg"} />
      <Faved
        loc={
          "/assets/pexels-jose-martin-segura-benites-1422456152-27352801.jpg"
        }
      />
      <Faved loc={"/assets/pexels-fahmi-garna-249814583-13381986.jpg"} />
      <Faved loc={"/assets/pexels-vie-studio-8148577.jpg"} />
      <Faved loc={"/assets/pexels-alokkd1-19845610.jpg"} />
      <Faved loc={"/assets/pexels-vie-studio-8148577.jpg"} />
      <Faved
        loc={
          "/assets/pexels-jose-martin-segura-benites-1422456152-27352801.jpg"
        }
      />
    </div>
  );
};

export default WishList;
