import { useState } from "react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import house1 from "../../assets/house-12.jpg"
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    enquiry: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@arcadiaresidences.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+234 814 979 8764",
      sub: "Mon – Fri, 9am – 6pm",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "Victoria Island, Lagos",
      sub: "Nigeria",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon – Fri: 9am – 6pm",
      sub: "Sat: 10am – 3pm",
    },
  ]

  return (
    <ParallaxProvider>
      <div className="bg-arcadia-charcoal">

        {/* ── HERO ── */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <Parallax speed={-10} className="absolute inset-0 w-full h-full">
            <img
              src={house1}
              alt="Contact Arcadia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
          </Parallax>

          <div className="relative z-10 text-center px-6 space-y-4">
            <p className="text-xs tracking-[0.4em] text-arcadia-moss uppercase">
              Get In Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-semibold text-arcadia-cream leading-tight">
              Let's Find Your <br />
              <span className="text-arcadia-leaf">Perfect Home</span>
            </h1>
            <p className="text-arcadia-sand text-lg max-w-md mx-auto leading-relaxed">
              Have a question or ready to get started? Our team is here to help.
            </p>
          </div>
        </section>

        {/* ── CONTACT INFO CARDS ── */}
        <section className="bg-arcadia-stone border-b border-arcadia-bark px-6 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="bg-arcadia-charcoal border border-arcadia-bark rounded-2xl p-6 space-y-3 hover:border-arcadia-moss/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-arcadia-moss/10 border border-arcadia-moss/20 flex items-center justify-center">
                    <Icon size={18} className="text-arcadia-moss" />
                  </div>
                  <div>
                    <p className="text-xs text-arcadia-sand/60 tracking-wide uppercase">
                      {item.label}
                    </p>
                    <p className="text-arcadia-cream font-medium mt-1">
                      {item.value}
                    </p>
                    <p className="text-arcadia-sand/50 text-xs mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── FORM + MAP ── */}
        <section className="bg-arcadia-cream py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                  Send A Message
                </p>
                <h2 className="text-3xl font-semibold text-arcadia-charcoal">
                  We'd Love To Hear From You
                </h2>
                <p className="text-arcadia-bark text-sm">
                  Fill in the form and one of our agents will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-white border border-arcadia-sand/30 rounded-2xl">
                  <span className="text-5xl">🏡</span>
                  <h3 className="text-arcadia-charcoal font-semibold text-xl">
                    Message Sent!
                  </h3>
                  <p className="text-arcadia-bark text-sm max-w-xs">
                    Thank you for reaching out. One of our agents will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        enquiry: "",
                        message: "",
                      })
                    }}
                    className="text-sm text-arcadia-moss hover:text-arcadia-bark transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-arcadia-bark">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal placeholder:text-arcadia-sand/60 focus:outline-none focus:border-arcadia-moss transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-arcadia-bark">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal placeholder:text-arcadia-sand/60 focus:outline-none focus:border-arcadia-moss transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-arcadia-bark">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal placeholder:text-arcadia-sand/60 focus:outline-none focus:border-arcadia-moss transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-arcadia-bark">
                        Subject
                      </label>
                      <input
                        name="subject"
                        type="text"
                        placeholder="e.g. Property Enquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal placeholder:text-arcadia-sand/60 focus:outline-none focus:border-arcadia-moss transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-arcadia-bark">
                      Type of Enquiry
                    </label>
                    <select
                      name="enquiry"
                      value={formData.enquiry}
                      onChange={handleChange}
                      className="w-full h-11 px-4 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal focus:outline-none focus:border-arcadia-moss transition-colors text-sm"
                    >
                      <option value="">Select enquiry type</option>
                      <option value="buying">I want to buy a property</option>
                      <option value="renting">I want to rent a property</option>
                      <option value="viewing">I want to schedule a viewing</option>
                      <option value="investment">Investment opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-arcadia-bark">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us what you're looking for..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-arcadia-sand/40 rounded-lg text-arcadia-charcoal placeholder:text-arcadia-sand/60 focus:outline-none focus:border-arcadia-moss transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !formData.name || !formData.email || !formData.message}
                    className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-arcadia-cream/30 border-t-arcadia-cream rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-arcadia-sand/60 text-center">
                    Fields marked <span className="text-red-400">*</span> are required
                  </p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-arcadia-moss uppercase">
                  Find Us
                </p>
                <h2 className="text-3xl font-semibold text-arcadia-charcoal">
                  Our Location
                </h2>
                <p className="text-arcadia-bark text-sm">
                  We are located in the heart of Victoria Island, Lagos.
                </p>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-arcadia-sand/30 h-112.5">
                <iframe
                  title="Arcadia Homes Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286989763!2d3.4213!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDI1JzE2LjciRQ!5e0!3m2!1sen!2sng!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Address card under map */}
              <div className="flex items-start gap-3 p-4 bg-white border border-arcadia-sand/30 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-arcadia-moss/10 border border-arcadia-moss/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-arcadia-moss" />
                </div>
                <div>
                  <p className="text-arcadia-charcoal font-medium text-sm">
                    Arcadia Homes HQ
                  </p>
                  <p className="text-arcadia-bark text-sm mt-0.5">
                    Victoria Island, Lagos, Nigeria
                  </p>
                  <a
                    href="https://maps.google.com/?q=Victoria+Island+Lagos"
                    target="_blank"
                    rel="noreferrer"
                    className="text-arcadia-moss text-xs hover:text-arcadia-bark transition-colors mt-1 inline-block"
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  )
}

export default ContactPage