import React from 'react';
import { Client } from '../types';
import {
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  CheckCircle2,
} from 'lucide-react';

interface ClientProfileCardProps {
  client: Client;
  allClients: Client[];
  selectedClientId: string;
  onSelectClient: (id: string) => void;
}

export const ClientProfileCard: React.FC<ClientProfileCardProps> = ({
  client,
  allClients,
  selectedClientId,
  onSelectClient,
}) => {
  return (
    <aside className="client-context-panel">
      {/* CLIENT SWITCHER BAR */}
      <div className="client-switcher-card">
        <div className="switcher-header">
          <span className="switcher-label">
            <Users size={13} />
            <span>Select Active Client</span>
          </span>
          <span className="switcher-count">{allClients.length} Rostered</span>
        </div>
        <div className="switcher-pills">
          {allClients.map((c) => {
            const isActive = c.id === selectedClientId;
            return (
              <button
                key={c.id}
                className={`switcher-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectClient(c.id)}
              >
                <img src={c.avatar} alt={c.name} className="pill-avatar" />
                <div className="pill-text">
                  <span className="pill-name">{c.name.split(' ')[0]}</span>
                  <span className="pill-sub">{c.city}</span>
                </div>
                {isActive && <span className="active-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE CLIENT EXECUTIVE CARD */}
      <div className="client-executive-card">
        <div className="executive-card-header">
          <div className="executive-avatar-wrap">
            <img src={client.avatar} alt={client.name} className="executive-avatar" />
            <span className="active-badge-pill">
              <span className="pulse-dot"></span>
              Active
            </span>
          </div>

          <div className="executive-meta">
            <h2 className="executive-name">{client.name}</h2>
            <div className="executive-sub">
              <span>{client.age} yrs</span>
              <span className="dot-divider">•</span>
              <span className="inline-meta">
                <MapPin size={12} /> {client.city}
              </span>
            </div>
            <div className="executive-role">
              <Briefcase size={12} />
              <span>{client.profession}</span>
            </div>
          </div>
        </div>

        {/* 4 SCANNABLE METRIC TILES */}
        <div className="scannable-tiles-grid">
          <div className="scannable-tile tile-danger">
            <span className="tile-value">5</span>
            <span className="tile-label">Deal Breakers</span>
          </div>
          <div className="scannable-tile tile-primary">
            <span className="tile-value">2</span>
            <span className="tile-label">Strong Prefs</span>
          </div>
          <div className="scannable-tile tile-neutral">
            <span className="tile-value">3</span>
            <span className="tile-label">Soft Signals</span>
          </div>
          <div className="scannable-tile tile-neutral">
            <span className="tile-value">{client.assignedMatchmaker.includes('44%') ? '44%' : '21%'}</span>
            <span className="tile-label">{client.assignedMatchmaker.split(' ')[0]} {client.assignedMatchmaker.split(' ')[1]}</span>
          </div>
        </div>

        {/* BIO QUOTE */}
        <div className="client-bio-quote">
          “{client.bio}”
        </div>
      </div>

      {/* 3-TIER PREFERENCE HIERARCHY */}
      <div className="preferences-hierarchy-card">
        {/* TIER 1: HARD REQUIREMENTS */}
        <div className="pref-tier tier-hard">
          <div className="tier-header">
            <div className="tier-title-group">
              <ShieldAlert size={14} className="tier-icon danger" />
              <span className="tier-name">Hard Requirements</span>
            </div>
            <span className="tier-badge danger">Non-Negotiable</span>
          </div>

          <div className="tier-chips-list">
            <div className="rule-chip chip-hard">
              <span className="rule-tag">Smoking:</span>
              <strong>{client.dealBreakers.smokingAllowed.join(' / ').toUpperCase()}</strong>
            </div>

            <div className="rule-chip chip-hard">
              <span className="rule-tag">Drinking:</span>
              <strong>{client.dealBreakers.drinkingAllowed.join(' / ')}</strong>
            </div>

            <div className="rule-chip chip-hard">
              <span className="rule-tag">Children:</span>
              <strong>{client.dealBreakers.childrenPreferenceAllowed.join(' / ')}</strong>
            </div>

            <div className="rule-chip chip-hard">
              <span className="rule-tag">Age Bracket:</span>
              <strong>{client.dealBreakers.minAge}–{client.dealBreakers.maxAge} yrs</strong>
            </div>

            <div className="rule-chip chip-hard">
              <span className="rule-tag">Metros:</span>
              <strong>{client.dealBreakers.allowedLocations.join(', ')}</strong>
            </div>
          </div>
        </div>

        {/* TIER 2: STRONG PREFERENCES */}
        <div className="pref-tier tier-strong">
          <div className="tier-header">
            <div className="tier-title-group">
              <SlidersHorizontal size={14} className="tier-icon primary" />
              <span className="tier-name">Strong Preferences</span>
            </div>
            <span className="tier-badge primary">Weighted Ranking</span>
          </div>

          <div className="tier-chips-list">
            <div className="rule-chip chip-strong">
              <span className="rule-tag">Ideal Age:</span>
              <strong>{client.softPreferences.idealAgeRange[0]}–{client.softPreferences.idealAgeRange[1]} yrs</strong>
              <span className="rule-pts">+20 pts</span>
            </div>

            <div className="rule-chip chip-strong">
              <span className="rule-tag">Primary Metro:</span>
              <strong>{client.softPreferences.preferredLocations.join(', ')}</strong>
              <span className="rule-pts">+25 pts</span>
            </div>
          </div>
        </div>

        {/* TIER 3: SOFT PREFERENCES */}
        <div className="pref-tier tier-soft">
          <div className="tier-header">
            <div className="tier-title-group">
              <Sparkles size={14} className="tier-icon neutral" />
              <span className="tier-name">Soft Preferences</span>
            </div>
            <span className="tier-badge neutral">Qualitative</span>
          </div>

          <div className="tier-chips-list">
            <div className="rule-chip chip-soft">
              <span className="rule-tag">Target Careers:</span>
              <span>{client.softPreferences.preferredProfessions.join(', ')}</span>
              <span className="rule-pts">+20 pts</span>
            </div>

            <div className="rule-chip chip-soft">
              <span className="rule-tag">Education:</span>
              <span>{client.softPreferences.preferredEducationLevels.join(', ')}</span>
              <span className="rule-pts">+15 pts</span>
            </div>

            <div className="lifestyle-chips-group">
              <span className="rule-tag">Lifestyle & Interests (+20 pts max):</span>
              <div className="sub-pills-wrap">
                {client.softPreferences.lifestyleKeywords.map((tag) => (
                  <span key={tag} className="sub-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
