/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPostDraft {
  id: string;
  title: string;
  contentHtml: string;
  labels: string[];
  publishedAt?: number;
  status: "draft" | "published";
}

export class GeminiBloggerService {
  private static instance: GeminiBloggerService;
  private posts: BlogPostDraft[] = [];

  public static getInstance(): GeminiBloggerService {
    if (!GeminiBloggerService.instance) {
      GeminiBloggerService.instance = new GeminiBloggerService();
    }
    return GeminiBloggerService.instance;
  }

  public createPost(title: string, contentHtml: string, labels: string[] = []): BlogPostDraft {
    const post: BlogPostDraft = {
      id: `blog_${Date.now()}`,
      title,
      contentHtml,
      labels: ["Opossum Ride Adventure", "The Zion Way", ...labels],
      publishedAt: Date.now(),
      status: "published"
    };
    this.posts.unshift(post);
    return post;
  }

  public getPosts(): BlogPostDraft[] {
    return [...this.posts];
  }
}

export const GeminiBlogger = GeminiBloggerService.getInstance();
