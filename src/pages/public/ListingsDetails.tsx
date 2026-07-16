import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { properties } from "../../data/properties";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Tag,
  Loader2,
  X,
} from "lucide-react";
import { messages } from "../../data/messages";

const ListingsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"viewing" | "message">(
    "viewing",
  );
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
  };

  const openModal = (type: "viewing" | "message") => {
    setEnquiryType(type);
    setSubmitted(false);
    setShowEnquiryModal(true);
  };

  // ─── TODO: Replace with API call ──────────────────
  // const handleEnquirySubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/messages", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ...enquiryData,
  //         propertyId: property?.id,
  //         agentId: property?.agent?.id,
  //       })
  //     })
  //     if (!response.ok) throw new Error("Failed to send enquiry")
  //     setSubmitted(true)
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // ───────────────────────────────────────────────────

  const handleEnquirySubmit = () => {
    if (!property) return;
    if (!enquiryData.name || !enquiryData.email || !enquiryData.message) return;

    setLoading(true);

    // ─── TODO: Replace with POST /api/enquiries/general ───────────────────────
    // const response = await fetch("/api/enquiries/general", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...enquiryData,
    //     propertyId: property.id,
    //     propertyName: property.houseType,
    //     intent: enquiryType === "viewing" ? "Schedule Viewing" : "General Enquiry",
    //   })
    // })
    // ──────────────────────────────────────────────────────────────────────────

    setTimeout(() => {
      // This goes to Super Admin's General Enquiries tab
      // Super Admin then assigns it to the right agent
      const newGeneralEnquiry = {
        id: Date.now().toString(),
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        message:
          enquiryType === "viewing"
            ? `[Schedule Viewing] ${enquiryData.message}`
            : enquiryData.message,
        intent: "Buy" as const,
        propertyId: property.id,
        propertyName: property.houseType,
        location: property.location,
        assignedAgentId: null, // ← null until Super Admin assigns
        isRead: false,
        createdAt: "Just now",
      };

      console.log("Enquiry sent to Super Admin:", newGeneralEnquiry);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-arcadia-charcoal flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">🏚️</p>
          <p className="text-arcadia-cream font-medium">Property not found</p>
          <button
            onClick={() => navigate("/listings")}
            className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
          >
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arcadia-charcoal">
      {/* Hero Image */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img
          src={property.image}
          alt={property.houseType}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-arcadia-charcoal via-arcadia-charcoal/20 to-transparent" />

        <button
          onClick={() => navigate("/listings")}
          className="absolute top-25 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-arcadia-charcoal/60 backdrop-blur-sm border border-arcadia-bark text-arcadia-cream text-sm hover:bg-arcadia-charcoal/80 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Listings
        </button>

        <div className="absolute top-30 right-6">
          <span className="px-3 py-1.5 rounded-full bg-arcadia-moss text-arcadia-cream text-xs font-medium">
            {property.status}
          </span>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-arcadia-cream">
            {property.houseType}
          </h1>
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin size={14} className="text-arcadia-moss" />
            <p className="text-arcadia-sand text-sm">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-3xl font-semibold text-arcadia-leaf">
                ₦{property.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <BedDouble size={16} className="text-arcadia-moss" />
                  {property.bedrooms} Bedrooms
                </div>
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <Bath size={16} className="text-arcadia-moss" />
                  {property.bathrooms} Bathrooms
                </div>
                <div className="flex items-center gap-1.5 text-arcadia-sand text-sm">
                  <Tag size={16} className="text-arcadia-moss" />
                  {property.houseType}
                </div>
              </div>
            </div>

            <hr className="border-arcadia-bark" />

            <div className="space-y-3">
              <h2 className="text-arcadia-cream font-semibold text-lg">
                About this property
              </h2>
              <p className="text-arcadia-sand leading-relaxed">
                {property.description}
              </p>
            </div>

            <hr className="border-arcadia-bark" />

            <div className="space-y-3">
              <h2 className="text-arcadia-cream font-semibold text-lg">
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Property Type", value: property.houseType },
                  { label: "Location", value: property.location },
                  { label: "Status", value: property.status },
                  { label: "Bedrooms", value: property.bedrooms },
                  { label: "Bathrooms", value: property.bathrooms },
                  {
                    label: "Price",
                    value: `₦${property.price.toLocaleString()}`,
                  },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-4 space-y-1"
                  >
                    <p className="text-xs text-arcadia-sand/60 tracking-wide uppercase">
                      {detail.label}
                    </p>
                    <p className="text-arcadia-cream text-sm font-medium">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — agent card */}
          <div className="space-y-4">
            <div className="bg-arcadia-stone border border-arcadia-bark rounded-xl p-6 space-y-5 sticky top-6">
              <h3 className="text-arcadia-cream font-semibold">
                Contact Agent
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-arcadia-moss/20 border border-arcadia-moss/30 flex items-center justify-center text-arcadia-moss font-bold text-lg">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="text-arcadia-cream font-medium">
                    {property.agent.name}
                  </p>
                  <p className="text-arcadia-sand/60 text-xs">Arcadia Agent</p>
                </div>
              </div>

              <hr className="border-arcadia-bark" />

              <div className="space-y-2">
                <p className="text-arcadia-sand text-sm">
                  📞 {property.agent.phone}
                </p>
                <p className="text-arcadia-sand text-sm">
                  📧 {property.agent.email}
                </p>
              </div>

              <hr className="border-arcadia-bark" />

              <div className="space-y-3">
                <button
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors"
                >
                  Schedule Viewing
                </button>
                <button
                  onClick={() => openModal("message")}
                  className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium hover:bg-arcadia-stone transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/listings")}
              className="w-full py-3 rounded-lg border border-arcadia-bark text-arcadia-sand text-sm hover:text-arcadia-cream hover:border-arcadia-sand transition-colors"
            >
              View more properties →
            </button>
          </div>
        </div>
      </div>

      {/* ─── Enquiry Modal ─── */}
      {showEnquiryModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          onClick={() => setShowEnquiryModal(false)}
        >
          <div
            className="w-full max-w-md bg-arcadia-stone rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-arcadia-bark pb-4">
              <h2 className="text-xl font-semibold text-arcadia-cream">
                {enquiryType === "viewing"
                  ? "Schedule a Viewing"
                  : "Message the Agent"}
              </h2>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-arcadia-sand hover:text-arcadia-cream"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-4xl">✅</p>
                <p className="text-arcadia-cream font-medium">
                  Enquiry received!
                </p>
                <p className="text-arcadia-sand text-sm">
                  Our team will review your enquiry about{" "}
                  <span className="text-arcadia-leaf">
                    {property.houseType}
                  </span>{" "}
                  and an agent will reach out to you shortly.
                </p>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="text-sm text-arcadia-moss hover:text-arcadia-leaf transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-arcadia-sand text-sm">
                  Regarding:{" "}
                  <span className="text-arcadia-leaf">
                    {property.houseType}
                  </span>{" "}
                  — {property.location}
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={enquiryData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={enquiryData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={enquiryData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full h-11 px-4 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-arcadia-sand">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={enquiryData.message}
                      onChange={handleChange}
                      placeholder={
                        enquiryType === "viewing"
                          ? "Preferred date and time for viewing..."
                          : "What would you like to know?"
                      }
                      className="w-full px-4 py-3 bg-transparent border border-arcadia-bark rounded-lg text-arcadia-cream placeholder:text-arcadia-bark focus:outline-none focus:border-arcadia-moss resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleEnquirySubmit}
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream font-medium hover:bg-arcadia-leaf transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsDetails;
