'use client';
// import SVGRenderer from '@/pkg/svg-pipeline/SvgRenderer'
// import SVGRender from '@/pkg/svg-pipeline/SvgRender'
import SVGRender from '@/pkg/svg-pipeline/SvgRender2';
// import SVGRender from '@/pkg/svg-pipeline/SvgRender2'

export default function Page() {
  return (
    <div className="h-full w-full flex flex-col">
      <SVGRender />
    </div>
  );
}
