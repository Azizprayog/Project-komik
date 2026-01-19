import Link from "next/link";

export default function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>

      {href && (
        <Link
          href={href}
          className="text-sm text-purple-400 hover:text-purple-300"
        >
          View all →
        </Link>
      )}
    </div>
  );
}
