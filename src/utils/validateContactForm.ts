export interface ContactForm {
  name: string;
  subject: string;
  email: string;
  message: string;
}


export function validateContactForm(data: ContactForm): string | null {
    if (!data.name || data.name.length < 2) {
      return "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return "Please enter valid email address";
    }

    if (!data.subject || data.subject.length < 3) {
      return "Subject must be at least 3 charachters";
    }

    if (!data.message || data.message.length < 10) {
      return "Message must be at least 10 charachters";
    }

    return null;
  }