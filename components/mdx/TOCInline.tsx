export const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i');

  const filteredToc = (toc ?? []).filter(
    (heading) => heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value),
  );

  const getMarginClass = (depth) => {
    const level = depth - 2; // because `##` is depth 2
    return `ml-${level * 6}`;
  };

  const tocList = (
    <ul>
      {(filteredToc ?? []).map((heading) => (
        <li key={heading.value} className={getMarginClass(heading.depth)}>
          <a href={heading.url}>{heading.value}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {asDisclosure ? (
        <details open>
          <summary className="ml-6 pb-2 pt-2 text-xl font-bold">Table of Contents</summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  );
};
