'use client';

const Container = ({ children }) => {
  return ( 
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
        bg-[#F7F7F7]
        py-5
      "
    >
      {children}
    </div>
  );
}

export default Container;
