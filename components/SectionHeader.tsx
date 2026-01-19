import Link from "next/link";

export default function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>

      {href && (
        <Link
          href={href}
          className="text-sm text-purple-400 hover:underline"
        >
          View all →
        </Link>
      )}
    </div>
  );
}
