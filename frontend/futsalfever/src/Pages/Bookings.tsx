import React, { useEffect, useState } from 'react';
import { getAllBookingRequests, updateBookingStatus } from '../services/futsalHelper';

const Bookings: React.FC<{ futsalId: number }> = ({ futsalId }) => {
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = () => {
    getAllBookingRequests(futsalId)
      .then(data => {
        setBookingRequests(data);
      })
      .catch(error => {
        console.error('Error fetching booking requests:', error);
      });
  };
  const handleUpdateStatus = (bookingId: number, action: string) => {
    updateBookingStatus(bookingId, action)
      .then(updatedBooking => {
        // Find the index of the updated booking in the bookingRequests array
        const updatedIndex = bookingRequests.findIndex(booking => booking.id === bookingId);
        if (updatedIndex !== -1) {
          // Create a new array with the updated booking replacing the old one
          const updatedBookings = [...bookingRequests];
          updatedBookings[updatedIndex] = updatedBooking;
          // Update the state with the new array
          setBookingRequests(updatedBookings);
        } else {
          console.error('Updated booking not found in the list.');
        }
      })
      .catch(error => {
        console.error(`Error ${action === 'accept' ? 'accepting' : 'rejecting'} booking:`, error);
      });
  };
  

  return (
<div className="container mx-auto max-w-3xl px-4 py-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Requests</h2>

  <table className="table-auto w-full rounded-lg shadow-md">
    <thead>
      <tr className="bg-gray-100 text-left text-sm font-medium">
        <th className="px-4 py-2">User</th>
        <th className="px-4 py-2">Slot Time</th>
        <th className="px-4 py-2">Payment Image</th>
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
                  onClick={() => handleUpdateStatus(booking.id, 'accept')}
                >
                  Accept
                </button>
                <button
                  className="rounded-lg bg-red-500 text-white px-2 py-1 hover:bg-red-700"
                  onClick={() => handleUpdateStatus(booking.id, 'reject')}
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
