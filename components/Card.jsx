import { Image } from './mdx';
import { SafeLink as Link } from './mdx/Link';

const Card = ({ title, description, imgSrc, href, tech }) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
        <br />
        <br />
        {tech &&
          (tech ?? []).map((item) => (
            <a
              key={item}
              href={`https://loi-tran-blog.netlify.app/tags/${encodeURIComponent(item.toLowerCase())}`}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300"
            >
              {item}
            </a>
          ))}
      </div>
    </div>
  </div>
);

export default Card;
