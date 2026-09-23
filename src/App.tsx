import React, { useState, useMemo } from 'react';
import { mockClients, mockCandidates } from './data/mockData';
import { Candidate, RejectionRecord } from './types';
import { calculateCompatibility } from './engine/scoringEngine';
import { Header } from './components/Header';
import { ClientProfileCard } from './components/ClientProfileCard';
import { FunnelMetricsBar } from './components/FunnelMetricsBar';
import { CandidateCard } from './components/CandidateCard';
import { RejectionModal } from './components/RejectionModal';
import { MetricsDashboard } from './components/MetricsDashboard';
import { Users, Filter, CheckCircle2, AlertOctagon } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<string>('client-1');
  const [tabFilter, setTabFilter] = useState<'all' | 'recommended' | 'review' | 'excluded'>('all');
  const [sharedIds, setSharedIds] = useState<string[]>([]);
  const [rejections, setRejections] = useState<Record<string, RejectionRecord>>({});
  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);
  const [rejectingCandidate, setRejectingCandidate] = useState<Candidate | null>(null);

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

    // Tab filter
    if (tabFilter === 'recommended') {
      list = list.filter((c) => c.compatibility.status === 'RECOMMENDED');
    } else if (tabFilter === 'review') {
      list = list.filter((c) => c.compatibility.status === 'REVIEW');
    } else if (tabFilter === 'excluded') {
      list = list.filter((c) => c.compatibility.isExcluded);
    }

    // Sort: Recommended first (by score desc), then Review (by score desc), then Excluded last
    return list.sort((a, b) => {
      if (a.compatibility.isExcluded && !b.compatibility.isExcluded) return 1;
      if (!a.compatibility.isExcluded && b.compatibility.isExcluded) return -1;
      return b.compatibility.totalScore - a.compatibility.totalScore;
    });
  }, [candidateEvaluations, tabFilter]);

  const handleShare = (candidateId: string) => {
    if (!sharedIds.includes(candidateId)) {
      setSharedIds([...sharedIds, candidateId]);
    }
  };

  const handleSaveRejection = (record: RejectionRecord) => {
    setRejections((prev) => ({
      ...prev,
      [record.candidateId]: record,
    }));
    setRejectingCandidate(null);
  };

  return (
    <div className="app-container">
      {/* HEADER & CLIENT SWITCHER */}
      <Header
        clients={mockClients}
        selectedClientId={selectedClientId}
        onSelectClient={(id) => {
          setSelectedClientId(id);
          setTabFilter('all');
        }}
        onOpenMetrics={() => setIsMetricsOpen(true)}
      />

      {/* MAIN WORKSPACE */}
      <main className="main-layout">
        {/* TOP SCREENING FUNNEL SUMMARY */}
        <FunnelMetricsBar
          totalScreened={totalScreened}
          eligibleCount={eligibleCount}
          excludedCount={excludedCount}
          avoidableMismatchesAvoided={excludedCount}
          topRecommendationsCount={topRecommendationsCount}
        />

        {/* 2-COLUMN WORK AREA */}
        <div className="work-grid">
          {/* LEFT: CLIENT PROFILE & HARD CONSTRAINTS */}
          <ClientProfileCard client={activeClient} />

          {/* RIGHT: CANDIDATE CURATION STREAM */}
          <section className="candidate-stream">
            <div className="stream-filter-header">
              <div className="stream-title-group">
                <h3>
                  <span>Candidate Pool for {activeClient.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    ({filteredCandidates.length} profiles shown)
                  </span>
                </h3>
              </div>

              <div className="stream-tabs">
                <button
                  className={`stream-tab-btn ${tabFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTabFilter('all')}
                >
                  All ({totalScreened})
                </button>
                <button
                  className={`stream-tab-btn ${tabFilter === 'recommended' ? 'active' : ''}`}
                  onClick={() => setTabFilter('recommended')}
                >
                  Recommended ({topRecommendationsCount})
                </button>
                <button
                  className={`stream-tab-btn ${tabFilter === 'review' ? 'active' : ''}`}
                  onClick={() => setTabFilter('review')}
                >
                  Review ({eligibleCount - topRecommendationsCount})
                </button>
                <button
                  className={`stream-tab-btn ${tabFilter === 'excluded' ? 'active' : ''}`}
                  onClick={() => setTabFilter('excluded')}
                >
                  Excluded ({excludedCount})
                </button>
              </div>
            </div>

            {/* CANDIDATE CARDS */}
            {filteredCandidates.map(({ candidate, compatibility }) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                compatibility={compatibility}
                isShared={sharedIds.includes(candidate.id)}
                rejectionRecord={rejections[candidate.id]}
                onShare={handleShare}
                onOpenReject={(cand) => setRejectingCandidate(cand)}
              />
            ))}
          </section>
        </div>
      </main>

      {/* REJECTION MODAL */}
      {rejectingCandidate && (
        <RejectionModal
          candidate={rejectingCandidate}
          client={activeClient}
          onClose={() => setRejectingCandidate(null)}
          onSave={handleSaveRejection}
        />
      )}

      {/* METRICS & FUNNEL DIAGNOSIS MODAL */}
      {isMetricsOpen && (
        <MetricsDashboard
          onClose={() => setIsMetricsOpen(false)}
          avoidableSavedCount={excludedCount}
        />
      )}
    </div>
  );
};
