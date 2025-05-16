import { type QueryClient, useMutation } from "@tanstack/react-query";
import { postSubscription } from "./api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

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
