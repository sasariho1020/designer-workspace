/* ==============================
   Designer Workspace — script.js
   ============================== */

// ---- Page meta ----
const PAGE_META = {
  home:     { label: 'ホーム',           subtitle: 'ダッシュボード' },
  projects: { label: 'デザイン案件管理', subtitle: 'プロジェクトの進捗を管理' },
  school:   { label: 'スクール課題管理', subtitle: '課題の進捗を追跡' },
  notes:    { label: '学習ノート',       subtitle: 'アイデアと知識をメモ' },
  tasks:    { label: 'タスク / ToDo',    subtitle: 'タスクを整理して集中' },
  ideas:    { label: 'アイデア・SNS',    subtitle: '投稿ドラフトを管理' },
  income:   { label: '収入管理',         subtitle: '売上と収入を把握' },
};

let currentPage = 'home';

// ---- Navigate ----
function navigate(page) {
  if (!PAGE_META[page]) return;
  currentPage = page;

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Update header subtitle
  const meta = PAGE_META[page];
  document.getElementById('pageSubtitle').textContent = meta.label;

  // Render content
  const area = document.getElementById('pageArea');
  area.classList.remove('page-enter');
  void area.offsetWidth; // force reflow for re-animation
  area.classList.add('page-enter');
  area.innerHTML = renderPage(page);
}

// ---- Page renderer (placeholder until pages are built) ----
function renderPage(page) {
  if (page === 'home') {
    return `
      <div class="text-gray-500 dark:text-gray-600 text-sm">
        ホームのダッシュボードはここに表示されます。
      </div>
    `;
  }

  const meta = PAGE_META[page];
  return `
    <div class="flex flex-col items-center justify-center py-24 text-center">
      <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
        <i class="fas fa-tools text-indigo-400 text-2xl"></i>
      </div>
      <h2 class="text-xl font-bold text-gray-300 dark:text-gray-300 mb-2">${meta.label}</h2>
      <p class="text-sm text-gray-500">このページは近日公開予定です</p>
    </div>
  `;
}

// ---- Dark mode ----
let isDark = localStorage.getItem('dw_dark') !== 'false'; // default: dark

function applyDark() {
  document.documentElement.classList.toggle('dark', isDark);
  const icon = document.querySelector('#darkToggle i');
  if (icon) {
    icon.className = isDark ? 'fas fa-sun text-sm' : 'fas fa-moon text-sm';
    document.getElementById('darkToggle').classList.toggle('text-yellow-400', isDark);
    document.getElementById('darkToggle').classList.toggle('text-gray-400', !isDark);
  }
}

// ---- Header date ----
function setHeaderDate() {
  const el = document.getElementById('headerDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  });
}

// ---- Mobile sidebar ----
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.remove('hidden');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  applyDark();
  setHeaderDate();
  navigate('home');

  // Nav click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(link.dataset.page);
      closeSidebar();
    });
  });

  // Dark mode toggle
  document.getElementById('darkToggle').addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('dw_dark', isDark);
    applyDark();
  });

  // Mobile menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openSidebar);
});
