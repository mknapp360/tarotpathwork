import SEO from '../components/SEO'
import React from "react";
import { Link } from 'react-router-dom'
import ShemAngelsCalculator from "../components/ShemAngelsCalculator.tsx";

export default function ShemAngels() {

  return (
    <>
      <SEO
        title="Tarot Pathwork"
        description="Psychic readings & spiritual teachings through a Kabbalistic lens."
        jsonLd={[{
          "@context":"https://schema.org",
          "@type":"WebSite",
          "name":"Tarot Pathwork",
          "url":"https://www.tarotpathwork.com"
        }]}
      />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* background image */}
        <img
          src="/BirthAngelsTiktok.png"
          alt="a painting of three angels"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      
        {/* optional overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      
        {/* centered text */}
        <h1 className="relative z-10 text-center text-4xl sm:text-5xl text-tpwhite font-display tracking-tight">
          Discover the Angels of Your Birth
        </h1>
      </section>

      <section>
        <div className="mx-auto bg-tpblue ">
          
          <p className="pt-4 text-lg  mx-auto max-w-7xl text-tpwhite">
            For centuries, mystics and sages have turned to the Shem HaMephorash—a sacred 72-fold name of God derived from three verses in the Book of Exodus—as a key to divine guidance and personal transformation. Each of these 72 names corresponds to an angelic intelligence: a spiritual force that oversees a specific aspect of human experience.
          </p>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-tpwhite">
            According to ancient Kabbalistic tradition, three of these angels are uniquely assigned to you at the moment of your birth. Together, they form a triad of spiritual guardians known as your Incarnation Angel, Morality Angel, and Soul Angel.
          </p>
          <ul className="mt-4 text-lg  mx-auto max-w-7xl text-tpwhite">
            <li className="mb-2"><strong>Your Guardian Angel (Incarnation Angel) –</strong> governs your external life path. It influences your destiny, personality, and purpose. It reflects your strengths, challenges, and the divine mission you were born to fulfill in the world.</li>
            <li className="mb-2"><strong>Your Morality Angel (Heart Angel) –</strong> resides in the inner chamber of your heart. It speaks to your conscience, values, and emotional instincts. This angel guides your choices, your sense of right and wrong, and your ability to form deep relationships.</li>
            <li className="mb-2"><strong>Your Soul Angel (Intellect Angel) –</strong> reflects your connection to the Divine Mind. It influences your higher intellect, intuition, spiritual insight, and capacity for wisdom. This angel assists you in aligning your thoughts with your higher self.</li>
          </ul>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-tpwhite">
           I've had to code this calculator myself by turning the information found in ancient grimoires and texts, into modern usable code. The calculator uses your birth date and time to reveal the three angels associated with your incarnation. By learning their names and meanings, you can begin a journey of alignment with your divine blueprint—unlocking deeper purpose, clearer intuition, and inner peace.
          </p>
        </div>
      </section>

        <section>
         <div className="mx-auto bg-tpblue ">
          <ShemAngelsCalculator />
         </div>
      </section>
      
    </>
  )
}
