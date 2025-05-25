import React, { useState } from "react";

const PostPrompt = () => {
  const prompts = [
    "Ever wanted to roast a teacher anonymously? Now’s your chance 😶‍🌫️.",
    "Say what you *really* think about today's lecture. No filters.",
    "Got a secret crush on someone in the library? Hype them up anonymously 👀.",
    "Post about someone amazing — no names, just vibes 💫.",
    "Someone made your day? Write it anonymously, make theirs too!",
    "Give your fav prof a shoutout or… a roast 👨‍🏫🔥.",
    "Share your classroom drama. We’re all ears (and laughs).",
    "Be the mystery hype squad your crush never knew they had.",
    "Someone’s outfit slayed today? Let them know... anonymously 😌.",
    "This is the confession corner you never had in school.",
    "You're not alone — someone else probably feels the same.",
    "Speak your truth. We're here for the tea 🍵.",
    "Got a spicy take on campus life? Share it here.",
    "Your thoughts matter, even if they’re anonymous.",
    "Be anonymous, not boring.",
    "What’s one thing you wish you could say out loud right now?",
    "If your campus walls could talk, what would they say?",
    "Got a story that sounds fake but is 100% real?",
    "They say silence is golden. We say... post it anonymously.",
    "Let your brain dump, your soul will thank you.",
    "Someone needs to hear what you have to say.",
    "Say it. Someone else is feeling it too.",
  ];

  const getRandomPrompt = () =>
    prompts[Math.floor(Math.random() * prompts.length)];

  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt());
  const [fade, setFade] = useState(true);

  const handleNewPrompt = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentPrompt(getRandomPrompt());
      setFade(true);
    }, 100); // short delay to trigger fade
  };

  return (
    <div
      className="alert alert-info shadow-sm rounded text-dark d-flex justify-content-between align-items-start flex-wrap"
      style={{
        fontSize: "1rem",
        backgroundColor: "#eaf6ff",
        borderLeft: "5px solid #0d6efd",
        maxWidth: "100%",
        marginBottom: "1rem",
        transition: "opacity 0.3s ease-in-out",
        opacity: fade ? 1 : 0,
      }}
    >
      <div style={{ flex: "1 1 auto", marginRight: "1rem" }}>
        <strong>Feeling stuck (about what to write)?</strong>
        <br />
        <span>{currentPrompt}</span>
      </div>
      <button
        className="btn btn-outline-primary btn-sm mt-2 mt-md-0"
        onClick={handleNewPrompt}
      >
        Another one
      </button>
    </div>
  );
};

export default PostPrompt;