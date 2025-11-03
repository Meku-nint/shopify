'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
type Listing = {
  id: string;
  Brand: string;
  Model: string;
  CPU: string;
  RAM_GB: string;
  RAM_Type: string;
  RAM_Speed_MHz: string;
  Storage: any[];
  GPU: string;
  Display_Resolution: string;
  Screen_Size_inch: number;
  OS: string;
  price: number;
  description: string;
  images: string[];
  imageUrl: string | null;
  createdAt: string;
};

export default function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`, { cache: 'no-store' });
        const result = await res.json();

        if (!res.ok || result.status !== 'ok') {
          router.push('/404');
          return;
        }

        setListing(result.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 max-w-6xl">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="md:flex md:gap-6">
          <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
            <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
              {listing.images && listing.images.length > 0? (
              
                <Image
                  src={listing.images[selectedImageIndex]}
                  alt={`${listing.Brand} ${listing.Model}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-laptop.jpg';
                    target.onerror = null;
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image Available
                </div>
              )}
              {listing.images && listing.images.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() => setSelectedImageIndex((i) => (i - 1 + listing.images.length) % listing.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-800 h-9 w-9 grid place-items-center shadow"
                  >
                    <span className="text-lg">‹</span>
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() => setSelectedImageIndex((i) => (i + 1) % listing.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-gray-800 h-9 w-9 grid place-items-center shadow"
                  >
                    <span className="text-lg">›</span>
                  </button>
                </>
              )}
            </div>
            {listing.images && listing.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
                {listing.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 sm:h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300 active:scale-95'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${listing.Brand} ${listing.Model} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 25vw, 20vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-laptop.jpg';
                        target.onerror = null;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Listing Details */}
          <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {listing.Brand} {listing.Model}
            </h1>
            
            <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
              {listing.price?.toLocaleString()} ETB
            </div>
            
            {listing.description && (
              <div className="mb-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{listing.description}</p>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Processor</div>
                  <div className="text-sm font-semibold text-gray-900 break-words">{listing.CPU}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1 font-medium">RAM</div>
                  <div className="text-sm font-semibold text-gray-900">{listing.RAM_GB}GB {listing.RAM_Type} ({listing.RAM_Speed_MHz}MHz)</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Graphics</div>
                  <div className="text-sm font-semibold text-gray-900 break-words">{listing.GPU}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Display</div>
                  <div className="text-sm font-semibold text-gray-900">{listing.Screen_Size_inch}" {listing.Display_Resolution}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 sm:col-span-2">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Storage</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {listing.Storage.map((s: any, i: number) => (
                      <span key={i}>
                        {s.Size_GB || s.size || 0}GB {s.Type || s.type || 'SSD'}{i < listing.Storage.length - 1 ? ' + ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                {listing.OS && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 sm:col-span-2">
                    <div className="text-xs text-gray-500 mb-1 font-medium">Operating System</div>
                    <div className="text-sm font-semibold text-gray-900">{listing.OS}</div>
                  </div>
                )}
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
