import { schemes } from '../../core/schemes';
import { useAppStore } from '../store';

export default function SettingsDrawer() {
  const schemeId = useAppStore((state) => state.schemeId);
  const setScheme = useAppStore((state) => state.setScheme);
  const showSyllable = useAppStore((state) => state.showSyllable);
  const toggleSyllable = useAppStore((state) => state.toggleSyllable);
  const showExpectedKeys = useAppStore((state) => state.showExpectedKeys);
  const toggleExpectedKeys = useAppStore((state) => state.toggleExpectedKeys);

  return (
    <div className="settings-drawer">
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={showSyllable}
          onChange={toggleSyllable}
        />
        <span className="status">显示拼音</span>
      </label>

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={showExpectedKeys}
          onChange={toggleExpectedKeys}
        />
        <span className="status">按键提示</span>
      </label>

      <div>
        <select
          value={schemeId}
          onChange={(event) => setScheme(event.target.value as typeof schemeId)}
          style={{
            marginTop: '6px',
            padding: '8px 10px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            background: '#f8fafc',
          }}
        >
          {Object.values(schemes).map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
