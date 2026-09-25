import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  Check,
  Cigarette,
  Baby,
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (clientId: string) => {
    onSelectClient(clientId);
    setIsOpen(false);
  };

  return (
    <aside className="client-context-panel">
      {/* CLIENT SELECTION DROPDOWN */}
      <div className="client-switcher-card" ref={dropdownRef}>
        <div className="switcher-header">
          <span className="switcher-label">
            <Users size={13} />
            <span>Select Active Client</span>
          </span>
          <span className="switcher-count">{allClients.length} Rostered</span>
        </div>

        {/* DROPDOWN TRIGGER BUTTON */}
        <button
          type="button"
          className={`client-dropdown-trigger ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="trigger-client-info">
            <div className="trigger-avatar-wrap">
              <img src={client.avatar} alt={client.name} className="trigger-avatar" />
              <span className="trigger-active-dot" />
            </div>
            <div className="trigger-text-block">
              <div className="trigger-name-row">
                <span className="trigger-client-name">{client.name}</span>
                <span className="trigger-client-age">{client.age} yrs</span>
              </div>
              <div className="trigger-sub-row">
                <span className="trigger-profession">{client.profession}</span>
                <span className="trigger-dot">•</span>
                <span className="trigger-city">
                  <MapPin size={11} className="trigger-pin-icon" />
                  {client.city}
                </span>
              </div>
            </div>
          </div>
          <div className="trigger-right-action">
            <span className="trigger-pill-badge">Active</span>
            <ChevronDown size={16} className={`trigger-chevron ${isOpen ? 'rotated' : ''}`} />
          </div>
        </button>

        {/* EXPANDABLE DROPDOWN MENU */}
        {isOpen && (
          <div className="client-dropdown-menu" role="listbox">
            <div className="dropdown-menu-header">
              <span className="menu-header-title">Switch Active Client</span>
              <span className="menu-header-sub">Updates candidate compatibility score ranking</span>
            </div>

            <div className="dropdown-client-list">
              {allClients.map((c) => {
                const isSelected = c.id === selectedClientId;
                return (
                  <div
                    key={c.id}
                    className={`dropdown-client-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(c.id)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {/* AVATAR */}
                    <div className="dropdown-item-avatar-wrap">
                      <img src={c.avatar} alt={c.name} className="dropdown-item-avatar" />
                      {isSelected && <span className="item-selected-pip"><Check size={10} /></span>}
                    </div>

                    {/* CLIENT DETAILS */}
                    <div className="dropdown-item-details">
                      <div className="item-top-row">
                        <strong className="item-name">{c.name}</strong>
                        <span className="item-age-badge">{c.age} yrs</span>
                        {isSelected && <span className="item-active-tag">Active</span>}
                      </div>

                      <div className="item-career-row">
                        <span className="item-profession">
                          <Briefcase size={11} />
                          {c.profession}
                        </span>
                        <span className="item-meta-dot">•</span>
                        <span className="item-city">
                          <MapPin size={11} />
                          {c.city}
                        </span>
                      </div>

                      <div className="item-edu-row">
                        <GraduationCap size={11} />
                        <span>{c.education}</span>
                      </div>

                      {/* QUICK FILTER CRITERIA SUMMARY */}
                      <div className="item-criteria-chips">
                        <span className="crit-chip chip-smoking">
                          🚭 {c.dealBreakers.smokingAllowed.includes('never') && c.dealBreakers.smokingAllowed.length === 1 ? 'Non-smoker only' : 'Social smoking ok'}
                        </span>
                        <span className="crit-chip chip-age">
                          📅 {c.dealBreakers.minAge}–{c.dealBreakers.maxAge} yrs
                        </span>
                        <span className="crit-chip chip-kids">
                          👶 {c.dealBreakers.childrenPreferenceAllowed.includes('wants') ? 'Wants kids' : 'Open to kids'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
            <span className="tile-value">100%</span>
            <span className="tile-label">Intake Done</span>
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
