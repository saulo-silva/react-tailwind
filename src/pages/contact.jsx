import ContactForm from '../components/forms/ContactForm';

export default function Contact() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-primary-600 dark:text-primary-400">
          Contact Us
        </h1>
        <div className="mx-auto max-w-lg">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
