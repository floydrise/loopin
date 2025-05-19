import { sendEmailMutation, subscriptionMutation } from "@/lib/mutations.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button.tsx";
import type { Session } from "@/lib/auth_client.ts";
import { useNavigate } from "@tanstack/react-router";
import type { eventSelectType } from "../../../server/types.ts";

const SubscribeButton = ({
  queryClient,
  sessionData,
  event,
}: {
  queryClient: QueryClient;
  sessionData: Session;
  event: eventSelectType;
}) => {
  const navigate = useNavigate();
  const sendConfirmationEmail = sendEmailMutation();
  const subscribeToExperience = subscriptionMutation(queryClient, () =>
    sendConfirmationEmail.mutate(),
  );
  return (
    <Button
      variant={"outline"}
      onClick={ () => {
        if (!sessionData) {
          navigate({ to: "/login" });
        } else {
          subscribeToExperience.mutate({
            eventId: event.eventId,
            userId: sessionData.user.id,
          });
        }
      }}
    >
      Sign up
    </Button>
  );
};

export default SubscribeButton;
