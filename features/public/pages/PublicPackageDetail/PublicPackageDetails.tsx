import React, { useState, useEffect } from 'react';
import { useCBETPackages } from '../../../../shared/data/cbetData';
import { useAuth } from '../../../../app/AuthContext';
import { useTrips } from '../../../../app/TripContext';
import { ProjectStatus, UserRole } from '../../../../shared/types';
import { PublicPackageDetailLayout } from './layout/PublicPackageDetailLayout';
import { PackageHero } from './components/PackageHero';
import { BookingWidget } from './components/BookingWidget';
import { ConfirmRequestModal } from './components/ConfirmRequestModal';
import { PackageNotFound } from './components/PackageNotFound';
import { PublicPackageDetailOverviewAndItinery } from './pages/PublicPackageDetailOverviewAndItinery';
import { PublicPackageDetailPricelisting } from './pages/PublicPackageDetailPricelisting';

interface PublicPackageDetailsProps {
  packageId: string;
}

export const PublicPackageDetails: React.FC<PublicPackageDetailsProps> = ({ packageId }) => {
  const packages = useCBETPackages();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const isFaculty = user?.role === UserRole.FACULTY;

  const pkg = packages.find(p => p.id === packageId);

  const [showConfirm, setShowConfirm] = useState(false);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageId]);

  if (!pkg) {
    return <PackageNotFound onBack={() => window.location.hash = '/'} />;
  }

  const getEstimatedPrice = (groupSize: number) => {
    const band = pkg.capacityBands.find(b => groupSize >= b.min && groupSize <= b.max);
    return band ? band.pricePerStudent * groupSize : 0;
  };

  const currentPrice = size ? getEstimatedPrice(Number(size)) : 0;
  const pricePerStudent = size && currentPrice > 0 ? (currentPrice / Number(size)) : 0;

  const handleLoginRedirect = () => {
    sessionStorage.setItem('returnTo', `/package/${pkg.id}`);
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

  return (
    <>
      <PublicPackageDetailLayout
        header={<PackageHero pkg={pkg} onBack={() => window.location.hash = '/'} />}
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
        <PublicPackageDetailOverviewAndItinery pkg={pkg} />
        <PublicPackageDetailPricelisting pkg={pkg} />
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
