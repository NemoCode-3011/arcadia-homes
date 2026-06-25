import { useNavigate } from "react-router-dom"
import house4 from "../../assets/house28.jpg"
import house5 from "../../assets/house30.jpg"
import house6  from "../../assets/house31.jpg"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import image1 from "../../assets/t-1.jpg"
import image2 from "../../assets/t-2.jpg"
import image3 from "../../assets/t-3.jpg"
import image4 from "../../assets/t-4.jpg"
import image5 from "../../assets/t-5.jpg"
import image6 from "../../assets/t-6.jpeg"

const AboutPage = () => {
  const navigate = useNavigate()

  const team = [
    {
      name: "Adeniyi Temilade Vivian",
      title: "Chief Executive Officer",
      image: image6,
      nationality: "🇳🇬",
      bio: "With over 15 years in luxury real estate, Vivian founded Arcadia Homes with a singular vision — to redefine what it means to live beautifully in Nigeria. Her relentless pursuit of excellence has shaped every property under the Arcadia name.",
      initials: "ATV",
    },
    {
      name: "Karim El-Amine",
      title: "Chief Financial Officer",
      image: image1,
      nationality: "🇱🇧",
      bio: "Karim brings deep expertise in real estate finance and investment, having managed property portfolios across Lagos, Beirut, and Dubai. He ensures Arcadia's growth is as solid as the homes we build.",
      initials: "KE",
    },
    {
      name: "Chukwuemeka Obi",
      title: "Chief Operations Officer",
      image: image5,
      nationality: "🇳🇬",
      bio: "Emeka oversees the day-to-day operations of Arcadia Homes, from property acquisition to agent management. His attention to detail and operational discipline keeps every deal running smoothly.",
      initials: "CO",
    },
    {
      name: "Rania Khalil",
      title: "Head of Design & Development",
      image: image2,
      nationality: "🇱🇧",
      bio: "Rania leads the design philosophy behind every Arcadia property. Trained in Beirut and London, she ensures that nature, light, and space are at the heart of every home we represent.",
      initials: "RK",
    },
    {
      name: "Folake Adeyemi",
      title: "Head of Client Relations",
      image: image4,
      nationality: "🇳🇬",
      bio: "Folake is the bridge between Arcadia and its clients. With a background in luxury hospitality, she has built a culture of warmth, trust, and white-glove service that clients remember long after the keys are handed over.",
      initials: "FA",
    },
    {
      name: "Ziad Mansour",
      title: "Head of Investments",
      image: image3,
      nationality: "🇱🇧",
      bio: "Ziad identifies high-value property investment opportunities across Nigeria's most prestigious locations. His market instincts have consistently delivered exceptional returns for Arcadia's investors.",
      initials: "ZM",
    },
  ]

  const values = [
    {
      icon: "🌿",
      title: "Nature First",
      description:
        "Every property we represent is chosen with nature in mind. We believe the best homes breathe — filled with light, greenery, and space.",
    },
    {
      icon: "🏛️",
      title: "Uncompromising Quality",
      description:
        "We do not list average. Every Arcadia property goes through a rigorous vetting process to ensure it meets our standard of excellence.",
    },
    {
      icon: "🤝",
      title: "Trust Above All",
      description:
        "Real estate is one of the biggest decisions of a lifetime. We take that seriously — with honesty, transparency, and integrity in every transaction.",
    },
    {
      icon: "💡",
      title: "Forward Thinking",
      description:
        "We are building the future of Nigerian real estate — one that is modern, sustainable, and designed for how people actually want to live.",
    },
  ]

  return (
    <ParallaxProvider>
      <div className="bg-arcadia-charcoal">
        {/* ── HERO ── */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Parallax speed={-10} className="absolute inset-0 w-full h-full">
            <img
              src={house4}
              alt="Arcadia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
          </Parallax>

          <div className="relative z-10 text-center px-6 space-y-4 mt-20">
            <p className="text-xs tracking-[0.4em] text-arcadia-moss uppercase">
              Our Story
            </p>
            <h1 className="text-5xl lg:text-6xl font-semibold text-arcadia-cream leading-tight">
              More Than <br />
              <span className="text-arcadia-leaf">A Home</span>
            </h1>
            <p className="text-arcadia-sand text-lg max-w-md mx-auto leading-relaxed">
              We are Arcadia Homes — built on the belief that where you live shapes who you become.
            </p>
          </div>
        </section>
        {/* ── OUR STORY ── */}
        <section className="bg-arcadia-cream py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                  How It Started
                </p>
                <h2 className="text-4xl font-semibold text-arcadia-charcoal leading-snug">
                  Born From a Belief That Nigerians Deserve Better
                </h2>
              </div>
              <p className="text-arcadia-bark leading-relaxed">
                Arcadia Homes was founded in 2015 by Vivian Adeniyi, a young woman who grew up watching her parents settle for less than they deserved in housing. She saw a country full of ambition, taste, and purchasing power — yet a real estate market that still treated buyers as afterthoughts.
              </p>
              <p className="text-arcadia-bark leading-relaxed">
                She set out to change that. Starting with a single listing in Victoria Island, Vivian built Arcadia from the ground up — hand-picking every property, personally vetting every agent, and obsessing over every client experience. The name Arcadia came from an ancient Greek ideal of a peaceful, beautiful sanctuary. That is what she wanted every client to feel when they found their home.
              </p>
              <p className="text-arcadia-bark leading-relaxed">
                Today, Arcadia Homes is one of Nigeria's most trusted luxury real estate brands, with properties across Lagos and Ibadan, a team of world-class professionals, and a reputation built entirely on results and relationships.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={house6}
                alt="Our story"
                className="w-full h-112.5 object-cover rounded-2xl"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-6 bg-arcadia-stone border border-arcadia-bark rounded-xl p-5 shadow-xl">
                <p className="text-3xl font-semibold text-arcadia-cream">10+</p>
                <p className="text-arcadia-sand text-sm mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>
        {/* ── MISSION ── */}
        <section className="relative py-24 px-6 overflow-hidden">
          <Parallax speed={-8} className="absolute inset-0">
            <img
              src={house4}
              alt="Mission"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-arcadia-charcoal/92" />
          </Parallax>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                Our Mission
              </p>
              <h2 className="text-4xl font-semibold text-arcadia-cream leading-snug">
                To Connect People With Spaces That Elevate Their Lives
              </h2>
            </div>
            <p className="text-arcadia-sand text-lg leading-relaxed max-w-2xl mx-auto">
              We exist to make the search for a premium home in Nigeria simple, trustworthy, and inspiring. Every listing, every agent, every interaction is guided by one question — does this serve our client's best life?
            </p>
            <div className="w-16 h-px bg-arcadia-moss mx-auto" />
            <p className="text-arcadia-sand/70 text-sm italic">
              "A home is not just where you live. It is where your life happens."
              <br />
              <span className="text-arcadia-moss not-italic mt-2 block">
                — Adeniyi Temilade Vivian, CEO
              </span>
            </p>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="bg-arcadia-cream py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                What We Stand For
              </p>
              <h2 className="text-4xl font-semibold text-arcadia-charcoal">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-white border border-arcadia-sand/30 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="text-arcadia-charcoal font-semibold text-lg">
                    {value.title}
                  </h3>
                  <p className="text-arcadia-bark text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="bg-arcadia-charcoal py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                The People Behind Arcadia
              </p>
              <h2 className="text-4xl font-semibold text-arcadia-cream">
                Meet Our Core Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-arcadia-stone border border-arcadia-bark rounded-2xl p-6 space-y-4 hover:border-arcadia-moss/40 transition-colors"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    {/* Image or initials fallback */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-arcadia-moss/30">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-arcadia-moss/20 flex items-center justify-center text-arcadia-moss font-bold text-lg">
                          {member.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-arcadia-cream font-semibold leading-tight">
                          {member.name}
                        </p>
                        <span>{member.nationality}</span>
                      </div>
                      <p className="text-arcadia-moss text-xs mt-0.5">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <hr className="border-arcadia-bark" />
                  <p className="text-arcadia-sand text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-arcadia-cream py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "124+", label: "Properties Listed" },
                { value: "40+", label: "Properties Sold" },
                { value: "30+", label: "Happy Renters" },
                { value: "10+", label: "Expert Agents" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <h3 className="text-4xl font-semibold text-arcadia-charcoal">
                    {stat.value}
                  </h3>
                  <p className="text-arcadia-moss text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-28 px-6 overflow-hidden">
          <Parallax speed={-8} className="absolute inset-0">
            <img
              src={house4}
              alt="CTA"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </Parallax>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <p className="text-xs tracking-widest text-arcadia-moss uppercase">
              Begin Your Journey
            </p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-arcadia-cream leading-tight">
              Ready to Find Your Sanctuary?
            </h2>
            <p className="text-arcadia-sand leading-relaxed">
              Let Arcadia guide you home. Browse our curated listings or speak directly with one of our expert agents today.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate("/listings")}
                className="px-8 py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
              >
                Explore Properties
              </button>
              <button
                onClick={() => navigate("/contact-us")}
                className="px-8 py-3 rounded-lg border border-arcadia-cream text-arcadia-cream font-medium hover:bg-arcadia-cream/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

      </div>
    </ParallaxProvider>
  )
}
export default AboutPage