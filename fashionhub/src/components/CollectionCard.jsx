import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CollectionArt from './CollectionArt';
import Tilt from './Tilt';
import Button from './Button';

/** CollectionCard – image, title, short description and Explore button. */
export default function CollectionCard({ collection, index = 0, large = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      className="h-full"
    >
      <Tilt className="relative h-full" max={6} glare>
        <div className="preserve-3d flex h-full flex-col rounded-3xl bg-white p-3 shadow-card transition-shadow hover:shadow-lift">
          <div className={`relative overflow-hidden rounded-2xl ${large ? 'aspect-[16/11]' : 'aspect-[4/4.2]'}`} style={{ transform: 'translateZ(22px)' }}>
            <CollectionArt collection={collection} />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink backdrop-blur">{collection.tag}</span>
          </div>
          <div className="flex flex-1 flex-col px-2 pb-2 pt-5" style={{ transform: 'translateZ(16px)' }}>
            <h3 className="text-2xl font-semibold">{collection.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{collection.description}</p>
            <div className="mt-5">
              <Button to={`/products?collection=${collection.id}`} variant="primary" size="sm">
                Explore <ArrowUpRight size={15} />
              </Button>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
