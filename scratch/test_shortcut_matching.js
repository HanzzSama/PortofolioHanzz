function parseComboString(str) {
  const parts = str.toLowerCase().split('+').map(s => s.trim()).filter(Boolean);
  const ctrl = parts.includes('ctrl') || parts.includes('control');
  const alt = parts.includes('alt');
  const shift = parts.includes('shift');
  const meta = parts.includes('meta') || parts.includes('cmd') || parts.includes('win');
  const keys = parts.filter(p => !['ctrl', 'control', 'alt', 'shift', 'meta', 'cmd', 'win'].includes(p));
  return { ctrl, alt, shift, meta, key: keys[0] || '' };
}

function matchesEvent(comboParsed, e) {
  const eCtrl = Boolean(e.ctrlKey || e.metaKey);
  const eAlt = Boolean(e.altKey);
  const eShift = Boolean(e.shiftKey);
  const eKey = (e.key || '').toLowerCase();
  const eCode = (e.code || '').toLowerCase().replace('key', '');

  if (comboParsed.ctrl !== eCtrl && comboParsed.ctrl) return false;
  if (!comboParsed.ctrl && eCtrl) return false;
  if (comboParsed.alt !== eAlt) return false;
  if (comboParsed.shift !== eShift) return false;

  const targetKey = comboParsed.key;
  if (targetKey === eKey || targetKey === eCode) return true;
  if (targetKey === 'f12' && (eKey === 'f12' || e.code === 'F12')) return true;
  if (targetKey === 'f5' && (eKey === 'f5' || e.code === 'F5')) return true;
  return false;
}

// Test cases
const c1 = parseComboString('Ctrl+Shift+I');
console.log('c1 parsed:', c1);
console.log('Matches event {ctrlKey: true, shiftKey: true, key: "I", code: "KeyI"}:', matchesEvent(c1, { ctrlKey: true, shiftKey: true, altKey: false, key: 'I', code: 'KeyI' }));
console.log('Matches event {ctrlKey: true, shiftKey: false, key: "I", code: "KeyI"}:', matchesEvent(c1, { ctrlKey: true, shiftKey: false, altKey: false, key: 'I', code: 'KeyI' }));

const f12 = parseComboString('F12');
console.log('f12 parsed:', f12);
console.log('Matches {key: "F12", code: "F12"}:', matchesEvent(f12, { ctrlKey: false, shiftKey: false, altKey: false, key: 'F12', code: 'F12' }));

