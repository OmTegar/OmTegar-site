import emailjs from "@emailjs/browser";

export interface EmailData {
    from_name: string;
    message: string;
    email: string;
}

/**
 * Interface for Email Service
 * This allows us to swap email providers easily in the future (DIP)
 */
class EmailService {
    private serviceId: string | undefined;
    private templateId: string | undefined;
    private userId: string | undefined;

    constructor() {
        this.serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE;
        this.templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE;
        this.userId = process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID;
    }

    /**
     * Sends an email via EmailJS
     * @param {EmailData} data
     * @returns {Promise<any>}
     */
    async sendEmail(data: EmailData): Promise<any> {
        if (!this.serviceId || !this.templateId || !this.userId) {
            throw new Error("Email service configuration is missing.");
        }

        try {
            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                {
                    from_name: data.from_name,
                    message: data.message,
                    email: data.email,
                },
                this.userId
            );
            return response;
        } catch (error) {
            console.error("EmailService error:", error);
            throw error;
        }
    }
}

export const emailService = new EmailService();
