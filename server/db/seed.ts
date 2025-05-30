import { db } from "./index";
import { eventsTable } from "./schema";
import { eventInsertType } from "../types";

const experiences: eventInsertType[] = [
  {
    eventName: "Sunset Yoga by the Beach",
    eventDescription:
      "Unwind with a peaceful yoga session as the sun sets over the ocean.",
    eventImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    eventPrice: 25,
    eventLocation: "Santa Monica Beach",
    eventDateStart: "2025-06-15",
    eventTimeStart: "18:30:00",
  },
  {
    eventName: "Art & Wine Night",
    eventDescription:
      "Sip on fine wine while creating your own masterpiece with local artists.",
    eventImg: "https://images.unsplash.com/photo-1581091012184-7f88f6d41669",
    eventPrice: 45,
    eventLocation: "SoMa, San Francisco",
    eventDateStart: "2025-07-05",
    eventTimeStart: "19:00:00",
  },
  {
    eventName: "Tech & Tacos Networking Mixer",
    eventDescription:
      "Connect with startup founders and tech enthusiasts over delicious tacos.",
    eventImg: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    eventPrice: 15,
    eventLocation: "Downtown Austin",
    eventDateStart: "2025-06-22",
    eventTimeStart: "17:30:00",
  },
  {
    eventName: "Stargazing at the Observatory",
    eventDescription:
      "Join an expert astronomer to explore constellations and celestial wonders.",
    eventImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    eventPrice: 30,
    eventLocation: "Griffith Observatory",
    eventDateStart: "2025-06-28",
    eventTimeStart: "21:00:00",
  },
  {
    eventName: "Craft Beer & BBQ Festival",
    eventDescription: "Enjoy a day of craft beers, smoky BBQ, and live music.",
    eventImg: "https://images.unsplash.com/photo-1550966871-3edfd3c3d1b7",
    eventPrice: 50,
    eventLocation: "Kansas City",
    eventDateStart: "2025-08-03",
    eventTimeStart: "13:00:00",
  },
  {
    eventName: "Morning Meditation & Sound Bath",
    eventDescription:
      "Start your day with calm through meditation and sound healing.",
    eventImg: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1d",
    eventPrice: 20,
    eventLocation: "Golden Gate Park",
    eventDateStart: "2025-06-16",
    eventTimeStart: "08:00:00",
  },
  {
    eventName: "Cultural Food Tasting Tour",
    eventDescription:
      "A walking tour featuring bites from various international cuisines.",
    eventImg: "https://images.unsplash.com/photo-1532635248-2215025e3f6e",
    eventPrice: 35,
    eventLocation: "Queens, NY",
    eventDateStart: "2025-07-12",
    eventTimeStart: "14:00:00",
  },
  {
    eventName: "Live Jazz Rooftop Night",
    eventDescription: "Enjoy live jazz music and cocktails under the stars.",
    eventImg: "https://images.unsplash.com/photo-1508061257496-9f3b8b6a2065",
    eventPrice: 40,
    eventLocation: "Downtown Chicago",
    eventDateStart: "2025-06-20",
    eventTimeStart: "20:00:00",
  },
  {
    eventName: "Wilderness Survival Skills Workshop",
    eventDescription:
      "Learn how to navigate, build shelter, and survive in the wild.",
    eventImg: "https://images.unsplash.com/photo-1526481280690-922c4c3e3034",
    eventPrice: 60,
    eventLocation: "Mount Rainier National Park",
    eventDateStart: "2025-07-19",
    eventTimeStart: "09:00:00",
  },
  {
    eventName: "Digital Detox Weekend Retreat",
    eventDescription:
      "Escape the screen for a weekend of hiking, journaling, and nature.",
    eventImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    eventPrice: 120,
    eventLocation: "Sedona, AZ",
    eventDateStart: "2025-08-09",
    eventTimeStart: "10:00:00",
  },
];

const seedEventsTable = async () => {
  try {
    await db.insert(eventsTable).values(experiences);
    console.log("Successfully seeded DB!");
    return;
  } catch (e) {
    console.log(e, "Error seeding");
    return;
  }
};

seedEventsTable();
