import React from 'react';
import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  UserCheck,
  MessageSquareQuote,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenMetrics: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  onOpenMetrics,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'matchmaking', label: 'Matchmaking', icon: HeartHandshake, badge: 'Live' },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'candidates', label: 'Candidates', icon: UserCheck },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareQuote },
    { id: 'insights', label: 'Funnel Insights', icon: BarChart3, action: onOpenMetrics },
  ];

  return (
    <aside className="app-sidebar">
      {/* BRAND / LOGO AREA */}
      <div className="sidebar-brand">
        <div className="brand-crest">
          <Sparkles size={18} className="crest-icon" />
        </div>
        <div className="brand-text">
          <span className="brand-name">The Date Crew</span>
          <span className="brand-tagline">Matchmaking Intelligence</span>
        </div>
      </div>

      {/* NAVIGATION ITEMS */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">Workspace</div>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      onSelectNav(item.id);
                    }
                  }}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* SYSTEM STATUS / TRUST PILL */}
      <div className="sidebar-status-box">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Rules Engine Active</span>
        </div>
        <p className="status-subtext">35% preference conflict prevention active</p>
      </div>

      {/* USER / MATCHMAKER PROFILE */}
      <div className="sidebar-user-footer">
        <div className="user-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
            alt={matchmakerName}
            className="user-avatar"
          />
          <span className="user-online-pip"></span>
        </div>
        <div className="user-info">
          <span className="user-name">Pooja Verma</span>
          <span className="user-role">Matchmaker Lead</span>
          <span className="user-kpi">Active Session</span>
        </div>
      </div>
    </aside>
  );
};
