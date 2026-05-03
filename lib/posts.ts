import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content/posts");

export type DiagnosisRow = {
  symptom: string;
  cause: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
  diagnosisPreview?: DiagnosisRow[];
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags ?? [],
        readingTime: rt.text,
        coverImage: data.coverImage ?? null,
        diagnosisPreview: data.diagnosisPreview ?? null,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags ?? [],
      readingTime: rt.text,
      coverImage: data.coverImage ?? null,
      diagnosisPreview: data.diagnosisPreview ?? null,
    } as PostMeta,
    content,
  };
}
