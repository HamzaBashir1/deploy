"use client";

import "./styles/index.css";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Modal from "./components/Modal";
import { useLastViewedPhoto } from "./utils/useLastViewedPhoto";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import LikeSaveBtns from "../LikeSaveBtns";
import { FormContext } from "../../../FormContext";

let PHOTOS = []; // Initialize PHOTOS as an empty array

export const getNewParam = ({ paramName = "photoId", value }) => {
  let params = new URLSearchParams(document.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

const ListingImageGallery = ({ images = [], onClose, isShowModal }) => {
  const { images: formImages } = useContext(FormContext); // Access images from FormContext
  const searchParams = useSearchParams();
  const photoId = searchParams?.get("photoId");
  const router = useRouter();
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef(null);
  const thisPathname = usePathname();

  // Update PHOTOS array dynamically
  useEffect(() => {
    if (formImages && formImages.length > 0) {
      PHOTOS = formImages.map((url, index) => ({
        id: index,
        url,
      }));
    }
  }, [formImages]);

  console.log("Form images:", formImages);
  console.log("PHOTOS array:", PHOTOS);

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
    if (PHOTOS.length === 0) {
      return <p>No images available.</p>;
    }

    return (
      <div>
        {photoId && (
          <Modal
            images={PHOTOS} // Use PHOTOS array
            onClose={() => {
              setLastViewedPhoto(photoId);
              let params = new URLSearchParams(document.location.search);
              params.delete("photoId");
              router.push(`${thisPathname}/?${params.toString()}`);
            }}
          />
        )}

        <div className="gap-4 columns-1 sm:columns-2 xl:columns-3">
          {PHOTOS.map(({ id, url }) => (
            <div
              key={id}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              className="relative block w-full mb-5 after:content group cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none"
              onClick={() => {
                // Set the photoId in the URL when clicking on the image
                let params = new URLSearchParams(document.location.search);
                params.set("photoId", id); // Set photoId to the image ID
                router.push(`${thisPathname}/?${params.toString()}`);
              }}
              >
            
              <Image
                alt={`Image ${id}`}
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
