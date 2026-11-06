/** @format */
import UseAnimations from 'react-useanimations';
import loading4 from 'react-useanimations/lib/loading4';

export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-center text-3xl font-extrabold">
        En cours de chargement...
      </h2>
      <UseAnimations animation={loading4} size={300} />;
    </div>
  );
}
