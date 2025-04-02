import { Card } from "@/components/ui/card";
import '@flaticon/flaticon-uicons/css/all/all.css'; 

const services = [
  { name: "Pick and Drop", icon: (p0: { className: string; }) => <i className="fi fi-rr-calendar"></i> },
  { name: "Food & Drinks", icon: () => <i className="fi fi-rr-restaurant"></i> },
  { name: "Room", icon: () => <i className="fi fi-rr-home"></i> },
  { name: "Lockers", icon: () => <i className="fi fi-rr-lock"></i> },
  { name: "Parking", icon: () => <i className="fi fi-rr-car"></i> },
  { name: "First Aid", icon: () => <i className="fi fi-rr-first-aid"></i> },
  { name: "Ambulance", icon: () => <i className="fi fi-rr-ambulance"></i> },
  { name: "Help Desk", icon: () => <i className="fi fi-rr-info"></i> },
  { name: "Changing Room", icon: () => <i className="fi fi-rr-exchange"></i> },
  { name: "Women's Safety", icon: () => <i className="fi fi-rr-shield"></i> },
  { name: "Kids Area", icon: () => <i className="fi fi-rr-smile"></i> },
  { name: "Garden", icon: () => <i className="fi fi-rr-tree"></i> },
];

export function ServicesSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Services we Offer</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service) => (
          <Card key={service.name} className="p-4 text-center hover:shadow-lg transition-shadow">
            {service.icon({ className: "h-8 w-8 mx-auto mb-2" })}
            <h3 className="font-medium">{service.name}</h3>
          </Card>
        ))}
      </div>
    </section>
  );
} 