import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { DentistCard, ReviewCard } from "@/components/sahyadri-smiles/Cards";
import { FaqList } from "@/components/sahyadri-smiles/FaqList";
import { HeroSlots } from "@/components/sahyadri-smiles/HeroSlots";
import { Icon } from "@/components/sahyadri-smiles/icons";
import { QuickBook } from "@/components/sahyadri-smiles/QuickBook";
import { dentists, faqs, href, img, reviews, treatments, whatsappLink } from "@/lib/sahyadri-smiles/content";
import { pageMeta, SITE_NAME } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  `${SITE_NAME} | Gentle family dentistry in Baner, Pune`,
  "Gentle family dental clinic on Baner Road, Pune. Check-ups, fillings, root canals, braces, implants, whitening and kids' dentistry. Evening slots till 8:30 pm. Book online in two taps.",
  "",
  true,
);

const t = (slug: string) => treatments.find((x) => x.slug === slug)!;

export default function Home() {
  const homeFaqs = [faqs[1].items[0], faqs[2].items[1], faqs[3].items[0], faqs[0].items[1]];
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill"><span>New</span>Evening slots till 8:30 pm, Monday to Friday</span>
            <h1>
              Gentle family dentistry. Book your visit in{" "}
              <em>two taps.<svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11c60-8 170-10 294-4" fill="none" stroke="#FF9F7A" strokeWidth="5" strokeLinecap="round" /></svg></em>
            </h1>
            <p className="lead">From your child&apos;s first check-up to a calm, single-sitting root canal, we take our time, explain everything, and never rush you in the chair.</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book appointment</Link>
              <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />WhatsApp us</a>
            </div>
            <ul className="assure">
              <li><Icon name="check" strokeWidth={2.4} />Numbing gel before every injection</li>
              <li><Icon name="check" strokeWidth={2.4} />Sealed, sterilised kits</li>
              <li><Icon name="check" strokeWidth={2.4} />Cost explained upfront</li>
            </ul>
          </div>
          <div className="hero-art">
            <div className="photo">
              <Image src={img("hero")} alt="Smiling patient checking her teeth in a hand mirror after treatment" fill preload sizes="(max-width: 900px) 100vw, 46vw" className="fill" style={{ objectPosition: "50% 25%" }} />
            </div>
            <div className="float f-calm"><span className="ic"><Icon name="heart" size={22} /></span><span><b>Nervous about dentists?</b><span>Tell us when you book. We&apos;ll go slow.</span></span></div>
            <HeroSlots />
          </div>
        </div>
      </section>

      <QuickBook />

      <section className="section" aria-labelledby="tr-title">
        <div className="wrap">
          <div className="sec-head ss-reveal">
            <div><p className="eyebrow">Treatments</p><h2 className="h2" id="tr-title">Everything your family&apos;s teeth need, under one calm roof.</h2></div>
            <p>Every treatment starts with a conversation, an X-ray only if needed, and a written plan you can take home and think about.</p>
          </div>
          <div className="bento ss-reveal">
            <Link className="tcard big" href={href(`/treatments/${t("check-up-and-cleaning").slug}`)}>
              <Image src={img("family")} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 100vw, 50vw" className="fill" style={{ opacity: 0.88 }} />
              <span className="more"><Icon name="arrow" size={18} /></span>
              <div className="txt"><span className="badge">Most booked</span><h3>Check-ups &amp; cleaning</h3><p>A 40-minute check, gentle scaling and polishing, and an honest plan. No upselling, ever.</p></div>
            </Link>
            <Link className="tcard blue" href={href("/treatments/root-canal")}>
              <span className="more"><Icon name="arrow" size={18} /></span><span className="ti"><Icon name="shield" size={26} /></span>
              <h3>Root canal</h3><p>Single-sitting RCT for most teeth, with proper numbing.</p>
            </Link>
            <Link className="tcard" href={href("/treatments/braces-and-aligners")}>
              <span className="more"><Icon name="arrow" size={18} /></span><span className="ti"><Icon name="braces" size={26} /></span>
              <h3>Braces &amp; aligners</h3><p>Metal, ceramic or clear aligners for teens and adults.</p>
            </Link>
            <Link className="tcard lav" href={href("/treatments/kids-dentistry")}>
              <span className="more"><Icon name="arrow" size={18} /></span><span className="ti"><Icon name="kid" size={26} /></span>
              <h3>Kids&apos; dentistry</h3><p>Fun first visits and sealants, with a children&apos;s specialist.</p>
            </Link>
            <Link className="tcard" href={href("/treatments/dental-implants")}>
              <span className="more"><Icon name="arrow" size={18} /></span><span className="ti"><Icon name="implant" size={26} /></span>
              <h3>Implants &amp; crowns</h3><p>Replace missing teeth with options for every budget.</p>
            </Link>
          </div>
          <p style={{ marginTop: "2rem" }}><Link className="link-arrow" href={href("/treatments")}>See all 7 treatments <Icon name="right" size={18} /></Link></p>
        </div>
      </section>

      <section className="section calm" aria-labelledby="calm-title">
        <div className="wrap calm-grid">
          <div className="calm-img ss-reveal">
            <Image src={img("consult")} alt="Dentist talking calmly with a patient before treatment" fill sizes="(max-width: 900px) 100vw, 50vw" className="fill" />
            <div className="note"><span className="ic"><Icon name="smile" size={20} /></span><span><b>Raise your left hand, and we stop.</b> Every time, no questions asked.</span></div>
          </div>
          <div className="ss-reveal">
            <p className="eyebrow">Our approach</p>
            <h2 className="h2" id="calm-title">Made for people who don&apos;t love the dentist.</h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>Many of our patients walked in anxious. These four small promises are why they keep coming back, and bring their families too.</p>
            <ol className="promise">
              <li><span className="n">01</span><span><b>We explain before we touch</b><span>You see your X-ray and photos on screen, and we talk through every option first.</span></span></li>
              <li><span className="n">02</span><span><b>Comfort first, always</b><span>Numbing gel, warm water for sensitive teeth, and breaks whenever you want one.</span></span></li>
              <li><span className="n">03</span><span><b>Hospital-grade sterilisation</b><span>Class B autoclave, and sealed instrument kits opened in front of you.</span></span></li>
              <li><span className="n">04</span><span><b>No surprises on the bill</b><span>A written estimate before treatment. We never add work without asking.</span></span></li>
            </ol>
            <p style={{ marginTop: "1.75rem" }}><Link className="link-arrow" href={href("/about")}>More about how we work <Icon name="right" size={18} /></Link></p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="clinic-title">
        <div className="wrap">
          <div className="sec-head ss-reveal">
            <div><p className="eyebrow">The clinic</p><h2 className="h2" id="clinic-title">Bright, quiet and spotless.</h2></div>
            <p>A calm lounge, private treatment rooms and a children&apos;s room with a cartoon ceiling, two minutes from Baner Road.</p>
          </div>
          <div className="gallery ss-reveal">
            <figure><Image src={img("lounge")} alt="Bright waiting lounge with plants and comfortable chairs" fill sizes="(max-width: 900px) 100vw, 45vw" className="fill" /><figcaption>A quiet, bright waiting lounge</figcaption></figure>
            <figure><Image src={img("surgery")} alt="Modern dental treatment room" fill sizes="(max-width: 900px) 50vw, 28vw" className="fill" /><figcaption>Modern treatment rooms</figcaption></figure>
            <figure><Image src={img("kids")} alt="Children's dental room" fill sizes="(max-width: 900px) 50vw, 28vw" className="fill" style={{ objectPosition: "35% 50%" }} /><figcaption>The kids&apos; room</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="team-title">
        <div className="wrap">
          <div className="sec-head ss-reveal">
            <div><p className="eyebrow">Our dentists</p><h2 className="h2" id="team-title">Familiar faces who remember your name.</h2></div>
            <p>The same dentist sees you from first visit to final check, so you never have to explain your history twice.</p>
          </div>
          <div className="team three ss-reveal">{dentists.slice(0, 3).map((d) => <DentistCard key={d.name} d={d} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 400px" />)}</div>
          <p style={{ marginTop: "2rem" }}><Link className="link-arrow" href={href("/dentists")}>Meet the whole team <Icon name="right" size={18} /></Link></p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="rev-title">
        <div className="wrap">
          <div className="sec-head ss-reveal">
            <div><p className="eyebrow">Patient stories</p><h2 className="h2" id="rev-title">Kind words from our chairs.</h2></div>
            <p>Shared with us by patients from Baner, Aundh, Balewadi and around. Read more on our reviews page.</p>
          </div>
          <div className="reviews ss-reveal">{reviews.slice(0, 3).map((r) => <ReviewCard key={r.name} r={r} />)}</div>
          <p style={{ marginTop: "2rem" }}><Link className="link-arrow" href={href("/reviews")}>Read all reviews <Icon name="right" size={18} /></Link></p>
        </div>
      </section>

      <CtaBand />

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap two-col">
          <div className="ss-reveal">
            <p className="eyebrow">Good to know</p>
            <h2 className="h2" id="faq-title">Questions we hear every day.</h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>Can&apos;t find yours? <Link className="link-arrow" href={href("/faq")}>See all questions</Link></p>
          </div>
          <div className="ss-reveal"><FaqList items={homeFaqs} openFirst /></div>
        </div>
      </section>
    </>
  );
}
