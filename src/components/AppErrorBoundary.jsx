import { Component } from 'react';

/**
 * Preventa que um erro de renderização deixe o site inteiro em branco.
 * Em desenvolvimento, mostra a mensagem para facilitar o diagnóstico.
 */
export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[AutoFênix] Erro ao renderizar a página:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '32px 20px',
            background: '#f3f7fd',
            color: '#102044',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <section
            role="alert"
            style={{
              width: 'min(100%, 640px)',
              padding: '32px',
              background: '#fff',
              border: '1px solid #e2e9f4',
              borderTop: '4px solid #00165b',
            }}
          >
            <p style={{ marginTop: 0, color: '#1766c7', fontWeight: 700 }}>
              AUTOFÊNIX PROTEÇÃO VEICULAR
            </p>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)' }}>
              Não foi possível carregar a página.
            </h1>
            <p>
              Atualize a página. Se o problema continuar, consulte o terminal e o
              console do navegador para ver o erro técnico.
            </p>
            {isDevelopment && this.state.error && (
              <pre
                style={{
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap',
                  padding: '12px',
                  background: '#f6f8fc',
                  fontSize: '12px',
                }}
              >
                {this.state.error.stack || this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 18px',
                border: 0,
                background: '#00165b',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Tentar novamente
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
