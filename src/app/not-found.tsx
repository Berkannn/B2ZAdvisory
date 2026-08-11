export default function RootNotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#182420",
          background: "#f7faf8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", fontWeight: 700, color: "#8ccfb4" }}>
            404
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            Page not found —{" "}
            <a href="/tr" style={{ color: "#24785b" }}>
              go to homepage
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
