/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * AIErrorBoundary
 * Scientific fault-isolation boundary for AI-synthesized environmental overlays,
 * smart levels, and generative UI widgets. Prevents render failures in non-critical
 * generative visual layers from cascading into game-breaking unmounts.
 */
export class AIErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    errorMessage: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || "Unknown AI subsystem rendering exception"
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const module = this.props.moduleName || "AI_SUBSYSTEM";
    console.warn(
      `[AI Error Boundary] Intercepted non-fatal synthesis exception in <${module}>:`,
      error,
      errorInfo
    );
  }

  public override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

export default AIErrorBoundary;
