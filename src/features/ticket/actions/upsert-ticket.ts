"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const updatedData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id ?? "",
      },
      create: updatedData,
      update: updatedData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  // Is updating ticket?
  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};
