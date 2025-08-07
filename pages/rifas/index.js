import { useEffect, useState } from "react";

export default function RifaPage() {
  const [numeros, setNumeros] = useState([]);

  useEffect(() => {
    fetch("/api/v1/rifas")
      .then((res) => res.json())
      .then(setNumeros);
  }, []);

  async function reservarNumero(numero) {
    const response = await fetch(`/api/v1/rifas/${numero}`, {
      method: "POST",
    });
    if (response.ok) {
      setNumeros((nums) =>
        nums.map((n) => (n.numero === numero ? { ...n, reservado: true } : n)),
      );
    } else {
      alert("Número já reservado");
    }
  }

  return (
    <div>
      <h1>Rifa</h1>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
        }}
      >
        {numeros.map((n) => (
          <li key={n.numero} style={{ margin: "5px" }}>
            <button
              onClick={() => reservarNumero(n.numero)}
              disabled={n.reservado}
            >
              {n.numero}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
