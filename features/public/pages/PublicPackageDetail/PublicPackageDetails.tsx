import React, { useState, useEffect } from 'react';
import { useCBETPackages, CBET_ABOUT } from '../../../../shared/data';
import { useAuth } from '../../../../app/AuthContext';
import { useTrips } from '../../../../app/TripContext';
import { ProjectStatus, UserRole } from '../../../../shared/types';
import { PublicPackageDetailLayout } from './layout/PublicPackageDetailLayout';
import { PackageHero } from './components/PackageHero';
import { BookingWidget } from './components/BookingWidget';
import { ConfirmRequestModal } from './components/ConfirmRequestModal';
import { PackageNotFound } from './components/PackageNotFound';
import { PackageDetailNav } from './components/PackageDetailNav';
import { PublicPackageDetailOverviewAndItinery } from './pages/PublicPackageDetailOverviewAndItinery';
import { PublicPackageDetailAboutCbet } from './pages/PublicPackageDetailAboutCbet';
import { PublicPackageDetailPricelisting } from './pages/PublicPackageDetailPricelisting';
import { PublicPackageDetailTravelGuide } from './pages/PublicPackageDetailTravelGuide';
import { Button } from '../../../../shared/atoms/Button';
import { Badge } from '../../../../shared/atoms/Badge';
import { ArrowLeft } from 'lucide-react';

interface PublicPackageDetailsProps {
  packageId: string;
  tab?: string;
}

const TABS = [
  { id: 'overview', label: 'Overview & Itinerary' },
  { id: 'about', label: 'About CBET' },
  { id: 'pricing', label: 'Package Pricing' },
  { id: 'travel-guide', label: 'Travel Guide' }
];

const TAB_IDS = new Set(TABS.map((tabItem) => tabItem.id));

export const PublicPackageDetails: React.FC<PublicPackageDetailsProps> = ({ packageId, tab }) => {
  const packages = useCBETPackages();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const isFaculty = user?.role === UserRole.FACULTY;

  const pkg = packages.find(p => p.id === packageId);
  const about = CBET_ABOUT[pkg?.id ?? ''] ?? Object.values(CBET_ABOUT)[0];

  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');
  const [activeTab, setActiveTab] = useState(tab && TAB_IDS.has(tab) ? tab : TABS[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageId]);

  useEffect(() => {
    if (tab && TAB_IDS.has(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab(TABS[0].id);
    }
  }, [tab]);

  if (!pkg) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }
  if (!about) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }

  const getEstimatedPrice = (groupSize: number) => {
    const band = pkg.capacityBands.find(b => groupSize >= b.min && groupSize <= b.max);
    return band ? band.pricePerStudent * groupSize : 0;
  };

  const currentPrice = size ? getEstimatedPrice(Number(size)) : 0;
  const pricePerStudent = size && currentPrice > 0 ? (currentPrice / Number(size)) : 0;

  const handleLoginRedirect = () => {
    sessionStorage.setItem('returnTo', `/package/${pkg.id}/${activeTab}`);
    window.location.hash = '/login';
  };

  const handleReview = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFaculty) {
      handleLoginRedirect();
      return;
    }
    setShowConfirm(true);
  };

  const handleFinalSubmit = () => {
    const newTripId = `EL-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    addTrip({
      id: newTripId,
      packageId: pkg.id,
      packageName: pkg.name,
      facultyName: user?.name || '',
      department: 'General Sciences',
      requestorContact: user?.email || '',
      date: date,
      groupSize: Number(size),
      purpose: purpose,
      status: ProjectStatus.PENDING
    });
    setShowConfirm(false);
    window.location.hash = `/faculty/trips/${newTripId}`;
  };

  const navigateToTab = (id: string) => {
    setActiveTab(id);
    window.location.hash = `/package/${pkg.id}/${id}`;
  };

  return (
    <>
      <PublicPackageDetailLayout
        header={
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent hover:text-primary flex items-center gap-1"
            onClick={() => window.location.hash = '/'}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Button>
        }
        hero={<PackageHero pkg={pkg} />}
        nav={
          <PackageDetailNav
            items={TABS}
            activeId={activeTab}
            onNavigate={navigateToTab}
            meta={
              <>
                <Badge variant="secondary">{pkg.cbetSite}</Badge>
                <span className="text-text-muted">|</span>
                <span className="text-sm font-medium text-text-muted">{pkg.managingOrg}</span>
              </>
            }
          />
        }
        sidebar={
          <BookingWidget
            pkg={pkg}
            user={user || null}
            isFaculty={isFaculty}
            date={date}
            size={size}
            purpose={purpose}
            currentPrice={currentPrice}
            onDateChange={setDate}
            onSizeChange={setSize}
            onPurposeChange={setPurpose}
            onReview={handleReview}
            onLoginRedirect={handleLoginRedirect}
          />
        }
      >
        {activeTab === 'overview' && <PublicPackageDetailOverviewAndItinery pkg={pkg} />}
        {activeTab === 'about' && (
          <PublicPackageDetailAboutCbet
            about={about}
            onNavigatePricing={() => navigateToTab('pricing')}
          />
        )}
        {activeTab === 'pricing' && <PublicPackageDetailPricelisting pkg={pkg} />}
        {activeTab === 'travel-guide' && <PublicPackageDetailTravelGuide pkg={pkg} />}
      </PublicPackageDetailLayout>

      <ConfirmRequestModal
        isOpen={showConfirm}
        pkg={pkg}
        date={date}
        size={size}
        purpose={purpose}
        currentPrice={currentPrice}
        pricePerStudent={pricePerStudent}
        onClose={() => setShowConfirm(false)}
        onSubmit={handleFinalSubmit}
      />
    </>
  );
};
