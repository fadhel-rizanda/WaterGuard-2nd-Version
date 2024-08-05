import { FAQContent } from "./FAQContent";
import { ContactsContent } from "./ContactsContent";
export const FAQContacts = () => {
  return (
    <div>
      <div className="w-full flex justify-center gap-16 h-1/2 p-24">
        <FAQContent />
        <ContactsContent/>
      </div>
    </div>
  );
};
