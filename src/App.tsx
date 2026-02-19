import PracticeSession from './app/components/PracticeSession';
import SettingsDrawer from './app/components/SettingsDrawer';

function App() {
  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>双拼练习</h1>
          <p>轻量化小鹤双拼练习</p>
        </div>
      </header>

      <main className="layout">
        <section className="layout-row">
          <div className="card">
            <SettingsDrawer />
          </div>
        </section>
        <div className="layout-row">
          <div className="card session-card">
            <PracticeSession />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
