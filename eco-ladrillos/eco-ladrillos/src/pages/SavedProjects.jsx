import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import "../styles/realizar.css";

export default function SavedProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="page">

      {/* Barra superior */}
      <div className="top-bar">
        <h1>Proyectos guardados</h1>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Volver al menú principal
        </button>
      </div>

      <p className="subtitle">
        Aquí puedes ver todos los proyectos que has creado y guardado.
      </p>

      {/* Cargando */}
      {loading && <div className="empty">Cargando proyectos...</div>}

      {/* Si no hay proyectos */}
      {!loading && projects.length === 0 && (
        <div className="empty">No hay proyectos registrados aún.</div>
      )}

      {/* Lista de proyectos */}
      <div className="project-list">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.name}</h3>

            <p><strong>Fecha:</strong> {p.created_at}</p>
            <p><strong>Ladrillos:</strong> {p.total_bricks}</p>
            <p><strong>PET:</strong> {p.pet_kg} kg</p>
            <p><strong>Botellas:</strong> {p.bottles_needed}</p>

            <button
              className="details-btn"
              onClick={() => navigate(`/app/ver/${p.id}`)}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
