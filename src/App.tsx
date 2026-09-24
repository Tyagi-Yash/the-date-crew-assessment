import React, { useState, useMemo } from 'react';
import { mockClients, mockCandidates } from './data/mockData';
import { Candidate, CompatibilityResult, RejectionRecord } from './types';
import { calculateCompatibility } from './engine/scoringEngine';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ClientProfileCard } from './components/ClientProfileCard';
import { FunnelMetricsBar } from './components/FunnelMetricsBar';
import { CandidateCard } from './components/CandidateCard';
import { WhyProfileDrawer } from './components/WhyProfileDrawer';
import { RejectionModal } from './components/RejectionModal';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ToastContainer, ToastMessage } from './components/Toast';

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('matchmaking');
  const [selectedClientId, setSelectedClientId] = useState<string>('client-1');
  const [tabFilter, setTabFilter] = useState<'all' | 'recommended' | 'review' | 'excluded'>('all');
  const [sharedIds, setSharedIds] = useState<string[]>([]);
  const [rejections, setRejections] = useState<Record<string, RejectionRecord>>({});
  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);
  const [rejectingCandidate, setRejectingCandidate] = useState<Candidate | null>(null);

  // Slide-over drawer state for "Why this profile?"
  const [drawerCandidate, setDrawerCandidate] = useState<Candidate | null>(null);
  const [drawerCompatibility, setDrawerCompatibility] = useState<CompatibilityResult | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Active Client
  const activeClient = useMemo(() => {
    return mockClients.find((c) => c.id === selectedClientId) || mockClients[0];
  }, [selectedClientId]);

  // Compute compatibility for all candidates against the active client
  const candidateEvaluations = useMemo(() => {
    return mockCandidates.map((candidate) => ({
      candidate,
      compatibility: calculateCompatibility(activeClient, candidate),
    }));
  }, [activeClient]);

  // Funnel & Screening Summary Counts
  const totalScreened = candidateEvaluations.length;
  const eligibleCount = candidateEvaluations.filter((c) => !c.compatibility.isExcluded).length;
  const excludedCount = candidateEvaluations.filter((c) => c.compatibility.isExcluded).length;
  const topRecommendationsCount = candidateEvaluations.filter(
    (c) => c.compatibility.status === 'RECOMMENDED'
  ).length;

  // Filter candidates based on tab
  const filteredCandidates = useMemo(() => {
    let list = [...candidateEvaluations];

    if (tabFilter === 'recommended') {
      list = list.filter((c) => c.compatibility.status === 'RECOMMENDED');
    } else if (tabFilter === 'review') {
      list = list.filter((c) => c.compatibility.status === 'REVIEW');
    } else if (tabFilter === 'excluded') {
      list = list.filter((c) => c.compatibility.isExcluded);
    }

    // Sort: Recommended first (desc), then Review (desc), then Excluded last
    return list.sort((a, b) => {
      if (a.compatibility.isExcluded && !b.compatibility.isExcluded) return 1;
      if (!a.compatibility.isExcluded && b.compatibility.isExcluded) return -1;
      return b.compatibility.totalScore - a.compatibility.totalScore;
    });
  }, [candidateEvaluations, tabFilter]);

  const handleShare = (candidateId: string) => {
    if (!sharedIds.includes(candidateId)) {
      setSharedIds((prev) => [...prev, candidateId]);
      const cand = mockCandidates.find((c) => c.id === candidateId);
      addToast(`Profile for ${cand ? cand.name : 'Candidate'} shared with client via email.`);
    }
  };

  const handleSaveRejection = (record: RejectionRecord) => {
    setRejections((prev) => ({
      ...prev,
      [record.candidateId]: record,
    }));
    setRejectingCandidate(null);
    addToast(`Rejection recorded for ${record.candidateName}. Preference engine updated.`);
  };

  const handleOpenWhyDrawer = (candidate: Candidate, compatibility: CompatibilityResult) => {
    setDrawerCandidate(candidate);
    setDrawerCompatibility(compatibility);
    setIsDrawerOpen(true);
  };

  return (
    <div className="app-shell">
      {/* LEFT NAVIGATION SIDEBAR */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={(nav) => setActiveNav(nav)}
        onOpenMetrics={() => setIsMetricsOpen(true)}
        matchmakerName={activeClient.assignedMatchmaker.split('(')[0].trim()}
        matchmakerAcceptance={
          activeClient.assignedMatchmaker.includes('44%')
            ? '44% Acceptance (Benchmark)'
            : '21% Acceptance'
        }
      />

      {/* MAIN VIEWPORT */}
      <div className="main-viewport">
        {/* WORKSPACE HEADER */}
        <Header
          onOpenMetrics={() => setIsMetricsOpen(true)}
          activeClientName={activeClient.name}
        />

        {/* WORKSPACE CONTENT AREA */}
        <main className="workspace-main">
          {/* SCREENING FUNNEL SUMMARY STRIP */}
          <FunnelMetricsBar
            totalScreened={totalScreened}
            eligibleCount={eligibleCount}
            excludedCount={excludedCount}
            avoidableMismatchesAvoided={excludedCount}
            topRecommendationsCount={topRecommendationsCount}
          />

          {/* TWO-COLUMN CURATION WORKBENCH */}
          <div className="curation-workbench-grid">
            {/* LEFT COLUMN: CLIENT CONTEXT & 3-TIER PREFERENCES */}
            <ClientProfileCard
              client={activeClient}
              allClients={mockClients}
              selectedClientId={selectedClientId}
              onSelectClient={(id) => {
                setSelectedClientId(id);
                setTabFilter('all');
                setIsDrawerOpen(false);
              }}
            />

            {/* RIGHT COLUMN: CANDIDATE CURATION STREAM */}
            <section className="candidate-stream-column">
              <div className="stream-action-header">
                <div className="stream-header-left">
                  <h3 className="stream-heading">
                    <span>Curated Candidate Pool</span>
                    <span className="stream-count-badge">
                      {filteredCandidates.length} profiles
                    </span>
                  </h3>
                  <p className="stream-helper">
                    Ranked by transparent compatibility score against <strong>{activeClient.name}</strong>'s preferences.
                  </p>
                </div>

                {/* FILTER TABS */}
                <div className="stream-filter-tabs" role="tablist">
                  <button
                    className={`filter-tab-pill ${tabFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setTabFilter('all')}
                  >
                    All ({totalScreened})
                  </button>
                  <button
                    className={`filter-tab-pill ${tabFilter === 'recommended' ? 'is-active' : ''}`}
                    onClick={() => setTabFilter('recommended')}
                  >
                    Recommended ({topRecommendationsCount})
                  </button>
                  <button
                    className={`filter-tab-pill ${tabFilter === 'review' ? 'is-active' : ''}`}
                    onClick={() => setTabFilter('review')}
                  >
                    Review ({eligibleCount - topRecommendationsCount})
                  </button>
                  <button
                    className={`filter-tab-pill ${tabFilter === 'excluded' ? 'is-active' : ''}`}
                    onClick={() => setTabFilter('excluded')}
                  >
                    Excluded ({excludedCount})
                  </button>
                </div>
              </div>

              {/* CANDIDATE CARDS LIST */}
              <div className="candidates-list-stack">
                {filteredCandidates.map(({ candidate, compatibility }) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    compatibility={compatibility}
                    isShared={sharedIds.includes(candidate.id)}
                    rejectionRecord={rejections[candidate.id]}
                    onShare={handleShare}
                    onOpenReject={(cand) => setRejectingCandidate(cand)}
                    onOpenWhyDrawer={handleOpenWhyDrawer}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* "WHY THIS PROFILE?" SLIDE-OVER DRAWER */}
      <WhyProfileDrawer
        candidate={drawerCandidate}
        compatibility={drawerCompatibility}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onShare={(id) => {
          handleShare(id);
          setIsDrawerOpen(false);
        }}
        isShared={drawerCandidate ? sharedIds.includes(drawerCandidate.id) : false}
      />

      {/* REJECTION FEEDBACK MODAL */}
      {rejectingCandidate && (
        <RejectionModal
          candidate={rejectingCandidate}
          client={activeClient}
          onClose={() => setRejectingCandidate(null)}
          onSave={handleSaveRejection}
        />
      )}

      {/* FUNNEL & PILOT KPIS MODAL */}
      {isMetricsOpen && (
        <MetricsDashboard
          onClose={() => setIsMetricsOpen(false)}
          avoidableSavedCount={excludedCount}
        />
      )}

      {/* FLOATING TOAST NOTIFICATIONS */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
