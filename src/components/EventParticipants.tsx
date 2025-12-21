"use client";

import { useGetEventParticipants } from "@/lib/api/event";
import { EventParticipant } from "@/lib/types";
import { Users } from "lucide-react";

interface EventParticipantsProps {
  eventId: string;
}

export default function EventParticipants({
  eventId,
}: EventParticipantsProps) {
  const { data, isError, error, isPending } = useGetEventParticipants(eventId);

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-8 text-gray-500">
            Loading participants...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-8 text-red-500">
            Failed to load participants. {error?.message}
          </div>
        </div>
      </div>
    );
  }

  const participants: EventParticipant[] = data?.data?.participants || [];

  if (participants.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No participants yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Be the first to register for this event!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
            {participants.length} {participants.length === 1 ? "Breeder" : "Breeders"}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Breeder Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Loft Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Birds
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {participants.map((participant, index) => (
                  <tr
                    key={participant.idEventInventory}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {participant.breederName}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {participant.loft || "-"}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        {participant.reservedBirds}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
