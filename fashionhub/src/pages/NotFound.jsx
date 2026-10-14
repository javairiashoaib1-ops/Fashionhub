import Button from '../components/Button';
import Cube3D from '../components/Cube3D';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Cube3D size={90} duration={14} />
      <h1 className="mt-14 text-6xl font-semibold">404</h1>
      <p className="mt-3 text-ink/65">This page has gone out of style.</p>
      <div className="mt-7"><Button to="/">Back to home</Button></div>
    </section>
  );
}
