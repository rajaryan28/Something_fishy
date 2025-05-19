import React from 'react'

const FuturePanel = () => {
  const features = [
    { title: "📸 Post Photos", description: "Share your favorite moments with the users of this webApp.", bgColor: "#ffe4b5" },
    
    { title: "❤️ React to Posts", description: "Express your thoughts by liking and reacting to posts.", bgColor: "#ffcccb" },
    { title: "➕ Follow Users", description: "Stay updated with your favorite users' posts.", bgColor: "#add8e6" },
    { title: "💬 Message Users", description: "Connect privately with direct messages.", bgColor: "#98fb98" },
    { title: "🚀 Future Updates", description: "Exciting new features are coming soon!", bgColor: "#d8bfd8" },
  ];

  return (
    <div className="container mt-5 mb-5 text-center">
      <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>🔥 Exciting Features</h2>
      <p className="text-muted mb-4" style={{ fontSize: "1.2rem" }}>
        Experience a whole new way of interacting with your friends!
      </p>

      <div className="row justify-content-center">
        {features.map((feature, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm feature-card"
              style={{
                backgroundColor: feature.bgColor,
                borderRadius: "15px",
                padding: "20px",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h4 className="fw-bold">{feature.title}</h4>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuturePanel
