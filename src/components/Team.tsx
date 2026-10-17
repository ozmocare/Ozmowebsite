import Photo from "./Photo";
import Reveal from "./Reveal";
import { SectionHeading } from "./Sections";

// Placeholder team from the original template — replace with the real OZMO team.
const team = [
  {
    name: "Jaspreet Soni",
    role: "CEO, OZMO",
    image: "/images/team-1.jpg",
    bio: "Jaspreet has spent over 20 years in the fitness industry and has grown OZMO into one of Ludhiana's leading fitness destinations.",
  },
  {
    name: "James Smith",
    role: "Head Coach",
    image: "/images/team-2.jpg",
    bio: "James leads the OZMO coaching team, designing training programs and mentoring trainers across every branch.",
  },
  {
    name: "Emma Davis",
    role: "Nutritionist",
    image: "/images/team-3.jpg",
    bio: "Emma builds practical nutrition plans that support each member's training goals, from fat loss to muscle gain.",
  },
];

export default function Team() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="Our people"
          title="The team behind OZMO"
          lead="Meet the passionate people who have been with OZMO since the very beginning."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 120}>
                <article tabIndex={0} className="group relative overflow-hidden rounded-2xl outline-none">
                  <Photo
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/5]"
                    imgClassName="transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-black uppercase">{m.name}</h3>
                    <p className="font-semibold text-brand">{m.role}</p>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 group-focus:max-h-40 group-focus:opacity-100">
                      {m.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
