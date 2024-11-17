import React, { useState, useEffect, useContext } from "react";
import { FaStar, FaRegCalendar, FaUsers, FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ChatUI from "./ChatUI";
import LoginPopup from "./login";
import { useRouter } from "next/navigation";

const Card = ({ data, selectedRange, onSave }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [guests, setGuests] = useState(1);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const price = data?.price || 0;
  const person = data?.person || 1;
  const discount = data?.discount || 0;
  const rating = "4.5";
  const reviews = "(112)";

  const nights =
    selectedRange?.start && selectedRange?.end
      ? Math.ceil(
          (new Date(selectedRange.end) - new Date(selectedRange.start)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const subtotal = price * nights;
  const serviceCharge = 0;
  const total = subtotal - discount + serviceCharge;

  const handleReserve = () => {
    if (!selectedRange?.start || !selectedRange?.end) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    try {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          checkInDate: selectedRange.start,
          checkOutDate: selectedRange.end,
          guests,
          total,
          nights,
          listingId: data?._id,
          data,
        })
      );
      router.push("/Reservation");
    } catch (error) {
      toast.error("Reservation failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl ml-2 shadow-lg bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-3xl font-bold">€{price}</span>
          <span className="text-lg text-gray-500">/night</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-orange-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">{reviews}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <button
            onClick={onSave}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <FaRegCalendar className="text-gray-400" />
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-500">Check in - Check out</p>
              <p className="font-medium">
                {selectedRange?.start
                  ? dayjs(selectedRange.start).format("MMM DD")
                  : "Select"}{" "}
                -{" "}
                {selectedRange?.end
                  ? dayjs(selectedRange.end).format("MMM DD")
                  : "dates"}
              </p>
            </div>
          </button>

          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <FaUsers className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">
                    {guests} guest{guests !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(person, guests + 1))}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReserve}
          className="w-full py-4 bg-[#58CAAA] hover:bg-[#4ab596] text-white font-semibold rounded-xl transition-colors"
        >
          Reserve
        </button>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between">
            <span>
              €{price} × {nights} nights
            </span>
            <span>€{subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-€{discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Service charge</span>
            <span>€{serviceCharge}</span>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>€{total}</span>
            </div>
          </div>
        </div>
      </div>

      {showChatPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-6">
            <ChatUI userR={data?.userId?._id} />
            <button
              onClick={() => setShowChatPopup(false)}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <LoginPopup
          onLoginSuccess={() => {
            setShowLoginPopup(false);
            setShowChatPopup(true);
          }}
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </div>
  );
};

export default Card;
