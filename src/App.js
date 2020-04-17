import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `New Project ${new Date()}`,
      owner: "Diego Hennrich"
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newGroup = repositories.filter(i => i.id !== id);

    setRepositories(newGroup);
  }

  useEffect(() => {
    api.get("/repositories").then(e => {
      const { data } = e;
      setRepositories(data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map(i => (
            <li key={i.id}>
              {i.title}
              <button onClick={() => handleRemoveRepository(i.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
