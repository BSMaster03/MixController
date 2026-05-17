import { useEffect, useState } from "react";
import "../styles/saved.css";

function SavedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL de tu backend en InfinityFree
  const API_URL = "https://midominio.42web.io/backend/public/projects";

const handleDelete = (id) => {
  if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) return res.text().then((t) => Promise.reject(new Error(`HTTP ${res.status}: ${t}`)));
      return res.json();
    })
    .then(() => {
      alert("Proyecto eliminado");
      setProjects(projects.filter((p) => p.id !== id));
    })
    .catch((err) => {
      console.error("Error eliminando proyecto:", err);
      alert("Hubo un error al eliminar: " + (err.message || err));
    });
};

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
      <h1>Proyectos guardados</h1>

      <div className="project-list">
        {projects.length === 0 && <p>No hay proyectos guardados.</p>}

        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <div className="project-name">{p.name}</div>

            <div className="project-actions">
              <button
                className="btn btn-edit"
                onClick={() => (window.location.href = `/app/modificar/${p.id}`)}
              >
                Editar
              </button>

                 <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(p.id)}
                    >
                    Eliminar
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedProjects;
