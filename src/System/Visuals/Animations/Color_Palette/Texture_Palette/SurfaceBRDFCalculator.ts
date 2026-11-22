/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SurfaceBRDFCalculator — GGX Normal Distribution, Schlick Fresnel, & Bump Perturbation.
 */

export class SurfaceBRDFCalculator {
  public static computeGGXDistribution(nDotH: number, roughness: number): number {
    const ndh = Math.max(0, Math.min(1, Number.isFinite(nDotH) ? nDotH : 0));
    const r = Math.max(0.04, Math.min(1.0, Number.isFinite(roughness) ? roughness : 0.7));
    const alpha = r * r;
    const alpha2 = alpha * alpha;
    const denom = ndh * ndh * (alpha2 - 1.0) + 1.0;
    return alpha2 / Math.max(1e-6, Math.PI * denom * denom);
  }

  public static computeSchlickFresnel(cosTheta: number, f0: number = 0.04): number {
    const ct = Math.max(0, Math.min(1, Number.isFinite(cosTheta) ? cosTheta : 0));
    const safeF0 = Math.max(0, Math.min(1, Number.isFinite(f0) ? f0 : 0.04));
    return safeF0 + (1.0 - safeF0) * Math.pow(1.0 - ct, 5);
  }

  public static computeMicrofacetResponse(
    nDotL: number,
    nDotV: number,
    nDotH: number,
    roughness: number,
    bumpScale: number = 0.25
  ): number {
    const ndl = Math.max(0, Math.min(1, Number.isFinite(nDotL) ? nDotL : 0));
    const ndv = Math.max(0.001, Math.min(1, Number.isFinite(nDotV) ? nDotV : 1));
    const bump = Math.max(0, Math.min(1, Number.isFinite(bumpScale) ? bumpScale : 0.25));
    const ndf = this.computeGGXDistribution(nDotH, roughness);
    const fresnel = this.computeSchlickFresnel(ndv);
    const specular = Math.min(1.0, (ndf * fresnel) / (4.0 * Math.max(0.05, ndv)));
    const diffuse = ndl * (1.0 - 0.15 * bump);
    return Math.max(0, Math.min(1, diffuse + specular * 0.5));
  }
}
