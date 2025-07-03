"use client";

import type { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";
import {
  DatePicker,
  type ImperativeHandleFromDatePicker,
} from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/utils/currency";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );
  const datePicketImperativeHandler =
    useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = () => {
    datePicketImperativeHandler.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        name="title"
        id="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        name="content"
        id="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <div className="flex gap-2">
        <DatePicker
          id="deadline"
          name="deadline"
          label="Deadline"
          className="flex w-full flex-1 flex-col gap-2"
          defaultValue={
            (actionState.payload?.get("deadline") as string) ?? ticket?.deadline
          }
          imperativeHandleRef={datePicketImperativeHandler}
          errorField={<FieldError actionState={actionState} name="deadline" />}
        />
        <div className="flex flex-1 flex-col gap-2">
          <Label>Bounty ($)</Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step="0.01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
