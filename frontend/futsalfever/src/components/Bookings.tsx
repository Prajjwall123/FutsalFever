import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteBookingById, getAllBookingRequests, updateBookingStatus } from '../services/futsalHelper';

const Bookings: React.FC<{ futsalId: number }> = ({ futsalId }) => {
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchBookingRequests();
  }, [futsalId]);

  const fetchBookingRequests = () => {
    getAllBookingRequests(futsalId)
      .then(data => {
        setBookingRequests(data);
      })
      .catch(error => {
        console.error('Error fetching booking requests:', error);
      });
  };

  const handleAcceptBooking = (bookingId: number) => {
    updateBookingStatus(bookingId, 'accept')
      .then(updatedBooking => {
        updateBookingInState(updatedBooking);
        toast("Accepted booking request ")
      })
      .catch(error => {
        console.error('Error accepting booking:', error);
      });
  };

  const handleRejectBooking = (bookingId: number) => {
    deleteBookingById(bookingId)
      .then(() => {
        updateBookingStatus(bookingId, 'reject')
          .then(updatedBooking => {
            updateBookingInState(updatedBooking);
            toast("Rejected booking request ")
          })
          .catch(error => {
            console.error('Error rejecting booking:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  const updateBookingInState = (updatedBooking: any) => {
    const updatedIndex = bookingRequests.findIndex(booking => booking.id === updatedBooking.id);
    if (updatedIndex !== -1) {
      const updatedBookings = [...bookingRequests];
      updatedBookings[updatedIndex] = updatedBooking;
      setBookingRequests(updatedBookings);
    } else {
      console.error('Updated booking not found in the list.');
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Requests</h2>

      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Payment</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingRequests.map((booking) => (
            <tr key={booking.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{booking.user.fullName}</td>
              <td className="px-4 py-2">{booking.slot.startTime} - {booking.slot.endTime}</td>
              <td className="px-4 py-2">
                <img src={booking.paymentImage} alt="Payment" className="w-10 h-10 object-cover rounded-lg" />
              </td>
              <td className="px-4 py-2 text-gray-500">
                {booking.verified ? 'Verified' : 'Pending'}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                {!booking.verified && (
                  <>
                    <button
                      className="rounded-lg bg-green-500 text-white px-2 py-1 hover:bg-green-700"
                      onClick={() => handleAcceptBooking(booking.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="rounded-lg bg-red-500 text-white px-2 py-1 hover:bg-red-700"
                      onClick={() => handleRejectBooking(booking.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
