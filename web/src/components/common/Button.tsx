// ---
// const { text, href, style } = Astro.props;
// ---
// <a href={href}
//   class:list={[
//     "rounded-sm px-6 py-3 text-sm font-medium text-white shadow-sm transition bg-blue-700 hover:bg-blue-800  hidden md:inline" ,
//     style
//   ]}
// >
//   {text}
// </a>

export default function Button({
  text = '',
  href = '#',
  style = '',
}: {
  text: string;
  href: string;
  style?: string;
}) {
  return (
    <a
      href={href}
      className={`rounded-sm px-10 py-3 text-sm font-medium text-white shadow-sm transition bg-blue-700 hover:bg-blue-800 hidden md:inline ${style}`}
    >
      {text}
    </a>
  );
}