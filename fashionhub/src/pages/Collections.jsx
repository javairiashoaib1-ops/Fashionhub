import PageHeader from '../components/PageHeader';
import CollectionCard from '../components/CollectionCard';
import { collections } from '../data/products';

export default function Collections() {
  return (
    <>
      <PageHeader eyebrow="Collections" title="Find the look for every moment" subtitle="Five carefully curated collections – from sun-soaked summer days to after-dark glamour." />
      <section className="section container-x">
        <div className="grid gap-6 lg:grid-cols-6">
          {collections.map((c, i) => (
            <div key={c.id} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <CollectionCard collection={c} index={i} large={i < 2} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
