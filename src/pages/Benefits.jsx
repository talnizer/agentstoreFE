export default function Benefits() {
  return (
    <>
      <section className="container mt-4 py-5">
        <h2 className="text-center mb-4">Benefits for Your Restaurant</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          <div className="col"><div className="p-3 app-border-color 1bg-success-subtle card shadow text-center"><span className="display-6 mb-3">📈 </span> Increase Table Turnover</div></div>
          <div className="col"><div className="p-3 app-border-color 1bg-success-subtle card shadow text-center"><span className="display-6 mb-3">📉 </span> Reduce Staff Workload</div></div>
          <div className="col"><div className="p-3 app-border-color 1bg-success-subtle card shadow text-center"><span className="display-6 mb-3">⭐ </span> Improve Guest Satisfaction</div></div>
          <div className="col"><div className="p-3 app-border-color 1bg-success-subtle card shadow text-center"><span className="display-6 mb-3">💬 </span> Build Loyal Customers</div></div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">What Restaurants Are Saying</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="shadow card p-3 h-100">
              <div className="testimonial">“With HamRahi, our service speed improved, and feedback finally started flowing in!”<br /><strong>— Ritu S., Restaurant Owner, Delhi</strong></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow card p-3 h-100">
              <div className="testimonial">“Our repeat guest rate went up 22% after using HamRahi’s ordering and feedback system.”<br /><strong>— Amit R., Café Chain Operator</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="container py-5 text-center">
        <h2 className="mb-3">Get Started</h2>
        <p> Go live in under 24 hours. No setup fees. No long-term contracts.</p>    <a href="https://wa.me/918619932643?text=Hi%20HamRahi%2C%20I%20am%20interested%20in%20booking%20a%20demo." target="_blank" className="btn btn-outline-success">Book a Demo on WhatsApp</a>
      </section>
    </>
  );
}
