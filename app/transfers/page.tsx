"use client";

import React, { useState, useEffect } from "react";

const whatsappNumber = "557599022012";

const transferServices = [
  {
    id: 0,
    title: "Transfer Salvador ⇄ Morro de São Paulo (Catamarã)",
    category: "Salvador / Morro",
    shortDesc: "Travessia marítima direta de Catamarã entre Salvador e Morro de São Paulo.",
    price: "Consultar pelo WhatsApp",
    images: [
      "/catamara-1.jpeg",
      "/catamara-2.jpeg",
      "/catamara-3.jpeg",
    ],
    details: {
      intro: "A opção de travessia direta via marítima saindo do Terminal Náutico de Salvador até o Cais de Morro de São Paulo.",
      options: [
        "Catamarã Direto: Duração média de 2h a 2h30 de travessia.",
        "Saídas diárias com horários regulares pela manhã e tarde.",
        "Desembarque direto no cais principal de Morro de São Paulo."
      ]
    }
  },
  {
    id: 1,
    title: "Transfer para Boipeba",
    category: "Morro / Boipeba",
    shortDesc: "Travessia prática e rápida de Morro de São Paulo para a Ilha de Boipeba.",
    price: "Consultar pelo WhatsApp",
    images: [
      "/boipeba-transfer-1.jpeg",
      "/boipeba-transfer-2.jpeg",
      "/boipeba-transfer-3.jpeg",
    ],
    details: {
      intro: "Deslocamento rápido entre ilhas para você aproveitar Boipeba sem preocupações.",
      options: [
        "Opções via 4x4 + travessia de barquinho pelo rio em Castelhanos.",
        "Saídas diretas de lancha rápida sob consulta.",
        "Agendamento de ida e volta ou apenas um trecho."
      ]
    }
  },
  {
    id: 2,
    title: "Transfer Semiterrestre Salvador ⇄ Morro",
    category: "Salvador / Morro",
    shortDesc: "Trajeto combinado por Mar e Terra (Ferry/Lancha + Van + Lancha Rápida).",
    price: "Consultar pelo WhatsApp",
    images: [
      "/semiterrestre-1.jpeg",
      "/semiterrestre-2.jpeg",
      "/semiterrestre-3.jpeg",
    ],
    details: {
      intro: "A alternativa perfeita para quem prefere evitar o mar aberto do catamarã ou busca horários mais flexíveis.",
      options: [
        "1ª Etapa: Travessia de Salvador até a Ilha de Itaparica (Ferry-Boat ou Lancha).",
        "2ª Etapa: Transporte em Van ou Ônibus climatizado até o cais de Valença / Ponta do Curral.",
        "3ª Etapa: Travessia rápida de Lancha até o Cais de Morro de São Paulo (aprox. 15 min)."
      ]
    }
  }
];

export default function TransfersPage() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.body.style.overflow = activeItem === null ? "" : "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
      if (activeItem !== null && e.key === "ArrowRight") {
        setSlide((s) => (s + 1) % transferServices[activeItem].images.length);
      }
      if (activeItem !== null && e.key === "ArrowLeft") {
        setSlide((s) => (s - 1 + transferServices[activeItem].images.length) % transferServices[activeItem].images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const openModal = (index: number) => {
    setActiveItem(index);
    setSlide(0);
  };

  const getWaLink = (title: string) => {
    const msg = `Olá, Preta! Gostaria de consultar horários e valores sobre: ${title}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div 
      style={{ 
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/bj-mar.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        fontFamily: "sans-serif" 
      }}
    >
      
      {/* Cabeçalho */}
      <header style={{ backgroundColor: "#004b8d", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "0.95rem" }}>
            ← Voltar para o Início
          </a>
        </nav>
        <div>
          <img 
            src="/passeio-preta.jpeg" 
            alt="Passeios da Preta" 
            style={{ height: "65px", width: "auto", objectFit: "contain" }} 
          />
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: "40px 20px", maxWidth: "1200px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        <section style={{ marginBottom: "35px" }}>
          <h1 style={{ fontSize: "2.2rem", color: "#002b5c", margin: "0 0 10px 0" }}>Translados em Morro de São Paulo</h1>
          <p style={{ color: "#1e293b", fontSize: "1.05rem", margin: 0, fontWeight: "500" }}>
            Clique nos serviços para ver fotos, detalhes e rotas completas.
          </p>
        </section>

        {/* Grid de Cards */}
        <section style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {transferServices.map((item, index) => (
            <article
              key={item.id}
              onClick={() => openModal(index)}
              style={{
                border: "1px solid rgba(0, 75, 141, 0.15)",
                borderRadius: "12px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(4px)",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,75,141,0.12)",
                transition: "transform 0.2s ease",
              }}
            >
              <div style={{ position: "relative", height: "210px", backgroundColor: "#edf2f7" }}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    background: "rgba(0, 43, 92, 0.85)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "16px",
                    fontSize: "0.8rem",
                  }}
                >
                  ▣ {item.images.length} fotos
                </span>
              </div>

              <div style={{ padding: "20px" }}>
                <span style={{ fontSize: "0.8rem", color: "#004b8d", fontWeight: "bold", textTransform: "uppercase" }}>
                  {item.category}
                </span>
                <h3 style={{ margin: "8px 0", fontSize: "1.2rem", color: "#002b5c" }}>{item.title}</h3>
                <p style={{ color: "#4a5568", fontSize: "0.92rem", lineHeight: "1.4" }}>{item.shortDesc}</p>
                
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.9rem", color: "#002b5c" }}>{item.price}</strong>
                  <span style={{ color: "#004b8d", fontWeight: "bold", fontSize: "0.9rem" }}>Ver detalhes →</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Modal Redesenhado */}
      {activeItem !== null && (
        <div
          onClick={(e) => e.target === e.currentTarget && setActiveItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,43,92,0.75)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              position: "relative",
            }}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setActiveItem(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 20,
                background: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "1.2rem",
                color: "#333",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              ×
            </button>

            {/* Container da Imagem com Fundo Desfocado */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", overflow: "hidden", backgroundColor: "#001835" }}>
              
              <img
                src={transferServices[activeItem].images[slide]}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(12px) brightness(0.6)",
                  transform: "scale(1.1)",
                }}
              />

              <img
                src={transferServices[activeItem].images[slide]}
                alt={transferServices[activeItem].title}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              <button
                onClick={() =>
                  setSlide((s) => (s - 1 + transferServices[activeItem].images.length) % transferServices[activeItem].images.length)
                }
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,43,92,0.8)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                ‹
              </button>

              <button
                onClick={() => setSlide((s) => (s + 1) % transferServices[activeItem].images.length)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,43,92,0.8)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                ›
              </button>

              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  fontSize: "0.85rem",
                  background: "rgba(0,43,92,0.85)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  zIndex: 2,
                }}
              >
                {slide + 1} / {transferServices[activeItem].images.length}
              </div>
            </div>

            {/* Container de Informações */}
            <div style={{ 
              padding: "32px", 
              display: "flex", 
              flexDirection: "column", 
              maxHeight: "90vh", 
              overflowY: "auto",
              backgroundColor: "#ffffff"
            }}>
              
              <span style={{ fontSize: "0.85rem", color: "#004b8d", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {transferServices[activeItem].category}
              </span>
              
              <h2 style={{ margin: "10px 0 16px 0", fontSize: "1.8rem", color: "#002b5c", lineHeight: "1.2" }}>
                {transferServices[activeItem].title}
              </h2>
              
              <p style={{ color: "#4a5568", fontSize: "1rem", lineHeight: "1.6" }}>
                {transferServices[activeItem].details.intro}
              </p>

              <h4 style={{ 
                marginTop: "24px", 
                marginBottom: "8px", 
                color: "#002b5c", 
                fontSize: "1.15rem",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <span style={{ width: "4px", height: "22px", backgroundColor: "#004b8d", borderRadius: "4px" }}></span>
                Como funciona / Opções
              </h4>

              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: "12px" }}>
                {transferServices[activeItem].details.options.map((opt, i) => (
                  <div key={i} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "16px", 
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)"
                  }}>
                    <span style={{
                      minWidth: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#004b8d",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    
                    <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem", lineHeight: "1.5" }}>
                      {opt}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px" }}>
                <a
                  href={getWaLink(transferServices[activeItem].title)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px",
                    background: "#004b8d",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                    boxShadow: "0 4px 12px rgba(0,75,141,0.2)"
                  }}
                >
                  Consultar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer style={{ backgroundColor: "#004b8d", color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
        <span>© 2026 - Passeios da Preta</span>
        <span>Morro de São Paulo - BA</span>
      </footer>

    </div>
  );
}