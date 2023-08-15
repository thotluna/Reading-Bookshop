import ContentLoader from 'react-content-loader';

export const ImageLoader = ({ className }: { className?: string }) => (
  <ContentLoader
    className={className}
    // width={216}
    // height={390}
    speed={5}
    viewBox="0 0 216 390"
    backgroundColor="#0a0a0a"
    foregroundColor="#363636"
  >
    <rect x="0" y="0" rx="0" ry="0" width="216" height="390" />
  </ContentLoader>
);
