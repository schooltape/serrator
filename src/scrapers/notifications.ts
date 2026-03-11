import type { SchoolboxContext, SchoolboxNotification } from "@/types";
import { getNotification } from "./utils";

/**
 * route: /notifications
 */
export async function getNotifications(
  ctx: SchoolboxContext,
): Promise<SchoolboxNotification[]> {
  const { domain, jwt, fetch, parser } = ctx;

  const document = await parser(
    await fetch(`https://${domain}/notifications`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  );

  const notifications: SchoolboxNotification[] = [];

  document.querySelectorAll(".information-list > .row").forEach((el) => {
    notifications.push(getNotification(el));
  });

  return notifications;
}
