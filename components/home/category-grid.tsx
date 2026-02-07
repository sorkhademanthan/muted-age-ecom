import Link from 'next/link';
import Image from 'next/image';

const categories = [
    {
        name: 'Men',
        href: '/collections/men',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=1000&fit=crop',
        subtitle: 'Ready to Wear',
    },
    {
        name: 'Women',
        href: '/collections/women',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop',
        subtitle: 'The New Silhouette',
    },
    {
        name: 'Accessories',
        href: '/collections/accessories',
        image: 'https://images.unsplash.com/photo-1523206485979-ba07796f3143?w=800&h=1000&fit=crop',
        subtitle: 'Essentials',
    },
    {
        name: 'Archive',
        href: '/collections/archive',
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=800&h=1000&fit=crop',
        subtitle: 'Previous Seasons',
    },
];

export function CategoryGrid() {
    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                {categories.map((category, index) => (
                    <Link
                        key={category.name}
                        href={category.href}
                        className="group relative h-[600px] md:h-[700px] w-full block overflow-hidden border-r border-b border-gray-100 last:border-r-0"
                    >
                        {/* Image */}
                        <div className="absolute inset-0 bg-gray-200">
                             <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Dark Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {category.subtitle}
                                </p>
                                <h3 className="text-3xl font-bold text-white tracking-tighter uppercase italic">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}