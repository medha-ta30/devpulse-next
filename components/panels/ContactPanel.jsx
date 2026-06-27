import ContactForm from '../ContactForm';

export default function ContactPanel() {
  return (
    <section className="contact-panel">
      <h2 className="contact-panel-title">Contact Us</h2>
      <p style={{ margin: '0 0 24px', fontSize: '0.875rem', color: 'var(--dp-text)' }}>
        Have feedback or a question? We&apos;d love to hear from you.
      </p>
      <ContactForm />
    </section>
  );
}
