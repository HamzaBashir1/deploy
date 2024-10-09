'use client';

const Container = ({ children }) => {
  return ( 
    <div
      className="
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
        bg-[#F7F7F7]
        py-4
      "
    >
      {children}
    </div>
  );
}

export default Container;
