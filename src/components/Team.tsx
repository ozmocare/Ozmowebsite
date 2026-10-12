import { SocialLinks } from "./Socials";
import Reveal from "./Reveal";

// Placeholder team from the original template — replace with the real OZMO team.
const team = [
  {
    name: "Jaspreet Soni",
    role: "CEO of OZMO",
    image: "/images/team-1.jpg",
    bio: "Jaspreet Soni, CEO of OZMO, has over 20 years of experience in the fitness industry. He has transformed OZMO into a leading fitness destination through his innovative approach and dedication to excellence.",
  },
  {
    name: "James Smith",
    role: "Head Coach of OZMO",
    image: "/images/team-2.jpg",
    bio: "James leads the OZMO coaching team, designing training programs and mentoring trainers across all six branches.",
  },
  {
    name: "Emma Davis",
    role: "Nutritionist of OZMO",
    image: "/images/team-3.jpg",
    bio: "Emma builds practical nutrition plans that support each member's training goals, from fat loss to muscle gain.",
  },
];

export default function Team() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="wrap">
        <Reveal className="text-center">
          <h2 className="h-section">Our team</h2>
          <p className="lead mx-auto mt-8 max-w-lg">
            Meet our passionate team, who have been with OZMO since the very beginning.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {team.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 120}>
                <article tabIndex={0} className="group relative aspect-[440/634] overflow-hidden bg-black outline-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                  <SocialLinks names={["x", "instagram", "linkedin"]} variant="tile" className="absolute right-6 top-6 flex flex-col gap-3" />

                  <div className="absolute bottom-8 left-8 border-l-4 border-brand pl-4">
                    <h3 className="font-display text-xl uppercase text-brand lg:text-2xl">{m.name}</h3>
                    <p className="mt-2 text-lg font-bold">{m.role}</p>
                  </div>

                  {/* Bio card revealed on hover / focus */}
                  <div className="pointer-events-none absolute inset-x-5 top-[18%] rounded-xl bg-brand p-7 text-black opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100">
                    <h3 className="font-display text-xl uppercase lg:text-2xl">{m.name}</h3>
                    <p className="mt-2 text-lg font-bold">{m.role}</p>
                    <p className="mt-5 leading-8">{m.bio}</p>
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
