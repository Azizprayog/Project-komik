import Link from "next/link";

type Props = {
  title: string;
  href?: string; // ← OPTIONAL
};

export default function SectionHeader({ title, href }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      {href && (
        <Link href={href} className="text-sm text-purple-400 hover:underline">
          View All →
        </Link>
      )}
    </div>
  );
}
