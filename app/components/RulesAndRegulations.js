const ruleGroups = [
  {
    title: "A. Booking & Payment",
    items: [
      "A booking amount of ₹5,000/- per person is required before 60 days to confirm the booking, unless otherwise specified for a particular tour.",
      "The balance payment must be cleared within the deadline specified by Cholo Jai Dure Tour & Travels.",
      "Seat allotment in the vehicle will be done as per the tour operator's seating plan and booking policy.",
      "Solo guests may be required to pay additional room charges for single occupancy, subject to room availability.",
      "Hotel room allotment will be as per the room category, occupancy and availability. No preference of room allotment will be guaranteed on the basis of early booking.",
      "Extra bed / floor mattress may be provided in triple-sharing rooms, subject to hotel policy.",
      "Child fares and infant fares will be applicable as per the specific tour package.",
    ],
  },
  {
    title: "B. Tour Services",
    items: [
      "The tour price includes only the services specifically mentioned under \"Inclusions.\"",
      "Entry fees, optional activities, personal expenses and other services not mentioned in the package will be borne by the guest.",
      "Hotel, transport and meal services are subject to availability and local conditions.",
      "The itinerary may be modified, rescheduled or altered due to weather, road conditions, government restrictions, natural calamities or other unforeseen circumstances.",
    ],
  },
  {
    title: "C. Cancellation & Refund",
    items: [
      "Cancellation requests must be submitted through the official communication channel of Cholo Jai Dure Tour & Travels.",
      {
        text: "Cancellation charges will be calculated from the date of receipt of the cancellation request:",
        subItems: [
          "45 days or more before departure – ₹1,500/- per person",
          "44 to 30 days – 5% of total tour price + ₹1,500/-",
          "29 to 25 days – 10% of total tour price + ₹1,500/-",
          "24 to 20 days – 15% of total tour price + ₹1,500/-",
          "19 to 10 days – 28% of total tour price + ₹1,500/-",
          "9 to 5 days – 33% of total tour price + ₹1,500/-",
          "4 to 3 days – 50% of total tour price + ₹1,500/-",
          "Within 72 hours of departure – No refund",
        ],
      },
      "GST will be applicable as per the prevailing law, where applicable.",
      "No refund will be provided for any unused portion of the tour due to personal reasons, late arrival, early departure or voluntary withdrawal from the tour.",
      "Train / Flight ticket cancellations and refunds will be subject to the respective airline / railway rules and actual refund received.",
    ],
  },
  {
    title: "D. Meal & Hotel Guidelines",
    items: [
      "Guests are requested to report at the specified meal times to ensure smooth operation of the tour.",
      "Each guest will be provided with 1 litre of packaged drinking water per day. Any additional bottles must be purchased at the guest's own cost.",
      "The food menu may be changed or replaced due to availability, seasonal conditions or operational requirements.",
      "Before proceeding for breakfast, guests must remove all luggage and personal belongings from their rooms when check-out / room vacation is scheduled.",
      "Food customisation is not permitted, except where specifically confirmed in advance by the management.",
      "Guests must follow hotel check-in, check-out and other property-specific rules.",
    ],
  },
  {
    title: "E. Vehicle & Seat Discipline",
    items: [
      "Guests must remain seated in their assigned seats inside the tour vehicle.",
      "Changing seats while the vehicle is in motion is strictly not allowed for safety reasons.",
      "Guests must follow the instructions of the driver, tour escort and tour coordinator during the journey.",
      "Guests must report at the specified departure / assembly time. Delays caused by individual guests may result in missed sightseeing or services.",
    ],
  },
  {
    title: "F. Guest Conduct & Discipline",
    items: [
      "Polite and respectful behaviour must be maintained towards guides, drivers, hotel staff, operators and fellow guests.",
      "Rude language, abusive behaviour, arguments, threats or unnecessary confrontations are not permitted.",
      "Guests are not allowed to enter, open or visit another guest's room without the concerned guest's permission.",
      "Every guest must respect the privacy, personal space and belongings of fellow guests.",
      "Guests must not create unnecessary noise or disturbance, particularly during designated rest hours.",
      "Do not touch, use, move or remove another guest's personal belongings without permission.",
      "Once a room is allotted, guests must stay in their assigned room and must not use or occupy another guest's room without permission.",
      "Any damage caused to hotel property, tour vehicles or other facilities by a guest may be charged to the responsible person.",
      "Serious misconduct or repeated violation of these rules may result in necessary action by the management, including removal from the tour where warranted.",
    ],
  },
  {
    title: "G. General Responsibilities",
    items: [
      "Guests are responsible for their personal belongings. Cholo Jai Dure Tour & Travels will not be responsible for loss or damage to personal items.",
      "Each guest must carry valid government-issued ID proof and other required travel documents.",
      "Cholo Jai Dure Tour & Travels does not own or directly control third-party hotels, transport vehicles, railways or airlines.",
      "Any additional cost arising due to unforeseen circumstances, government orders, fuel price changes, toll / tax changes, road closures or other external factors may be charged extra.",
      "Cholo Jai Dure Tour & Travels reserves the right to modify the itinerary or tour arrangements when necessary for the safety, convenience or smooth operation of the tour.",
      "By confirming the booking, the guest is deemed to have read, understood and accepted the above terms & conditions.",
    ],
  },
];

export default function RulesAndRegulations() {
  let counter = 0;

  return (
    <section className="pb-10 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Rules & Regulation</h2>
          <div className="mt-6 space-y-8">
            {ruleGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-amber-300 sm:text-xl">{group.title}</h3>
                <ol className="mt-4 space-y-3 text-white/80">
                  {group.items.map((item) => {
                    counter += 1;
                    const text = typeof item === "string" ? item : item.text;
                    const subItems = typeof item === "string" ? null : item.subItems;
                    return (
                      <li key={counter} className="flex gap-3">
                        <span className="font-semibold text-amber-200">{counter}.</span>
                        <div>
                          <p>{text}</p>
                          {subItems ? (
                            <ul className="mt-2 space-y-1.5">
                              {subItems.map((sub) => (
                                <li key={sub} className="flex items-start gap-2 text-white/70">
                                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
