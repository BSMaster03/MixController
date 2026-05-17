import { useEffect, useState } from "react";
import "../styles/modifyprojects.css";

function ModifyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://midominio.42web.io/backend/public/projects";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) return res.text().then((t) => Promise.reject(new Error(`HTTP ${res.status}: ${t}`)));
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando proyectos:", err);
        alert("Error cargando proyectos: " + (err.message || err));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="page">Cargando proyectos...</div>;
  }

  return (
    <div className="page">
      <h1>Modificar proyectos</h1>

      <div className="modify-list">
        {projects.length === 0 && <p>No hay proyectos guardados.</p>}

        {projects.map((p) => (
          <div
            key={p.id}
            className="modify-card"
            onClick={() => (window.location.href = `/app/modificar/${p.id}`)}
          >
            <div className="modify-title">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModifyProjects;
