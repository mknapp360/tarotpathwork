import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

export default function Home() {

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
      <section className="relative h-[100svh] w-full overflow-hidden">
        {/* background image */}
        <img
          src="/BirthAngelsTiktok.png"
          alt="a painting of three angels"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* gradient overlay for readability */}
      </section>

      <section>
        <div className="mx-auto bg-tpblue ">
          <h1 className="text-center py-8 text-4xl sm:text-5xl text-white font-display tracking-tight">
            Discover the Angels of Your Birth
          </h1>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
            For centuries, mystics and sages have turned to the Shem HaMephorash—a sacred 72-fold name of God derived from three verses in the Book of Exodus—as a key to divine guidance and personal transformation. Each of these 72 names corresponds to an angelic intelligence: a spiritual force that oversees a specific aspect of human experience.
          </p>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
            According to ancient Kabbalistic tradition, three of these angels are uniquely assigned to you at the moment of your birth. Together, they form a triad of spiritual guardians known as your Incarnation Angel, Morality Angel, and Soul Angel.
          </p>
          <ul className="mt-4 ml-8 mr-8 text-lg text-tpblack">
            <li className="mb-2"><strong>Your Guardian Angel (Incarnation Angel) –</strong> governs your external life path. It influences your destiny, personality, and purpose. It reflects your strengths, challenges, and the divine mission you were born to fulfill in the world.</li>
            <li className="mb-2"><strong>Your Morality Angel (Heart Angel) –</strong> resides in the inner chamber of your heart. It speaks to your conscience, values, and emotional instincts. This angel guides your choices, your sense of right and wrong, and your ability to form deep relationships.</li>
            <li className="mb-2"><strong>Your Soul Angel (Intellect Angel) –</strong> reflects your connection to the Divine Mind. It influences your higher intellect, intuition, spiritual insight, and capacity for wisdom. This angel assists you in aligning your thoughts with your higher self.</li>
          </ul>
          <p className="mt-4 text-lg  mx-auto max-w-7xl text-white">
           I've had to code this calculator myself by turning the information found in ancient grimoires and texts, into modern usable code. The calculator uses your birth date and time to reveal the three angels associated with your incarnation. By learning their names and meanings, you can begin a journey of alignment with your divine blueprint—unlocking deeper purpose, clearer intuition, and inner peace.
          </p>
        </div>
      </section>

        <section>
            <div className="mx-auto bg-tpblue ">
                <div class="form-container">
    <div class="form-row">
      <form id="angel-form">
        <label for="birthdate">Date of Birth:</label><br />
        <input type="date" id="birthdate" required><br /><br />
        <label for="birthtime">Time of Birth:</label><br />
        <input type="time" id="birthtime" required><br /><br />
        <button type="submit">Calculate</button>
      </form>
    </div>
  </div>
 
  <div id="result" style="margin-top: 30px;"></div>

  <!-- html2canvas script -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  <script>
    // Your full shemAngels array goes here (truncated here for clarity)
    const shemAngels = [
    {
    "number": 1,
    "name": "Vehuiah",
    "guardian_dates": [
      "March 21",
      "March 22",
      "March 23",
      "March 24",
      "March 25"
    ],
    "morality_dates": [
      "March 20",
      "May 31",
      "August 11",
      "October 22",
      "January 02"
    ],
    "soul_time": [
      "00:00 - 00:19"
    ],
    "description": "The person born under this influence has a skillful nature, they are blessed with great wisdom, and capable of undertaking difficult tasks. Vehuiah also gives you the ability to obtain self esteem and strengthen your will."
  },
  {
    "number": 2,
    "name": "Jeliel",
    "guardian_dates": [
      "March 26",
      "March 27",
      "March 28",
      "March 29",
      "March 30"
    ],
    "morality_dates": [
      "March 21",
      "June 01",
      "August 12",
      "October 23",
      "January 03"
    ],
    "soul_time": [
      "00:20 - 00:39"
    ],
    "description": "The person born under this influence has a cheerful spirit, they are gentle and are often find it easy to be intimate with those they care about. Jelial can help attract love, bring calm among arguing lovers, and ensure fidelity."
  },
  {
    "number": 3,
    "name": "Sitael",
    "guardian_dates": [
      "March 31",
      "April 01",
      "April 02",
      "April 03",
      "April 04"
    ],
    "morality_dates": [
      "March 22",
      "June 02",
      "August 13",
      "October 24",
      "January 04"
    ],
    "soul_time": [
      "00:40 - 00:59"
    ],
    "description": "The person born under this influence love the truth and tends to keep their word, while also taking pleasure in assisting other. Call on Sitael to protect against adversity, to discover the truth, stop hipocrisy and to find employment."
  },
  {
    "number": 4,
    "name": "Elemiah",
    "guardian_dates": [
      "April 05",
      "April 06",
      "April 07",
      "April 08",
      "April 09",
      "April 10"
    ],
    "morality_dates": [
      "March 23",
      "June 03",
      "August 14",
      "October 25",
      "January 05"
    ],
    "soul_time": [
      "01:00 - 01:19"
    ],
    "description": "The person born under this influence is often industrious, happy in their enterprises, and has a passion for travel. Call upon Elemiah if you need assistance with stopping mental torment, discover new methods of accomplishing things, and for safe travel."
  },
  {
    "number": 5,
    "name": "Mahasiah",
    "guardian_dates": [
      "April 11",
      "April 12",
      "April 13",
      "April 14",
      "April 15"
    ],
    "morality_dates": [
      "March 24",
      "June 04",
      "August 15",
      "October 26",
      "January 06"
    ],
    "soul_time": [
      "01:20 - 01:39"
    ],
    "description": "The person born under this influence has a tendency to learn things easily (for topic they are interested in), have a very likable character and appearance, and favors honest pleasures.  Call on Mahasiah for assistance with the power to bring about peace, to learn like a genius, and assistance in overcoming disease"
  },
  {
    "number": 6,
    "name": "Lelahel",
    "guardian_dates": [
      "April 16",
      "April 17",
      "April 18",
      "April 19",
      "April 20"
    ],
    "morality_dates": [
      "March 25",
      "June 05",
      "August 16",
      "October 27",
      "January 07"
    ],
    "soul_time": [
      "01:40 - 01:59"
    ],
    "description": "The person born under this influence loves to talk with others, and often aquires popularity and even fame through their talent and actions. Call upon Lelahel for assistance in inspiritng love in another, to attract fame through your talents, increase your luck in relation to your ambitions, and for artistic inspiration."
  },
  {
    "number": 7,
    "name": "Achaiah",
    "guardian_dates": [
      "April 21",
      "April 22",
      "April 23",
      "April 24",
      "April 25"
    ],
    "morality_dates": [
      "March 26",
      "June 06",
      "August 17",
      "October 28",
      "January 08"
    ],
    "soul_time": [
      "02:00 - 02:19"
    ],
    "description": "The person born under this influence loves to learn about useful subjects, will enjoy completing the most difficult tasks, and often discovers useful endeavors with artistic pursuits. Call upon Achaiah for assistance with making your work or business popular, and to turn enemies into friends."
  },
  {
    "number": 8,
    "name": "Cahetel",
    "guardian_dates": [
      "April 26",
      "April 27",
      "April 28",
      "April 29",
      "April 30"
    ],
    "morality_dates": [
      "March 27",
      "June 07",
      "August 18",
      "October 29",
      "January 09"
    ],
    "soul_time": [
      "02:20 - 02:39"
    ],
    "description": "The person born under this influence loves to work, enjoys agriculture, the countryside, hunting, and is often very active in business. Call upon Cahetel to drive away Evil, create a strong voice for yourself, and to control growth in Nature."
  },
  {
    "number": 9,
    "name": "Haziel",
    "guardian_dates": [
      "May 01",
      "May 02",
      "May 03",
      "May 04",
      "May 05"
    ],
    "morality_dates": [
      "March 28",
      "June 08",
      "August 19",
      "October 30",
      "January 10"
    ],
    "soul_time": [
      "02:40 - 02:59"
    ],
    "description": "The person born under this influence are sincere in their promises, and are often very forgiving. Call upon Haziel for assistance in obtaining friendship with those of influence, make somebody fulfill a promise, and for protection against hidden enemies."
  },
  {
    "number": 10,
    "name": "Aladiah",
    "guardian_dates": [
      "May 06",
      "May 07",
      "May 08",
      "May 09",
      "May 10"
    ],
    "morality_dates": [
      "March 29",
      "June 09",
      "August 20",
      "October 31",
      "January 11"
    ],
    "soul_time": [
      "03:00 - 03:19"
    ],
    "description": "The person born under this influence often enjoys good health, enjoys their enterprises, are esteemed by those who know them, and are often seen frequenting sophisticated societies. Call upon Aladiah to assist in healing disease, overcome negativity, and to understand science."
  },
  {
    "number": 11,
    "name": "Lauviah",
    "guardian_dates": [
      "May 11",
      "May 12",
      "May 13",
      "May 14",
      "May 15"
    ],
    "morality_dates": [
      "March 30",
      "June 10",
      "August 21",
      "November 01",
      "January 12"
    ],
    "soul_time": [
      "03:20 - 03:39"
    ],
    "description": "The person born under this influence can often obtain victory in their pursuits, influences great people, the wise and those who are famous. Call upon Lauviah for assistance in finding true followers, overcome enemies, find fame through talent, and influence those who are famous."
  },
  {
    "number": 12,
    "name": "Hahaiah",
    "guardian_dates": [
      "May 16",
      "May 17",
      "May 18",
      "May 19",
      "May 20"
    ],
    "morality_dates": [
      "March 31",
      "June 11",
      "August 22",
      "November 02",
      "January 13"
    ],
    "soul_time": [
      "03:40 - 03:59"
    ],
    "description": "The person born under this influence is often affable, and pleasant to be around. call upon Hahaiah to overcome adversity, turn enemies into friends, and to find mystical answers in dreams."
  },
  {
    "number": 13,
    "name": "Iezalel",
    "guardian_dates": [
      "May 21",
      "May 22",
      "May 23",
      "May 24",
      "May 25"
    ],
    "morality_dates": [
      "April 01",
      "June 12",
      "August 23",
      "November 03",
      "January 14"
    ],
    "soul_time": [
      "04:00 - 04:19"
    ],
    "description": "The person born under this influence often learns with ease, has happy memories and distiguishes themselves through speech. Call upon Iezalel for inspiration in writing and the arts, to reunite lovers, pass exams and tests, or to learn the plans of an enemy."
  },
  {
    "number": 14,
    "name": "Mebahel",
    "guardian_dates": [
      "May 26",
      "May 27",
      "May 28",
      "May 29",
      "May 30",
      "May 31"
    ],
    "morality_dates": [
      "April 02",
      "June 13",
      "August 24",
      "November 04",
      "January 15"
    ],
    "soul_time": [
      "04:20 - 04:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 15,
    "name": "Hariel",
    "guardian_dates": [
      "June 01",
      "June 02",
      "June 03",
      "June 04",
      "June 05"
    ],
    "morality_dates": [
      "April 03",
      "June 14",
      "August 25",
      "November 05",
      "January 16"
    ],
    "soul_time": [
      "04:40 - 04:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 16,
    "name": "Hakamiah",
    "guardian_dates": [
      "June 06",
      "June 07",
      "June 08",
      "June 09",
      "June 10"
    ],
    "morality_dates": [
      "April 04",
      "June 15",
      "August 26",
      "November 06",
      "January 17"
    ],
    "soul_time": [
      "05:00 - 05:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 17,
    "name": "Lauviah",
    "guardian_dates": [
      "June 11",
      "June 12",
      "June 13",
      "June 14",
      "June 15"
    ],
    "morality_dates": [
      "April 05",
      "June 16",
      "August 27",
      "November 07",
      "January 18"
    ],
    "soul_time": [
      "05:20 - 05:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 18,
    "name": "Caliel",
    "guardian_dates": [
      "June 16",
      "June 17",
      "June 18",
      "June 19",
      "June 20"
    ],
    "morality_dates": [
      "April 06",
      "June 17",
      "August 28",
      "November 08",
      "January 19"
    ],
    "soul_time": [
      "05:40 - 05:59"
    ],
    "description": "The person born under this influence will be just and possess integrity, love truth, and will distiguish themselves through these avenues. Caliel also provides you wil the power to avoid and confuse enemies, and become less visible when you want to be."
  },
  {
    "number": 19,
    "name": "Leuviah",
    "guardian_dates": [
      "June 21",
      "June 22",
      "June 23",
      "June 24",
      "June 25",
      "June 26"
    ],
    "morality_dates": [
      "April 07",
      "June 18",
      "August 29",
      "November 09",
      "January 20"
    ],
    "soul_time": [
      "06:00 - 06:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 20,
    "name": "Pahaliah",
    "guardian_dates": [
      "June 27",
      "June 28",
      "June 29",
      "June 30",
      "July 01"
    ],
    "morality_dates": [
      "April 08",
      "June 19",
      "August 30",
      "November 10",
      "January 21"
    ],
    "soul_time": [
      "06:20 - 06:39"
    ],
    "description": "The person born under this influence often gravitate toward religious activity, theology, and morality. Pahaliah can also help those who call upon him to find balance in their life, find their spiritual path, and discover joy."
  },
  {
    "number": 21,
    "name": "Nelchael",
    "guardian_dates": [
      "July 02",
      "July 03",
      "July 04",
      "July 05",
      "July 06"
    ],
    "morality_dates": [
      "April 09",
      "June 20",
      "August 31",
      "November 11",
      "January 22"
    ],
    "soul_time": [
      "06:40 - 06:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 22,
    "name": "Yeiayel",
    "guardian_dates": [
      "July 07",
      "July 08",
      "July 09",
      "July 10",
      "July 11"
    ],
    "morality_dates": [
      "April 10",
      "June 21",
      "September 01",
      "November 12",
      "January 23"
    ],
    "soul_time": [
      "07:00 - 07:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 23,
    "name": "Melahel",
    "guardian_dates": [
      "July 12",
      "July 13",
      "July 14",
      "July 15",
      "July 16"
    ],
    "morality_dates": [
      "April 11",
      "June 22",
      "September 02",
      "November 13",
      "January 24"
    ],
    "soul_time": [
      "07:20 - 07:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 24,
    "name": "Haheuiah",
    "guardian_dates": [
      "July 17",
      "July 18",
      "July 19",
      "July 20",
      "July 21"
    ],
    "morality_dates": [
      "April 12",
      "June 23",
      "September 03",
      "November 14",
      "January 25"
    ],
    "soul_time": [
      "07:40 - 07:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 25,
    "name": "Nith-Haiah",
    "guardian_dates": [
      "July 22",
      "July 23",
      "July 24",
      "July 25",
      "July 26",
      "July 27"
    ],
    "morality_dates": [
      "April 13",
      "June 24",
      "September 04",
      "November 15",
      "January 26"
    ],
    "soul_time": [
      "08:00 - 08:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 26,
    "name": "Haaiah",
    "guardian_dates": [
      
      "July 28",
      "July 29",
      "July 30",
      "July 31",
      "August 01"
    ],
    "morality_dates": [
      "April 14",
      "June 25",
      "September 05",
      "November 16",
      "January 27"
    ],
    "soul_time": [
      "08:20 - 08:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 27,
    "name": "Yeratel",
    "guardian_dates": [
      "August 02",
      "August 03",
      "August 04",
      "August 05",
      "August 06"
    ],
    "morality_dates": [
      "April 15",
      "June 26",
      "September 06",
      "November 17",
      "January 28"
    ],
    "soul_time": [
      "08:40 - 08:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 28,
    "name": "Seheiah",
    "guardian_dates": [
      "August 07",
      "August 08",
      "August 09",
      "August 10",
      "August 11"
    ],
    "morality_dates": [
      "April 16",
      "June 27",
      "September 07",
      "November 18",
      "January 29"
    ],
    "soul_time": [
      "09:00 - 09:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 29,
    "name": "Reiyel",
    "guardian_dates": [
      "August 12",
      "August 13",
      "August 14",
      "August 15",
      "August 16",
      "August 17"
    ],
    "morality_dates": [
      "April 17",
      "June 28",
      "September 08",
      "November 19",
      "January 30"
    ],
    "soul_time": [
      "09:20 - 09:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 30,
    "name": "Omael",
    "guardian_dates": [
      "August 18",
      "August 19",
      "August 20",
      "August 21",
      "August 22"
    ],
    "morality_dates": [
      "April 18",
      "June 29",
      "September 09",
      "November 20",
      "January 31"
    ],
    "soul_time": [
      "09:40 - 09:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 31,
    "name": "Lecabel",
    "guardian_dates": [
      "August 23",
      "August 24",
      "August 25",
      "August 26",
      "August 27"
    ],
    "morality_dates": [
      "April 19",
      "June 30",
      "September 10",
      "November 21",
      "February 01"
    ],
    "soul_time": [
      "10:00 - 10:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 32,
    "name": "Vasariah",
    "guardian_dates": [
      "August 28",
      "August 29",
      "August 30",
      "August 31",
      "September 01"
    ],
    "morality_dates": [
      "April 20",
      "July 01",
      "September 11",
      "November 22",
      "February 02"
    ],
    "soul_time": [
      "10:20 - 10:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 33,
    "name": "Yehuiah",
    "guardian_dates": [
      "September 02",
      "September 03",
      "September 04",
      "September 05",
      "September 06"
    ],
    "morality_dates": [
      "April 21",
      "July 02",
      "September 12",
      "November 23",
      "February 03"
    ],
    "soul_time": [
      "10:40 - 10:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 34,
    "name": "Lehahiah",
    "guardian_dates": [
      "September 07",
      "September 08",
      "September 09",
      "September 10",
      "September 11"
    ],
    "morality_dates": [
      "April 22",
      "July 03",
      "September 13",
      "November 24",
      "February 04"
    ],
    "soul_time": [
      "11:00 - 11:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 35,
    "name": "Chavakiah",
    "guardian_dates": [
      "September 12",
      "September 13",
      "September 14",
      "September 15",
      "September 16",
      "September 17"
    ],
    "morality_dates": [
      "April 23",
      "July 04",
      "September 14",
      "November 25",
      "February 05"
    ],
    "soul_time": [
      "11:20 - 11:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 36,
    "name": "Menadel",
    "guardian_dates": [
      "September 18",
      "September 19",
      "September 20",
      "September 21",
      "September 22"
    ],
    "morality_dates": [
      "April 24",
      "July 05",
      "September 15",
      "November 26",
      "February 06"
    ],
    "soul_time": [
      "11:40 - 11:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 37,
    "name": "Aniel",
    "guardian_dates": [
      "September 23",
      "September 24",
      "September 25",
      "September 26",
      "September 27"
    ],
    "morality_dates": [
      "April 25",
      "July 06",
      "September 16",
      "November 27",
      "February 07"
    ],
    "soul_time": [
      "12:00 - 12:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 38,
    "name": "Haamiah",
    "guardian_dates": [
      "September 28",
      "September 29",
      "September 30",
      "October 01",
      "October 02"
    ],
    "morality_dates": [
      "April 26",
      "July 07",
      "September 17",
      "November 28",
      "February 08"
    ],
    "soul_time": [
      "12:20 - 12:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 39,
    "name": "Rehael",
    "guardian_dates": [
      "October 03",
      "October 04",
      "October 05",
      "October 06",
      "October 07"
    ],
    "morality_dates": [
      "April 27",
      "July 08",
      "September 18",
      "November 29",
      "February 09"
    ],
    "soul_time": [
      "12:40 - 12:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 40,
    "name": "Ieiazel",
    "guardian_dates": [
      "October 08",
      "October 09",
      "October 10",
      "October 11",
      "October 12"
    ],
    "morality_dates": [
      "April 28",
      "July 09",
      "September 19",
      "November 30",
      "February 10"
    ],
    "soul_time": [
      "13:00 - 13:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 41,
    "name": "Hahahel",
    "guardian_dates": [
      "October 13",
      "October 14",
      "October 15",
      "October 16",
      "October 17"
    ],
    "morality_dates": [
      "April 29",
      "July 10",
      "September 20",
      "December 01",
      "February 11"
    ],
    "soul_time": [
      "13:20 - 13:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 42,
    "name": "Mikael",
    "guardian_dates": [
      "October 18",
      "October 19",
      "October 20",
      "October 21",
      "October 22"
    ],
    "morality_dates": [
      "April 30",
      "July 11",
      "September 21",
      "December 02",
      "February 12"
    ],
    "soul_time": [
      "13:40 - 13:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 43,
    "name": "Veuliah",
    "guardian_dates": [
      "October 23",
      "October 24",
      "October 25",
      "October 26",
      "October 27"
    ],
    "morality_dates": [
      "May 01",
      "July 12",
      "September 22",
      "December 03",
      "February 13"
    ],
    "soul_time": [
      "14:00 - 14:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 44,
    "name": "Yelahiah",
    "guardian_dates": [
      "October 28",
      "October 29",
      "October 30",
      "October 31",
      "November 01"
    ],
    "morality_dates": [
      "May 02",
      "July 13",
      "September 23",
      "December 04",
      "February 14"
    ],
    "soul_time": [
      "14:20 - 14:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 45,
    "name": "Sealiah",
    "guardian_dates": [
      "November 02",
      "November 03",
      "November 04",
      "November 05",
      "November 06"
    ],
    "morality_dates": [
      "May 03",
      "July 14",
      "September 24",
      "December 05",
      "February 15"
    ],
    "soul_time": [
      "14:40 - 14:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 46,
    "name": "Ariel",
    "guardian_dates": [
      "November 07",
      "November 08",
      "November 09",
      "November 10",
      "November 11"
    ],
    "morality_dates": [
      "May 04",
      "July 15",
      "September 25",
      "December 06",
      "February 16"
    ],
    "soul_time": [
      "15:00 - 15:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 47,
    "name": "Asaliah",
    "guardian_dates": [
      "November 12",
      "November 13",
      "November 14",
      "November 15",
      "November 16",
      "November 17"
    ],
    "morality_dates": [
      "May 05",
      "July 16",
      "September 26",
      "December 07",
      "February 17"
    ],
    "soul_time": [
      "15:20 - 15:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 48,
    "name": "Mihael",
    "guardian_dates": [
      "November 18",
      "November 19",
      "November 20",
      "November 21",
      "November 22"
    ],
    "morality_dates": [
      "May 06",
      "July 17",
      "September 27",
      "December 08",
      "February 18"
    ],
    "soul_time": [
      "15:40 - 15:59"
    ],
    "description": "The person born under this influence is often passionate about love, will enjoy walking and strolling through their town, and finds pleasure in daily life when others do not. Call on Mihael for assistance in creating peace in a marriage, and to bring a current relationship to a new physical level."
  },
  {
    "number": 49,
    "name": "Vehuel",
    "guardian_dates": [
      "November 23",
      "November 24",
      "November 25",
      "November 26",
      "November 27"
    ],
    "morality_dates": [
      "May 07",
      "July 18",
      "September 28",
      "December 09",
      "February 19"
    ],
    "soul_time": [
      "16:00 - 16:19"
    ],
    "description": "Elevation, inspiration, divine connection"
  },
  {
    "number": 50,
    "name": "Daniel",
    "guardian_dates": [
      "November 28",
      "November 29",
      "November 30",
      "December 01",
      "December 02"
    ],
    "morality_dates": [
      "May 08",
      "July 19",
      "September 29",
      "December 10",
      "February 20"
    ],
    "soul_time": [
      "16:20 - 16:39"
    ],
    "description": "The person born under this influence will be industrious and active in business, they often love literature and distiguish themselves through their eloquence. Call upon Daniel for assistance with legal decisions, assist in making a good decision, and to get a message out to the world. "
  },
  {
    "number": 51,
    "name": "Hahasiah",
    "guardian_dates": [
      "December 03",
      "December 04",
      "December 05",
      "December 06",
      "December 07"
    ],
    "morality_dates": [
      "May 09",
      "July 20",
      "September 30",
      "December 11",
      "February 21"
    ],
    "soul_time": [
      "16:40 - 16:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 52,
    "name": "Imamiah",
    "guardian_dates": [
      "December 08",
      "December 09",
      "December 10",
      "December 11",
      "December 12"
    ],
    "morality_dates": [
      "May 10",
      "July 21",
      "October 01",
      "December 12",
      "February 22"
    ],
    "soul_time": [
      "17:00 - 17:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 53,
    "name": "Nanael",
    "guardian_dates": [
      "December 13",
      "December 14",
      "December 15",
      "December 16",
      "December 17"
    ],
    "morality_dates": [
      "May 11",
      "July 22",
      "October 02",
      "December 13",
      "February 23"
    ],
    "soul_time": [
      "17:20 - 17:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 54,
    "name": "Nithael",
    "guardian_dates": [
      "December 18",
      "December 19",
      "December 20",
      "December 21"
    ],
    "morality_dates": [
      "May 12",
      "July 23",
      "October 03",
      "December 14",
      "February 24"
    ],
    "soul_time": [
      "17:40 - 17:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 55,
    "name": "Mebahiah",
    "guardian_dates": [
      "December 22",
      "December 23",
      "December 24",
      "December 25",
      "December 26"
    ],
    "morality_dates": [
      "May 13",
      "July 24",
      "October 04",
      "December 15",
      "February 25"
    ],
    "soul_time": [
      "18:00 - 18:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 56,
    "name": "Poyel",
    "guardian_dates": [
      "December 27",
      "December 28",
      "December 29",
      "December 30"
    ],
    "morality_dates": [
      "May 14",
      "July 25",
      "October 05",
      "December 16",
      "February 26"
    ],
    "soul_time": [
      "18:20 - 18:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 57,
    "name": "Nemamiah",
    "guardian_dates": [
      "December 31",
      "January 01",
      "January 02",
      "January 03",
      "January 04"
    ],
    "morality_dates": [
      "May 15",
      "July 26",
      "October 06",
      "December 17",
      "February 27"
    ],
    "soul_time": [
      "18:40 - 18:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 58,
    "name": "Yeialel",
    "guardian_dates": [
      "January 05",
      "January 06",
      "January 07",
      "January 08",
      "January 09"
    ],
    "morality_dates": [
      "May 16",
      "July 27",
      "October 07",
      "December 18",
      "February 28",
      "February 29"
    ],
    "soul_time": [
      "19:00 - 19:19"
    ],
    "description": "Mental clarity, emotional balance"
  },
  {
    "number": 59,
    "name": "Harahel",
    "guardian_dates": [
      "January 10",
      "January 11",
      "January 12",
      "January 13",
      "January 14"
    ],
    "morality_dates": [
      "May 17",
      "July 28",
      "October 08",
      "December 19",
      "March 01"
    ],
    "soul_time": [
      "19:20 - 19:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 60,
    "name": "Mitzrael",
    "guardian_dates": [
      "January 15",
      "January 16",
      "January 17",
      "January 18",
      "January 19"
    ],
    "morality_dates": [
      "May 18",
      "July 29",
      "October 09",
      "December 20",
      "March 02"
    ],
    "soul_time": [
      "19:40 - 19:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 61,
    "name": "Umabel",
    "guardian_dates": [
      "January 20",
      "January 21",
      "January 22",
      "January 23",
      "January 24"
    ],
    "morality_dates": [
      "May 19",
      "July 30",
      "October 10",
      "December 21",
      "March 03"
    ],
    "soul_time": [
      "20:00 - 20:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 62,
    "name": "Iah-hel",
    "guardian_dates": [
      "January 25",
      "January 26",
      "January 27",
      "January 28",
      "January 29",
      "January 30"
    ],
    "morality_dates": [
      "May 20",
      "July 31",
      "October 11",
      "December 22",
      "March 04"
    ],
    "soul_time": [
      "20:20 - 20:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 63,
    "name": "Anauel",
    "guardian_dates": [
      "January 31",
      "February 01",
      "February 02",
      "February 03",
      "February 04"
    
    ],
    "morality_dates": [
      "May 21",
      "August 01",
      "October 12",
      "December 23",
      "March 05"
    ],
    "soul_time": [
      "20:40 - 20:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 64,
    "name": "Mehiel",
    "guardian_dates": [
      "February 05",
      "February 06",
      "February 07",
      "February 08"
    ],
    "morality_dates": [
      "May 22",
      "August 02",
      "October 13",
      "December 24",
      "March 06"
    ],
    "soul_time": [
      "21:00 - 21:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 65,
    "name": "Damabiah",
    "guardian_dates": [
      "February 09",
      "February 10",
      "February 11",
      "February 12",
      "February 13"
    ],
    "morality_dates": [
      "May 23",
      "August 03",
      "October 14",
      "December 25",
      "March 07"
    ],
    "soul_time": [
      "21:20 - 21:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 66,
    "name": "Manakel",
    "guardian_dates": [
      "February 14",
      "February 15",
      "February 16",
      "February 17",
      "February 18"
    ],
    "morality_dates": [
      "May 24",
      "August 04",
      "October 15",
      "December 26",
      "March 08"
    ],
    "soul_time": [
      "21:40 - 21:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 67,
    "name": "Eyael",
    "guardian_dates": [
      "February 19",
      "February 20",
      "February 21",
      "February 22",
      "February 23"
    ],
    "morality_dates": [
      "May 25",
      "August 05",
      "October 16",
      "December 27",
      "March 09"
    ],
    "soul_time": [
      "22:00 - 22:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 68,
    "name": "Habuhiah",
    "guardian_dates": [
      "February 24",
      "February 25",
      "February 26",
      "February 27",
      "February 28",
      "February 29"
    ],
    "morality_dates": [
      "May 26",
      "August 06",
      "October 17",
      "December 28",
      "March 10"
    ],
    "soul_time": [
      "22:20 - 22:39"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 69,
    "name": "Rochel",
    "guardian_dates": [
      "March 01",
      "March 02",
      "March 03",
      "March 04",
      "March 05"
    ],
    "morality_dates": [
      "May 27",
      "August 07",
      "October 18",
      "December 29",
      "March 11"
    ],
    "soul_time": [
      "22:40 - 22:59"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 70,
    "name": "Jabamiah",
    "guardian_dates": [
      "March 06",
      "March 07",
      "March 08",
      "March 09",
      "March 10"
    ],
    "morality_dates": [
      "May 28",
      "August 08",
      "October 19",
      "December 30",
      "March 12"
    ],
    "soul_time": [
      "23:00 - 23:19"
    ],
    "description": "Placeholder description"
  },
  {
    "number": 71,
    "name": "Haiaiel",
    "guardian_dates": [
      "March 11",
      "March 12",
      "March 13",
      "March 14",
      "March 15"
    ],
    "morality_dates": [
      "May 29",
      "August 09",
      "October 20",
      "December 31",
      "March 13"
    ],
    "soul_time": [
      "23:20 - 23:39"
    ],
    "description": "The person born under this influence will have a lot of energy, they will love the military and be distinguished for bravery, talent and actions. Call upon Haiaiel to repel curses, gain control through magic, obtain energy when you feel drained, and be brave with your talents."
  },
  {
    "number": 72,
    "name": "Mumiah",
    "guardian_dates": [
      "March 16",
      "March 17",
      "March 18",
      "March 19",
      "March 20"
    ],
    "morality_dates": [
      "May 30",
      "August 10",
      "October 21",
      "January 01",
      "March 14"
    ],
    "soul_time": [
      "23:40 - 23:59"
    ],
    "description": "Placeholder description"
  }
    ];
       while (shemAngels.length < 72) {
      const baseAngel = shemAngels[shemAngels.length % 5];
      shemAngels.push({
        ...baseAngel,
        number: shemAngels.length + 1,
        name: `Angel${shemAngels.length + 1}`,
        description: `Angel ${shemAngels.length + 1} brings guidance and protection to those born under its influence.`
      });
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "long", day: "2-digit" });
    }

    function getGuardianAngel(birthDateStr) {
      const formattedDate = formatDate(birthDateStr);
      return shemAngels.find(angel => angel.guardian_dates.includes(formattedDate)) || shemAngels[0];
    }

    function getMoralityAngel(birthDateStr) {
      const formattedDate = formatDate(birthDateStr);
      return shemAngels.find(angel => angel.morality_dates.includes(formattedDate)) || shemAngels[1];
    }

    function getSoulAngel(birthDateStr, birthTimeStr) {
      const timeParts = birthTimeStr.split(":");
      const hour = parseInt(timeParts[0], 10);
      const minute = parseInt(timeParts[1], 10);
      const totalMinutes = hour * 60 + minute;
      const index = Math.floor(totalMinutes / 20);  // 72 angels, 20 minutes each
      return shemAngels[index % shemAngels.length];
    }

    function calculateShemAngels(birthDateStr, birthTimeStr) {
      const guardian = getGuardianAngel(birthDateStr);
      const morality = getMoralityAngel(birthDateStr);
      const soul = getSoulAngel(birthDateStr, birthTimeStr);

      return {
        guardian,
        morality,
        soul
      };
    }

    function shareOnFacebook() {
      const resultArea = document.getElementById("angel-results");
      if (!resultArea) {
        alert("Please calculate your angels first!");
        return;
      }

      // Simple, direct share text
      const shareText = "Discover the 3 guardian angels of your birth like I just did. Its a free calculator, find out here: https://tarotpathwork.com/shem-angels";

      // Facebook share with the specific URL and text
      const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://tarotpathwork.com/shem-angels")}&quote=${encodeURIComponent(shareText)}`;
      
      // Open Facebook share dialog
      window.open(fbShareUrl, 'facebook-share-dialog', 'width=626,height=436');
    }

    function downloadAsImage() {
      const resultArea = document.getElementById("angel-results");
      if (!resultArea) {
        alert("Please calculate your angels first!");
        return;
      }

      html2canvas(resultArea, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: '#fdfcf9'
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "my-shem-angels.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }).catch(error => {
        console.error("Error generating image:", error);
        alert("There was an error generating the image. Please try again.");
      });
    }

    window.addEventListener("DOMContentLoaded", function () {
      document.getElementById("angel-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const birthDate = document.getElementById("birthdate").value;
        const birthTime = document.getElementById("birthtime").value;
        const resultDiv = document.getElementById("result");

        if (!birthDate || !birthTime) {
          alert("Please enter both birth date and time.");
          return;
        }

        const { guardian, morality, soul } = calculateShemAngels(birthDate, birthTime);

        const backgroundImages = {
          "Your Guardian Angel": "https://static.wixstatic.com/media/f66830_3b7c47c4c1ae49d58a22406e85b82147~mv2.png",
          "Your Angel of Morality": "https://static.wixstatic.com/media/f66830_fa7c2f94bf46485192068ddee62f3aa9~mv2.png",
          "Angel of Your Soul": "https://static.wixstatic.com/media/f66830_87d62e057d4a436ea795985b508327c8~mv2.png"
        };

        const output = `
          <div id="angel-results">
            <h3 style="font-family: Georgia, serif; margin-bottom: 20px;">Your 3 Birth Angels of the Shem HaMephorash</h3>
            <div style="display: flex; flex-direction: column; gap: 30px;">
              ${[
                ["Your Guardian Angel", guardian],
                ["Your Angel of Morality", morality],
                ["Angel of Your Soul", soul]
              ].map(([title, angel]) => `
                <div style="
                  background-image: url('${backgroundImages[title]}');
                  background-size: cover;
                  background-position: center;
                  padding: 60px 40px;
                  min-height: 350px;
                  height: auto;
                  color: white;
                  font-family: Georgia, serif;
                  font-weight: bold;
                  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
                  border-radius: 12px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: flex-end;
                  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                ">
                  <div style="max-width: 60%; text-align: left;">
                    <div style="font-size: 1.5em; margin-bottom: 10px;">${title}</div>
                    <div style="font-size: 1.8em;">${angel?.name} (#${angel?.number})</div>
                    <div style="margin-top: 10px; font-size: 1.1em;">${angel?.description}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="margin-top: 30px;">
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 15px;">
              <button id="share-tiktok-btn" onclick="downloadAsImage()">📥 Download TikTok Share Image</button>
              <button id="share-facebook-btn" onclick="shareOnFacebook()" style="background-color: #1877f2;">📘 Share on Facebook</button>
            </div>
            <p style="font-size: 0.9em; margin-top: 10px;">
              🕊 Share your 3 Shem Angels on social media and tag <strong>@TarotPathwork</strong><br>
              Use the hashtag <code>#ShemAngelReveal</code>
            </p>
          </div>
        `;

        resultDiv.innerHTML = output;
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById("angel-results").scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    });
  </script>
            </div>
        </section>
      
    </>
  )
}
