import React from "react";

const About = () => {
  return (
    <section style={styles.container}>
      <h1 style={styles.heading}>About Our Platform</h1>
      <p style={styles.paragraph}>
        Welcome to our social platform! Here, you can connect with others by
        sharing your thoughts, photos, and experiences. Our platform is built
        to encourage creativity, collaboration, and community.
      </p>
      <h2 style={styles.subHeading}>Features</h2>
      <ul style={styles.list}>
        <li>
          <strong>Post Uploading:</strong> Share your unique content with the
          world by uploading posts, images, or text updates.
        </li>
        <li>
          <strong>Explore Posts:</strong> Browse all posts uploaded by users on
          the platform and get inspired by the community.
        </li>
        <li>
          <strong>Personal Profiles:</strong> Visit your profile to manage
          your posts, edit your details, and see your content in one place.
        </li>
      </ul>
      <p style={styles.paragraph}>
        Join us today and start sharing your stories with the world. Be part of
        a growing community and showcase your creativity!
      </p>
    </section>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "black",
  },
  subHeading: {
    marginTop: "20px",
    color: "#555",
  },
  paragraph: {
    marginBottom: "15px",
  },
  list: {
    paddingLeft: "20px",
    listStyleType: "disc",
  },
};

export default About;
