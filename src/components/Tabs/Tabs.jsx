import { useId, useRef, useState } from 'react';
import './Tabs.css';

function Tabs({ tabs, defaultTabId, onChange }) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const tabRefs = useRef([]);
  const baseId = useId();

  const selectTab = (id) => {
    setActiveId(id);
    onChange?.(id);
  };

  const handleKeyDown = (event, index) => {
    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      selectTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              id={`${baseId}-aba-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-painel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tabs__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-painel-${tab.id}`}
          aria-labelledby={`${baseId}-aba-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="tabs__panel"
        >
          {tab.id === activeId && tab.content}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
