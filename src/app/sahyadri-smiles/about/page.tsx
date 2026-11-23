import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sahyadri-smiles/CtaBand";
import { Icon, type IconName } from "@/components/sahyadri-smiles/icons";
import { PageHero } from "@/components/sahyadri-smiles/PageHero";
import { href, img } from "@/lib/sahyadri-smiles/content";
import { pageMeta } from "@/lib/sahyadri-smiles/meta";

export const metadata = pageMeta(
  "Our approach to gentle dentistry",
  "Why anxious patients and families in Baner choose Sahyadri Smiles: explanations before treatment, comfort first, hospital-grade sterilisation and written estimates.",
  "/about",
);

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "info", title: "We explain before we touch", text: "You see your X-rays and intraoral photos on a screen beside the chair, and we walk through every option, including doing nothing for now." },
  { icon: "heart", title: "Comfort comes first", text: "Numbing gel before injections, warm water for sensitive teeth, neck pillows, and a raised left hand means we stop. Every time." },
  { icon: "shield", title: "Sterile, every single time", text: "Class B autoclave, single-use items where possible, and sealed instrument pouches opened in front of you." },
  { icon: "card", title: "Clear, written costs", text: "You get a written estimate before treatment starts. If anything changes, we ask first. UPI, cards, EMI and most insurance accepted." },
];

const safety = [
  "Class B vacuum autoclave with a printed log for every cycle",
  "Sealed, dated instrument pouches opened in front of you",
  "Digital X-rays with up to 80% less radiation than film",
  "Dedicated sterilisation room, separate from treatment rooms",
  "Fresh chair barriers and suction tips for every patient",
  "Wheelchair access by lift, with a step-free entrance",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our approach" }]}
        eyebrow="Our approach"
        title="A dental clinic for people who would rather not be at one."
        lead="Sahyadri Smiles opened on Baner Road in 2016 with one simple idea: if people dread the dentist, the clinic should change, not the patient."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap story">
          <div className="ph ss-reveal"><Image src={img("corridor")} alt="Bright clinic corridor leading to the treatment rooms" fill sizes="(max-width: 900px) 100vw, 45vw" className="fill" /></div>
          <div className="prose ss-reveal">
            <p className="eyebrow">Our story</p>
            <h2 className="h2" style={{ marginBottom: "1.25rem" }}>Started by a dentist who was once a nervous patient.</h2>
            <p>Dr. Anjali still remembers the clinic she visited as a child: bright lights, no explanations and a drill that started without warning. When she opened her own practice, she designed it around everything that experience lacked.</p>
            <p>That means longer appointments, so nobody is rushed. It means the same dentist sees you every time. And it means we would rather spend ten minutes explaining a treatment than one minute doing it before you are ready.</p>
            <p>Today we are a team of four dentists and nine staff, looking after more than 6,000 families from Baner, Balewadi, Aundh, Pashan and beyond.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="values-title">
        <div className="wrap">
          <div className="sec-head ss-reveal"><div><p className="eyebrow">What we promise</p><h2 className="h2" id="values-title">Four promises, at every visit.</h2></div></div>
          <div className="values ss-reveal">
            {values.map((v) => <div className="value" key={v.title}><span className="ic"><Icon name={v.icon} size={24} /></span><h3>{v.title}</h3><p>{v.text}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section calm" aria-labelledby="safety-title">
        <div className="wrap calm-grid">
          <div className="calm-img ss-reveal">
            <Image src={img("tools")} alt="Sterilised dental instruments laid out on a clean tray" fill sizes="(max-width: 900px) 100vw, 50vw" className="fill" />
          </div>
          <div className="ss-reveal">
            <p className="eyebrow">Safety &amp; hygiene</p>
            <h2 className="h2" id="safety-title">Clean you can see, not just trust.</h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>Ask to see our sterilisation room any time. Most patients are surprised by how much goes into keeping every visit safe.</p>
            <ul className="checklist" style={{ marginTop: "1.5rem" }}>{safety.map((s) => <li key={s}><Icon name="check" size={18} strokeWidth={2.4} />{s}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="first-title">
        <div className="wrap two-col">
          <div className="ss-reveal">
            <p className="eyebrow">Your first visit</p>
            <h2 className="h2" id="first-title">What to expect when you walk in.</h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>Your first appointment is mostly a conversation. Nothing happens without your go-ahead.</p>
            <div className="hero-ctas" style={{ marginTop: "1.75rem" }}>
              <Link className="btn btn-primary" href={href("/book")}><Icon name="cal" />Book a first visit</Link>
              <Link className="btn btn-soft" href={href("/dentists")}>Meet the dentists</Link>
            </div>
          </div>
          <ol className="steps ss-reveal">
            <li><div><h3>A warm welcome</h3><p>Water, a quiet lounge and a short form about your health and any worries. Tell us if you&apos;re nervous.</p></div></li>
            <li><div><h3>A proper chat</h3><p>Your dentist asks what brought you in, what&apos;s bothering you and what you&apos;d like from your teeth.</p></div></li>
            <li><div><h3>A gentle check</h3><p>Teeth, gums, bite and soft tissues, with photos on screen. X-rays only if they will change the plan.</p></div></li>
            <li><div><h3>A written plan</h3><p>Options, timelines and costs on paper, so you can go home and decide. No pressure, ever.</p></div></li>
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
