import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { EventCard } from "~/components/event-card";
import EventsCard from "~/components/event-card";
import ReservationsCard from "~/components/reservation-card";
import type { Route } from "./+types/index-page";

export const loader = async (args: Route.LoaderArgs) => {
  // const { userId } = await requireAuth(args)
  const testReservation = {
    eventName: "Test reservation",
    id: "1234",
    date: new Date().toLocaleDateString(),
    eventId: "1234",
    status: "approved",
    time: 1630,
    confirm: "TEST",
    time_slot: "4:00 PM",
  };

  const testEvent: EventCard = {
    id: "event-1234",
    name: "Test Event",
    eventDate: new Date().toISOString(),
  };

  const reservations = [testReservation];

  const openEvents = [testEvent];

  // const { openEvents, reservations } = await getIndexPageData({ userId });

  return { reservations, openEvents };
};

export const action = async (args: ActionFunctionArgs) => {
  return null;
};

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <EventsCard openEvents={loaderData.openEvents} />
      <ReservationsCard reservations={loaderData.reservations} />
    </>
  );
}
