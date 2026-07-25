import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Portfolio render error", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.24em] text-spark">Something slipped</div>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tightest text-ink">This section failed to render.</h1>
          <p className="mt-4 text-ink-soft">Refresh the page, or contact Muhammad directly if the issue continues.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
