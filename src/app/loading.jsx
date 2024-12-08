import Image from "next/image";

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
      <div className="w-full max-w-[393px] flex flex-col items-center gap-4 mx-auto">
        <Image
          src="/images/dalboImg.svg"
          alt="loading character"
          width={85}
          height={85}
          className="animate-bounce"
        />
        <p className="text-main02 text-B-18">Loading...</p>
      </div>
    </div>
  );
};

export default loading;
