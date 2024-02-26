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
    <div>
      <h2>Booking Requests</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Slot Time</th>
            <th>Payment Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {bookingRequests.map(booking => (
    <tr key={booking.id}>
      <td>{booking.user.fullName}</td>
      <td>{booking.slot.startTime} - {booking.slot.endTime}</td>
      <td><img src={booking.paymentImage} alt="Payment" /></td>
      <td>
        {booking.verified ? 'Verified' : 'Pending'}
        {!booking.verified && ( // Render buttons only for pending bookings
          <div>
          <button onClick={() => handleUpdateStatus(booking.id, 'accept')}>Accept</button>
          <button onClick={() => handleUpdateStatus(booking.id, 'reject')}>Reject</button>
        </div>
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
