import { useState } from "react";
import "./App.css";

const API = "https://me-api-backend.onrender.com";


function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    setMessage("Loading profile...");
    setProjects([]);
    try {
      const res = await fetch(`${API}/profile`);
      const data = await res.json();
      setProfile(data);
      setMessage("");
    } catch {
      setMessage("Failed to load profile");
    }
  };

  const searchProjects = async () => {
    if (!skill.trim()) {
      setMessage("Enter a skill");
      return;
    }
    setMessage("Searching projects...");
    setProfile(null);
    try {
      const res = await fetch(`${API}/projects?skill=${skill}`);
      const data = await res.json();
      setProjects(data);
      setMessage(data.length ? "" : "No projects found");
    } catch {
      setMessage("Error fetching projects");
    }
  };

  return (
    <div className="container">
      <h1>Me-API Playground</h1>

      <div className="controls">
        <button onClick={loadProfile}>View Profile</button>

        <input
          placeholder="Search skill (SQL, Web)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <button onClick={searchProjects}>Search Projects</button>
      </div>

      {message && <p>{message}</p>}

      {profile && (
        <div className="card">
          <h2>{profile.name}</h2>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Education:</b> {profile.education}</p>
          <p>
            <a href={profile.github}>GitHub</a> |{" "}
            <a href={profile.linkedin}>LinkedIn</a> |{" "}
            <a href={profile.portfolio}>Portfolio</a>
          </p>
        </div>
      )}

      {projects.map((p) => (
        <div className="card" key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p><b>Skills:</b> {p.skills}</p>
          <a href={p.link}>Project Link</a>
        </div>
      ))}
    </div>
  );
}

export default App;
