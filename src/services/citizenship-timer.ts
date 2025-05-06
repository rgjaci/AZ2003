/**
 * Represents the data needed for the email reminder.
 */
export interface EmailReminder {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * The estimated eligibility date.
   */
  eligibilityDate: Date;
}

/**
 * Asynchronously sends an email reminder.
 *
 * @param reminder The email reminder data.
 * @returns A promise that resolves when the email is sent.
 */
export async function sendEmailReminder(reminder: EmailReminder): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log('Sending email reminder to:', reminder.email);
}
