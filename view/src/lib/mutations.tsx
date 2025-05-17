import { type QueryClient, useMutation } from "@tanstack/react-query";
import {
  deleteSubscription,
  postSubscription,
  postToGoogleCalendar,
} from "./api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import type { SubscriptionTicketType } from "../../../server/types.ts";

export const subscriptionMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (userInput: { eventId: number; userId: string }) =>
      postSubscription(userInput.eventId, userInput.userId),
    onSuccess: () => {
      toast.success("Successfully added subscription", {
        action: (
          <Button asChild size={"icon"} variant={"ghost"}>
            <Link to={"/profile"}>
              <Eye />
            </Link>
          </Button>
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["fetch_subscriptions"] });
    },
    onError: (error) => {
      toast.warning("Warning: " + error.message);
    },
  });
};

export const deleteMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: number) => deleteSubscription(id),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_subscriptions"] });
      toast.success("Successfully removed subscription");
    },
  });
};

export const postToGoogleCalendarMutation = () => {
  return useMutation({
    mutationFn: (userInput: {
      event: SubscriptionTicketType;
      accessToken: string | undefined;
    }) => postToGoogleCalendar(userInput.event, userInput.accessToken),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSuccess: () => {
      toast.success("Successfully added experience to calendar");
    },
  });
};
