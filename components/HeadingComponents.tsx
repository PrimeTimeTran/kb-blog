import { HEADING_THEME } from '../lib/theme/theme.cjs';

const createHeading = (Tag, style) => {
  const HeadingComponent = ({ id, className = 'scroll-mt-24', ...props }) => (
    <Tag id={id} className={`${style} ${className}`} {...props} />
  );
  // ✓ FIX: Capitalize the tag name for a cleaner DevTools display (e.g., "Heading(H1)")
  const tagName = typeof Tag === 'string' ? Tag.toUpperCase() : 'Component';
  HeadingComponent.displayName = `Heading(${tagName})`;

  return HeadingComponent;
};

export const H1 = createHeading('h1', `${HEADING_THEME['1'].base} ${HEADING_THEME['1'].color}`);
export const H2 = createHeading('h2', `${HEADING_THEME['2'].base} ${HEADING_THEME['2'].color}`);
export const H3 = createHeading('h3', `${HEADING_THEME['3'].base} ${HEADING_THEME['3'].color}`);
export const H4 = createHeading('h4', `${HEADING_THEME['4'].base} ${HEADING_THEME['4'].color}`);
export const H5 = createHeading('h5', `${HEADING_THEME['5'].base} ${HEADING_THEME['5'].color}`);
export const H6 = createHeading('h6', `${HEADING_THEME['6'].base} ${HEADING_THEME['6'].color}`);

const withNumbering = (Headings) => {
  const counters = [0, 0, 0, 0, 0, 0];

  const makeHeading = (level, Component) => {
    const HeadingComponent = (props) => {
      // increment current level only
      counters[level - 1]++;

      // reset deeper levels
      for (let i = level; i < counters.length; i++) {
        counters[i] = 0;
      }

      // build prefix from active counters
      const prefix = counters
        .slice(0, level)
        .filter((n) => n > 0)
        .join('.');

      const { children, ...rest } = props;

      return (
        <Component {...rest}>
          {prefix}. {children}
        </Component>
      );
    };

    // ✓ FIX: Assign a dynamic display name for React DevTools and ESLint
    HeadingComponent.displayName = `WithNumbering(H${level})`;

    return HeadingComponent;
  };

  return {
    h1: makeHeading(1, Headings.H1),
    h2: makeHeading(2, Headings.H2),
    h3: makeHeading(3, Headings.H3),
    h4: makeHeading(4, Headings.H4),
    h5: makeHeading(5, Headings.H5),
    h6: makeHeading(6, Headings.H6),
  };
};

const Headings = { H1, H2, H3, H4, H5, H6 };

export const NumberedHeadings = withNumbering(Headings);
