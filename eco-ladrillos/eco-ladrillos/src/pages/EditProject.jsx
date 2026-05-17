import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/editproject.css";

function EditProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://midominio.42web.io/backend/public/projects";

  // Cargar datos del proyecto
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando proyecto:", err);
        setLoading(false);
      });
  }, [id]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar PUT al backend
  const handleSave = () => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Proyecto actualizado correctamente");
        window.location.href = "/app/proyectos";
      })
      .catch((err) => {
        console.error("Error actualizando proyecto:", err);
        alert("Hubo un error al actualizar");
      });
  };

  if (loading) {
    return <div className="page">Cargando proyecto...</div>;
  }

  if (!project) {
    return <div className="page">Proyecto no encontrado</div>;
  }

  return (
    <div className="page">
      <h1>Editar proyecto</h1>

      <div className="form-grid">
        <div className="field">
          <label>Nombre del proyecto</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Tipo de ladrillo</label>
          <input
            type="text"
            name="brick_type"
            value={project.brick_type}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Cantidad</label>
          <input
            type="number"
            name="quantity"
            value={project.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Resistencia</label>
          <input
            type="number"
            name="strength"
            value={project.strength}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="actions">
        <button className="save-btn" onClick={handleSave}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

export default EditProject;
