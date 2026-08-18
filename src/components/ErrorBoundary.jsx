import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "2rem",
          fontFamily: "monospace",
          background: "#1a1a2e",
          color: "#e94560",
          minHeight: "100vh",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all"
        }}>
          <h2 style={{ color: "#fff" }}>⚠️ Uygulama Hatası</h2>
          <p style={{ color: "#f5a623" }}>{String(this.state.error)}</p>
          <p style={{ color: "#aaa", fontSize: "0.85rem" }}>{this.state.error?.stack}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
