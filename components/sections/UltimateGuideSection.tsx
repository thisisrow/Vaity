import { Card } from "@/components/ui/card";

const guides = [
  {
    title: "Height Requirements",
    content: "Important information about ride height requirements and safety guidelines.",
  },
  {
    title: "Best Times to Visit",
    content: "Tips on when to visit different attractions to minimize wait times.",
  },
  {
    title: "Safety Guidelines",
    content: "Essential safety information to ensure a fun and secure experience.",
  },
];

export function UltimateGuideSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mx-[5%]">
      <div>
        <h2 className="text-3xl font-bold mb-6 ">Ultimate Guide to Rides & Attractions</h2>
        <div className="space-y-4 ">
          {guides.map((guide, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-semibold mb-2">{guide.title}</h3>
              <p className="text-sm text-muted-foreground">{guide.content}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-2">
            <p>Address: Navapur Beach Rd, Vaity Wadi, Navapur, Virar West, Virar, Maharashtra 401301</p>
            <p>
              Contact: <a href="tel:+917058712714" className="text-blue-500 underline">+91 70587 12714</a>
            </p>
            <p>
              WhatsApp: <a href="https://wa.me/917058712714" target="_blank" rel="noopener noreferrer" className="text-green-500 underline">Chat on WhatsApp</a>
            </p>
            <p>Time: 9AM - 5:30PM</p>
          </div>
        </Card>
        <div className="bg-muted rounded-lg p-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.206914140784!2d72.75323277521461!3d19.44664378183584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aba06deb948d%3A0x25d18fe3dbef52f7!2sVaity%20Aqua%20(Resort%20in%20Virar%20West)!5e0!3m2!1sen!2sin!4v1743618984899!5m2!1sen!2sin"
            className="w-full h-[200px] rounded-lg"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
