"use client";

import "./styles/index.css";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import { useLastViewedPhoto } from "./utils/useLastViewedPhoto";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import LikeSaveBtns from "../LikeSaveBtns";

const PHOTOS = [
  "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

export const DEMO_IMAGE = PHOTOS.map((item, index) => {
  return {
    id: index,
    url: item,
  };
});

 export  const getNewParam = ({ paramName = "photoId", value }) => {
  let params = new URLSearchParams(document.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

const ListingImageGallery = ({ images = DEMO_IMAGE, onClose, isShowModal }) => {
  const searchParams = useSearchParams();
  const photoId = searchParams?.get("photoId");
  const router = useRouter();
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef(null);
  const thisPathname = usePathname();
  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const handleClose = () => {
    onClose && onClose();
  };

  const renderContent = () => {
    return (
      <div>
      
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
              let params = new URLSearchParams(document.location.search);
              params.delete("photoId");
              router.push(`${thisPathname}/?${params.toString()}`);
            }}
          />
        )}

        <div className="gap-4 columns-1 sm:columns-2 xl:columns-3">
          {images.map(({ id, url }) => (
            <div
              key={id}
              
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              className="relative block w-full mb-5 after:content group cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
            >
              <Image
                alt="chisfis listing gallery"
                className="transition transform rounded-lg brightness-90 will-change-auto group-hover:brightness-110 focus:outline-none"
                style={{
                  transform: "translate3d(0, 0, 0)",
                }}
                src={url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Transition appear show={isShowModal} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white xl:px-10">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-0 hover:bg-neutral-100"
                onClick={handleClose}
              >
                <ArrowSmallLeftIcon className="w-6 h-6" />
              </button>
              <LikeSaveBtns />
            </div>

            <div className="flex items-center justify-center min-h-full pt-0 text-center sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-5"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-5"
              >
                <Dialog.Panel className="w-full max-w-screen-lg p-4 pt-0 mx-auto text-left transition-all transform">
                  {renderContent()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ListingImageGallery;