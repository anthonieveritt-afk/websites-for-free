export interface Testimonial {
  id: string;
  name: string;
  business: string;
  location: string;
  rating: number;
  quote: string;
  industry: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mike Collins",
    business: "Collins Electrical",
    location: "Essex",
    rating: 5,
    industry: "Electricians",
    quote:
      "I was sceptical at first, but the website they built for me is genuinely better than ones I've seen businesses pay thousands for. The whole process was simple and the team were brilliant.",
  },
  {
    id: "2",
    name: "Sarah Thompson",
    business: "Glow Beauty Studio",
    location: "Kent",
    rating: 5,
    industry: "Beauty",
    quote:
      "Got my website built without spending a penny upfront. Bookings have increased by 40% since going live. Absolutely worth every penny of the monthly fee.",
  },
  {
    id: "3",
    name: "James Patel",
    business: "JP Personal Training",
    location: "London",
    rating: 5,
    industry: "Personal Trainers",
    quote:
      "I had no idea how to get a website. The team handled everything — design, content, the lot. Now I look as professional as the big gyms.",
  },
  {
    id: "4",
    name: "David Okonkwo",
    business: "Okonkwo Plumbing Solutions",
    location: "Birmingham",
    rating: 5,
    industry: "Plumbers",
    quote:
      "My phone started ringing within a week of my website going live. The free trial sold it for me — I had nothing to lose and everything to gain.",
  },
  {
    id: "5",
    name: "Rachel Hughes",
    business: "Dragon Spirit Karate",
    location: "Cardiff",
    rating: 5,
    industry: "Karate Clubs",
    quote:
      "Our club membership has grown by 30% since getting our new website. Parents can now find us easily and the online enquiry form saves us so much time.",
  },
  {
    id: "6",
    name: "Tom Brennan",
    business: "The Copper Kettle Restaurant",
    location: "Manchester",
    rating: 5,
    industry: "Restaurants",
    quote:
      "Professional, fast, and completely hassle-free. Our online reservations have doubled and the website looks absolutely stunning on mobile.",
  },
];
