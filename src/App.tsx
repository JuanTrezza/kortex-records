import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { TopProgressBar } from './components/TopProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArtistMarquee } from './components/ArtistMarquee';
import { Manifesto } from './components/Manifesto';
import { ArtistsSection } from './components/ArtistsSection';
import { ReleasesSection } from './components/ReleasesSection';
import { EventsSection } from './components/EventsSection';
import { RadioSection } from './components/RadioSection';
import { MerchSection } from './components/MerchSection';
import { SponsorsMarquee } from './components/SponsorsMarquee';
import { NewsletterSection } from './components/NewsletterSection';
import { LatamPresence } from './components/LatamPresence';
import { ContactDemoSection } from './components/ContactDemoSection';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { CartDrawer } from './components/CartDrawer';
import { ArtistModal } from './components/ArtistModal';
import { StoryModal } from './components/StoryModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

import { ARTISTS_DATA } from './data/artists';
import { RELEASES_DATA } from './data/releases';
import { EVENTS_DATA } from './data/events';
import { MERCH_DATA } from './data/merch';

import { useCart } from './hooks/useCart';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useToast } from './hooks/useToast';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { scrollToId } from './lib/motion';

import type { Artist, MerchProduct, Release } from './types';

/**
 * Main application component for KØRTEX RECORDS
 * Production-ready melodic techno label portal.
 */
export default function App() {
  useSmoothScroll();
  const { toasts, showToast, removeToast } = useToast();

  // Shopping cart hook
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Audio player hook
  const {
    currentTrack,
    isPlaying,
    progressPercent,
    formattedCurrentTime,
    formattedDuration,
    volume,
    isMuted,
    isMinimized,
    playTrack,
    togglePlayPause,
    seekToPercent,
    setVolume,
    toggleMute,
    toggleMinimized,
  } = useAudioPlayer();

  // Modals state
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [eventLocationFilter, setEventLocationFilter] = useState('all');

  // Handlers for cart actions
  const handleAddToCart = (product: MerchProduct, size: string) => {
    addToCart(product, size);
    showToast(`✓ "${product.name}" (${size}) agregado al bolso de compras.`);
  };

  const handleCheckout = () => {
    showToast('Procesando orden con encriptación segura...', 'info');
    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      showToast('✓ ¡Compra confirmada! Te enviamos los detalles a tu email.', 'success');
    }, 1400);
  };

  // Handlers for audio track playback
  const handlePlayTrack = (
    title: string,
    cat: string,
    bpmKey: string,
    duration: string,
    artist?: string
  ) => {
    playTrack(title, cat, bpmKey, duration, undefined, artist);
    showToast(`▶ Reproduciendo: ${title}`, 'success');
  };

  const handleNextTrack = () => {
    const currentIndex = RELEASES_DATA.findIndex(
      (r) => r.catalogNumber === currentTrack.catalogNumber
    );
    const nextIndex = (currentIndex + 1) % RELEASES_DATA.length;
    const nextRel = RELEASES_DATA[nextIndex];
    handlePlayTrack(
      `${nextRel.title} - ${nextRel.artist}`,
      nextRel.catalogNumber,
      `${nextRel.bpm} // ${nextRel.key}`,
      nextRel.duration,
      nextRel.artist
    );
  };

  const handlePrevTrack = () => {
    const currentIndex = RELEASES_DATA.findIndex(
      (r) => r.catalogNumber === currentTrack.catalogNumber
    );
    const prevIndex = (currentIndex - 1 + RELEASES_DATA.length) % RELEASES_DATA.length;
    const prevRel = RELEASES_DATA[prevIndex];
    handlePlayTrack(
      `${prevRel.title} - ${prevRel.artist}`,
      prevRel.catalogNumber,
      `${prevRel.bpm} // ${prevRel.key}`,
      prevRel.duration,
      prevRel.artist
    );
  };

  // Handlers for tickets & notifications
  const handleBuyTicket = (eventName: string) => {
    showToast(`Redirigiendo a boletería digital para: ${eventName}`, 'info');
  };

  const handleJoinWaitlist = (eventName: string) => {
    showToast(`✓ Te agregamos a la waitlist para: ${eventName}`, 'success');
  };

  const handleNotifyStock = (productName: string) => {
    showToast(`✓ Te avisaremos cuando "${productName}" tenga nuevo stock`, 'info');
  };

  const handleCopyEmail = (email: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(email)
        .then(() => showToast(`✓ Email copiado: ${email}`, 'success'))
        .catch(() => showToast(`Email de contacto: ${email}`, 'info'));
    } else {
      showToast(`Email de contacto: ${email}`, 'info');
    }
  };

  const handleDemoSubmitted = (artistName: string) => {
    showToast(
      `✓ Demo de "${artistName}" recibida con éxito. El equipo de A&R la revisará.`,
      'success'
    );
  };

  const handleSelectCityFilter = (countryCode: string, cityName: string) => {
    setEventLocationFilter(countryCode);
    showToast(`Filtrando fechas para ${cityName}`, 'info');
    scrollToId('eventos');
  };

  const handlePlayFromSearch = (release: Release) => {
    handlePlayTrack(
      `${release.title} - ${release.artist}`,
      release.catalogNumber,
      `${release.bpm} // ${release.key}`,
      release.duration,
      release.artist
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#E5E2E1] font-sans selection:bg-[#FF5722] selection:text-[#0A0A0A]">
      {/* Top 2px scroll progress bar */}
      <TopProgressBar />

      {/* Custom follower cursor (Desktop only) */}
      <CustomCursor />

      {/* Global floating toast manager */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Main navigation header */}
      <Navbar
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main content body with bottom padding for sticky player */}
      <main className="w-full pb-28 md:pb-24">
        {/* Hero Section */}
        <Hero />

        {/* Dynamic marquee ticker 1 */}
        <ArtistMarquee />

        {/* Manifesto & Philosophy Section */}
        <Manifesto onOpenStoryModal={() => setIsStoryModalOpen(true)} />

        {/* Artists Roster Bento Grid */}
        <ArtistsSection
          artists={ARTISTS_DATA}
          onSelectArtist={(artist) => setSelectedArtist(artist)}
          onPlayTrack={handlePlayTrack}
        />

        {/* Latest Releases Catalog */}
        <ReleasesSection
          releases={RELEASES_DATA}
          onPlayTrack={handlePlayTrack}
        />

        {/* Events Tour & Warehouse Schedule */}
        <EventsSection
          events={EVENTS_DATA}
          selectedLocationFilter={eventLocationFilter}
          onBuyTicket={handleBuyTicket}
          onJoinWaitlist={handleJoinWaitlist}
        />

        {/* Radio & Live Streaming Section */}
        <RadioSection
          onPlayTrack={handlePlayTrack}
          onSubscribe={() =>
            showToast('✓ Suscrito a KØRTEX Radio en Spotify y Apple Podcasts', 'success')
          }
        />

        {/* Merch Store */}
        <MerchSection
          products={MERCH_DATA}
          cartCount={totalCount}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onNotifyStock={handleNotifyStock}
        />

        {/* Sponsors Marquee */}
        <SponsorsMarquee />

        {/* Newsletter Section */}
        <NewsletterSection
          onSuccessToast={(msg) => showToast(msg, 'success')}
        />

        {/* Regional LATAM Presence Map & Filter */}
        <LatamPresence onSelectCityFilter={handleSelectCityFilter} />

        {/* Contact & A&R Dropbox Section */}
        <ContactDemoSection
          onCopyEmail={handleCopyEmail}
          onDemoSubmitted={handleDemoSubmitted}
        />

        {/* Global Footer */}
        <Footer />
      </main>

      {/* Sticky Bottom Audio Player */}
      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progressPercent={progressPercent}
        formattedCurrentTime={formattedCurrentTime}
        formattedDuration={formattedDuration}
        volume={volume}
        isMuted={isMuted}
        isMinimized={isMinimized}
        onTogglePlayPause={togglePlayPause}
        onSeekToPercent={seekToPercent}
        onSetVolume={setVolume}
        onToggleMute={toggleMute}
        onToggleMinimized={toggleMinimized}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />

      {/* Slide-in Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        subtotal={subtotal}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Artist Profile Modal */}
      <ArtistModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        onPlayTrack={handlePlayTrack}
        onRequestBooking={(artistName) =>
          showToast(
            `✓ Solicitud de booking para "${artistName}" enviada al departamento de A&R`,
            'success'
          )
        }
      />

      {/* Story & Manifesto Detail Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        artists={ARTISTS_DATA}
        releases={RELEASES_DATA}
        events={EVENTS_DATA}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectArtist={(artist) => setSelectedArtist(artist)}
        onPlayRelease={handlePlayFromSearch}
      />
    </div>
  );
}
