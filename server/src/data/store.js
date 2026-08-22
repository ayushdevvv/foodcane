import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const now = Date.now();
const mins = (m) => new Date(now + m * 60000).toISOString();
const p = (name, email, role, lat, lng, extra = {}) => ({
  _id: randomUUID(),
  name,
  email,
  role,
  location: { city: "Guwahati", address: extra.address || "Guwahati, Assam" },
  coordinates: { lat, lng },
  passwordHash: bcrypt.hashSync("demo123", 10),
  capacity: extra.capacity || 0,
  foodPreferences: extra.foodPreferences || [],
  availability: extra.availability !== false,
  verified: extra.verified !== false,
});

export const users = [
  p(
    "Green Leaf Restaurant",
    "restaurant@foodresq.demo",
    "PROVIDER",
    26.1445,
    91.7362,
    { address: "GS Road, Guwahati" },
  ),
  p(
    "City Banquet Hall",
    "banquet@foodresq.demo",
    "PROVIDER",
    26.1512,
    91.7811,
    { address: "Zoo Road, Guwahati" },
  ),
  p("FreshBake Cafe", "cafe@foodresq.demo", "PROVIDER", 26.1209, 91.6024, {
    address: "Maligaon, Guwahati",
  }),
  p("Hope Foundation", "ngo@foodresq.demo", "NGO", 26.1308, 91.7442, {
    capacity: 60,
    foodPreferences: [
      "Cooked Meals",
      "Bakery",
      "Fruits & Vegetables",
      "Packaged Food",
      "Dairy",
    ],
    address: "Paltan Bazaar, Guwahati",
  }),
  p("CareBridge NGO", "carebridge@foodresq.demo", "NGO", 26.1572, 91.7021, {
    capacity: 35,
    foodPreferences: ["Cooked Meals", "Packaged Food", "Dairy"],
    address: "Beltola, Guwahati",
  }),
  p("Robin Food Initiative", "robin@foodresq.demo", "NGO", 26.1775, 91.7673, {
    capacity: 50,
    foodPreferences: ["Bakery", "Fruits & Vegetables", "Packaged Food"],
    availability: false,
    address: "Chandmari, Guwahati",
  }),
  p("Helping Hands", "helping@foodresq.demo", "NGO", 26.1102, 91.7088, {
    capacity: 80,
    foodPreferences: [
      "Cooked Meals",
      "Fruits & Vegetables",
      "Packaged Food",
      "Dairy",
    ],
    address: "Athgaon, Guwahati",
  }),
  p("Arjun", "arjun@foodresq.demo", "VOLUNTEER", 26.138, 91.752, {
    foodPreferences: ["Cooked Meals", "Bakery"],
    address: "Ulubari, Guwahati",
  }),
  p("Priya", "priya@foodresq.demo", "VOLUNTEER", 26.1501, 91.7204, {
    foodPreferences: ["Cooked Meals", "Packaged Food"],
    address: "Dispur, Guwahati",
  }),
  p("Rahul", "rahul@foodresq.demo", "VOLUNTEER", 26.1264, 91.765, {
    foodPreferences: ["Bakery", "Fruits & Vegetables"],
    address: "Rehabari, Guwahati",
  }),
  p("Neha", "neha@foodresq.demo", "VOLUNTEER", 26.168, 91.7301, {
    foodPreferences: ["Cooked Meals", "Dairy", "Packaged Food"],
    address: "Silpukhuri, Guwahati",
  }),
];
const uid = (email) => users.find((u) => u.email === email)._id;
const donationsData = [
  [
    "FR1024",
    "40 Vegetarian Meals",
    "Cooked Meals",
    40,
    "restaurant@foodresq.demo",
    mins(68),
    "AVAILABLE",
  ],
  [
    "FR1025",
    "25 Bakery Boxes",
    "Bakery",
    25,
    "restaurant@foodresq.demo",
    mins(170),
    "AVAILABLE",
  ],
  [
    "FR1026",
    "80 Packaged Meals",
    "Packaged Food",
    80,
    "banquet@foodresq.demo",
    mins(320),
    "AVAILABLE",
  ],
  [
    "FR1027",
    "15 Fruit Boxes",
    "Fruits & Vegetables",
    15,
    "cafe@foodresq.demo",
    mins(50),
    "AVAILABLE",
  ],
  [
    "FR1028",
    "60 Event Meals",
    "Cooked Meals",
    60,
    "banquet@foodresq.demo",
    mins(210),
    "CLAIMED",
  ],
  [
    "FR1029",
    "30 Dairy Packs",
    "Dairy",
    30,
    "cafe@foodresq.demo",
    mins(410),
    "AVAILABLE",
  ],
  [
    "FR1030",
    "20 Meal Boxes",
    "Cooked Meals",
    20,
    "restaurant@foodresq.demo",
    mins(75),
    "PICKUP_IN_PROGRESS",
  ],
  [
    "FR1031",
    "50 Bakery Items",
    "Bakery",
    50,
    "cafe@foodresq.demo",
    mins(260),
    "AVAILABLE",
  ],
  [
    "FR1032",
    "100 Event Meals",
    "Cooked Meals",
    100,
    "banquet@foodresq.demo",
    mins(520),
    "DELIVERED",
  ],
  [
    "FR1033",
    "12 Grocery Packs",
    "Packaged Food",
    12,
    "restaurant@foodresq.demo",
    mins(140),
    "AVAILABLE",
  ],
];
export const donations = donationsData.map(
  ([code, foodName, foodType, quantity, email, expiryTime, status]) => {
    const u = users.find((x) => x.email === email);
    return {
      _id: randomUUID(),
      code,
      provider: u._id,
      foodName,
      foodType,
      quantity,
      unit: "meals",
      description: "Fresh surplus food prepared for same day rescue.",
      location: u.location,
      coordinates: u.coordinates,
      expiryTime,
      pickupStart: mins(0),
      pickupEnd: expiryTime,
      status,
      claimedBy:
        status === "CLAIMED"
          ? uid("ngo@foodresq.demo")
          : status === "PICKUP_IN_PROGRESS"
            ? uid("ngo@foodresq.demo")
            : status === "DELIVERED"
              ? uid("ngo@foodresq.demo")
              : null,
      matchResults: [],
    };
  },
);
export const deliveries = donations
  .filter((d) =>
    ["CLAIMED", "PICKUP_IN_PROGRESS", "DELIVERED"].includes(d.status),
  )
  .map((d, i) => ({
    _id: randomUUID(),
    donation: d._id,
    provider: d.provider,
    recipient: d.claimedBy,
    volunteer: uid(
      ["arjun@foodresq.demo", "priya@foodresq.demo", "rahul@foodresq.demo"][
        i % 3
      ],
    ),
    status: d.status === "CLAIMED" ? "CLAIMED" : d.status,
    timestamps: {
      createdAt: new Date(now - 40 * 60000).toISOString(),
      claimedAt: new Date(now - 35 * 60000).toISOString(),
      pickupAssigned: new Date(now - 30 * 60000).toISOString(),
      pickupStarted:
        d.status !== "CLAIMED"
          ? new Date(now - 18 * 60000).toISOString()
          : null,
      deliveredAt:
        d.status === "DELIVERED"
          ? new Date(now - 5 * 60000).toISOString()
          : null,
    },
    pickupLocation: { ...users.find((u) => u._id === d.provider).coordinates },
    dropoffLocation: {
      ...users.find((u) => u._id === d.claimedBy).coordinates,
    },
    currentCoordinates: {
      ...users.find((u) => u._id === d.provider).coordinates,
    },
    eta: 8,
    distance: 3.1,
  }));
export const resetStore = () => {};
